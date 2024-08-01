"use Strict";

const form = document.querySelector("form");
const firstName = document.getElementById("name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
let information = [];

form.addEventListener("submit", (e) => {
        e.preventDefault(); // Previene la acción predeterminada si el formulario es válido
        information[0] = firstName.value;
        information[1] = lastName.value;
        information[2] = email.value;
        information[3] = phone.value;
        information[4] = message.value;

        let blob = new Blob([information], { type: "text/plain;charset=utf-8" }); // navegador

        // Librería FileSaver.js
        saveAs(blob, "contact.txt");

        // Vacía los campos después de enviar el formulario
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        phone.value = "";
        message.value = "";
});