var eventEmitter = require('events')
var util = require('util')

module.exports = function () {

  util.inherits(Client, eventEmitter)

  var input = document.getElementById('input')
  var check = document.getElementById('check')
  var response =  document.getElementById('response')

  function Client(){
    eventEmitter.call(this)
  }

  Client.prototype.init = function () {
    fireDomEvents.call(this)
  }

  function fireDomEvents() {
    var self = this

    //button check ev
    check.addEventListener('click', function (e) {
      var inputs = input.value.split('/').splice(1)
      var protocol = inputs[0] || null
      var data = inputs[1] || null

      if(!protocol || !data ) return self.emit('fail')

      self.emit('message',{
        protocol: protocol,
        data: data
      })
    })
  }
  return new Client()
}
