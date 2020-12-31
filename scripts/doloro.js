class Doloro {
  constructor () {
    this.servers = [
      'ws://cntdwn20.uber.space/doloro/chat',
    ]
    this.connectedServer = null
    this.connectedServerIndex = 0
    this.ws = null

    this._connectSrv(this.servers[this.connectedServerIndex])

    this.errors = {
      AllServersDown: new Error('AllServersDown: All configured servers are not accessible :(')
    }
  }

  _connectSrv(server) {
    var that = this
    console.log(`Attempting connection to: ${that.servers[that.connectedServerIndex]}`)
    this.ws = new WebSocket(server)
    this.ws.onmessage = function (e) {
      try {
        const response = JSON.parse(e.data)
        that._responseCb({
          event: response.event,
          params: response.params
        })
      } catch (err) {
        console.error(`Failed to parse response: ${err}`)
      }
    }
    this.ws.onopen = function () {
      console.log(`Opened connection to '${that.servers[that.connectedServerIndex]}', performing handshake...`)
      that.ws.send(that._fmtrq('send_handshake', {
        hello: 'ping'
      }))
    }
    this.ws.onclose = function () {
      console.log(`Lost connection to: ${that.servers[that.connectedServerIndex]}`)
      that.connectedServer = null
      that._responseCb({
        event: 'lost_connection',
      })
      that.connectedServerIndex++
      if (that.connectedServerIndex == that.servers.length) {
        that.connectedServerIndex = 0
      }
      that._connectSrv(that.servers[that.connectedServerIndex])
    }
  }

  _fmtrq (evt, params) {
    return JSON.stringify({
      event: evt,
      params: params
    })
  }

  _responseCb (response) {
    if (response.event == 'complete_handshake') {
      this.connectedServer = this.servers[this.connectedServerIndex]
      console.log(`Handshake complete! Now connected to: ${this.connectedServer}`)
    }
    this.eventCb(response)
  }

  sendMsg (msg, type, from) {
    if (this.ws.OPEN) {
      this.ws.send(this._fmtrq('send_message', {
        content_type: type,
        content: msg,
        from: from
      }))
    }
  }
}