import SimplePeer from "simple-peer";
import { socket } from "./socket.js"
let peer = null;

export function comencarConnexio() {
    console.log("creating peer");
    peer = new SimplePeer({
        initiator: true,
        trickle: false,
    });
    peer.on('signal', (data) => {
        console.log("MY ID TO MAKE A CALL:");
		console.log(data);
		console.log("SIGNALING TYPE : " + data.type);
        if (data.type == "offer") {
            socket.emit('creat inici', JSON.stringify(data));
        } else {
            console.log('SIGNAL', JSON.stringify(data));
        }
        

    });
    peer.on("data", (data) => {
        console.log(data);
    });
    peer.on("stream", (stream) => {
        //Stream de dades que rebo de l'altre costat
        console.log("event on stream from initiator");
        document.getElementById("remoteVideoStream").srcObject = stream;
        document.getElementById("remoteVideoStream").play();
    });

    peer.on("connect", () => {
        console.log("Connection Established!!!");
    });
    peer.on("close", () => {
        console.log("Connection Closed");
        var controlsStreamingButton = document.getElementById("sendVideoStream");

        controlsStreamingButton.innerHTML = "START STREAMING";
        controlsStreamingButton.style.backgroundColor = "lightcoral";
        streamingStarted = false;
    });
    peer.on("error", (err) => {
        console.error(err);
        var controlsStreamingButton = document.getElementById("sendVideoStream");

        controlsStreamingButton.innerHTML = "START STREAMING";
        controlsStreamingButton.style.backgroundColor = "lightcoral";
        streamingStarted = false;
    });
}

export function conectarNouUsuari(iniciador) {
    console.log("Signaling my peer");
	peer = new SimplePeer({
        initiator: false,
        trickle: false,
    });
	peer.on("signal", (data) => {
		//es crida cada cop que es crea un nou objecte Peer
		console.log("MY ID TO ACCEPT CALL:");
		console.log(data);
		console.log("SIGNALING TYPE : " + data.type);
		if (data.type == "answer") {
			console.log("SENDING ANSWER TO INITIATOR");
		} else {
			// addLogMessage(JSON.stringify(data));
		}
	});
	peer.on("data", (data) => {
		console.log(data);
	});
	peer.on("stream", (stream) => {
		//Stream de dades que rebo de l'altre costat

		console.log("event on stream from NO initiator user");

		document.getElementById("remoteVideoStream").srcObject = stream;
		document.getElementById("remoteVideoStream").play();
	});

	//Need to signal the initiator to be abble to get our ID
	peer.signal(iniciador.data);

	peer.on("connect", () => {
		console.log("Connection Established!!!");
	});
	peer.on("close", () => {
		console.log("Connection Closed");
		var controlsStreamingButton = document.getElementById("sendVideoStream");

		controlsStreamingButton.innerHTML = "START STREAMING";
		controlsStreamingButton.style.backgroundColor = "lightcoral";
		streamingStarted = false;
	});
	peer.on("error", (err) => {
		console.error(err);
		var controlsStreamingButton = document.getElementById("sendVideoStream");

		controlsStreamingButton.innerHTML = "START STREAMING";
		controlsStreamingButton.style.backgroundColor = "lightcoral";
		streamingStarted = false;
	});
}
