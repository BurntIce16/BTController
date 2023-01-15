const { app, BrowserWindow } = require("electron");
const path = require("path");
let ipcMain = require('electron').ipcMain;


const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			protocol: "file:",
			slashes: true,
		},
	});

	win.loadFile("index.html");
};

app.whenReady().then(() => {
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});


ipcMain.on('submitForm', function(event, data) {
	console.log(data);
 });