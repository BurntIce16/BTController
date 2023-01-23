// renderer.js
let ws;
let connected = false;

const url = "ws://192.168.4.1:81/";
num = 0;

const gamepadAPI = {
	controller: {},
	turbo: false,
	connect(evt) {
		gamepadAPI.controller = evt.gamepad;
		gamepadAPI.turbo = true;
		console.log("Gamepad connected.");
        document.getElementById("gpstatus").innerText = "Gamepad status: Connected";
	},
	disconnect(evt) {
		gamepadAPI.turbo = false;
		delete gamepadAPI.controller;
		console.log("Gamepad disconnected.");
        document.getElementById("gpstatus").innerText = "Gamepad status: Disconnected";
	},
	update() {
		gamepadAPI.buttonsCache = [];
		for (let k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
			gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
		}
		gamepadAPI.buttonsStatus = [];

		// Get the gamepad object
		const c = gamepadAPI.controller || {};

		// Loop through buttons and push the pressed ones to the array
		const pressed = [];
		if (c.buttons) {
			for (let b = 0; b < c.buttons.length; b++) {
				if (c.buttons[b].pressed) {
					pressed.push(gamepadAPI.buttons[b]);
				}
			}
		}

		// Loop through axes and push their values to the array
		const axes = [];
		if (c.axes) {
			for (let a = 0; a < c.axes.length; a++) {
				axes.push(c.axes[a].toFixed(2));
			}
		}

		// Assign received values
		gamepadAPI.axesStatus = axes;
		gamepadAPI.buttonsStatus = pressed;

		// Return buttons for debugging purposes
		return pressed;
	},
	buttonPressed(button, hold) {
		let newPress = false;

		// Loop through pressed buttons
		for (let i = 0; i < gamepadAPI.buttonsStatus.length; i++) {
			// If we found the button we're looking for
			if (gamepadAPI.buttonsStatus[i] === button) {
				// Set the boolean variable to true
				newPress = true;
                console.log("test");

				// If we want to check the single press
				if (!hold) {
					// Loop through the cached states from the previous frame
					for (let j = 0; j < gamepadAPI.buttonsCache.length; j++) {
						// If the button was already pressed, ignore new press
						newPress = gamepadAPI.buttonsCache[j] !== button;
                        console.log(newPress);
                        console.log("Test");
					}
				}
			}
		}
		return newPress;
	},
	buttons: [],
	buttonsCache: [],
	buttonsStatus: [],
	axesStatus: [],
};


function sendGamepadStatus(){
    //format 
}

document.querySelector("#connect").addEventListener("click", () => {
	if (!connected) {
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

window.addEventListener("gamepadconnected", gamepadAPI.connect);
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);

