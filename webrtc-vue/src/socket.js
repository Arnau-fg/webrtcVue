import { io } from "socket.io-client";
import { useAppStore } from '@/store/app';
import { comencarConnexio, conectarNouUsuari, signalPeer, dataPeer } from "./comunicationManager.js";
import router from '@/router'; // Import the router from your project
// "undefined" means the URL will be computed from the `window.location` object
/**
 * Si estas treballant en local ferem  url =localhost:3589
 * Si estas en producció ferem url = http://mathroyale.daw.inspedralbes.cat:3589
 * Si estas en preproduccion ferem url = http://pretr2g3.daw.inspedralbes.cat:3590
 */
const URL = "http://localhost:3589";

export const socket = io(URL);

let store;
setTimeout(() => {
  store = useAppStore();
}, 500);


socket.on("nou usuari", (llistaUsers) => { store.setUsers(llistaUsers); console.log("arribat"); });

socket.on("comencar", () => {
  comencarConnexio();
});

socket.on("answer", (data) => {
  signalPeer(data);
});

socket.on("conectar", (iniciador) => {
  conectarNouUsuari(iniciador);
});



