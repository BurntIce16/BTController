// renderer.js
let ws;
let connected = false;

const url = "ws://192.168.4.1:81/";
num = 0;

document.querySelector("#connect").addEventListener("click", () => {
    if(!connected){
        ws = new WebSocket(url);
        ws.onopen = function () {
            connected = true;
        };
        
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            alert("Message is received...");
        };
        
        ws.onclose = function () {
            // websocket is closed.
            alert("Connection is closed...");
            connected = false;
        };
    }
    document.querySelector("#send").addEventListener("click", () => {
        ws.send("Cock" + num);
        num++;
    });

});

window.addEventListener("gamepadconnected", (e) => {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  });