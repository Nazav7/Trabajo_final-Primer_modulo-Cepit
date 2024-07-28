const firstName = document.getElementById("name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const message = document.getElementById("message")
const sendMessageButton = document.getElementById("send");
let information = [];

sendMessageButton.addEventListener("submit", (e) => {
    e.preventDefault(); // previene la acción del form de actualizar la página
    information[0] = firstName.value;
    information[1] = lastName.value;
    information[2] = email.value;
    information[3] = phone.value;
    information[4] = message.value;

    //console.log(`Su nombre es ${informacion[0]} y su apellido es ${informacion[1]}`);

    let blob = new Blob([information], { type: "text/plain;charset=utf-8" }); // navegador

    // Librería FileSaver.js
    saveAs(blob, "contact.txt");
});