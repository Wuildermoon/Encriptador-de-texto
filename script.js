const inputTextField = document.getElementById("input_interface--text_field");
const messageField = document.getElementById("output_interface--text_field");
const copyButton = document.getElementById("copy-button");
const encryptButton = document.getElementById("encrypt-button");
const decryptButton = document.getElementById("decrypt-button");
const outputInfo = document.getElementById("output_interface--info");
const codeDictionary = [
  ["e", "z#e7pl"],
  ["i", "b$iq4k"],
  ["a", "x!a3ld"],
  ["o", "t@or9v"],
  ["u", "m%und0"],
];

function processText(unprocessedText) {
  return unprocessedText
    .toLowerCase() // Convertir a minúsculas
    .normalize("NFD") // Separar los acentos de las letras
    .replace(/[\u0300-\u036f]/g, ""); // Eliminar los signos diacríticos
} // Función para procesar el texto ingresado por el usuario

function isEmpty(field) {
  if (field.value === "") {
    return true;
  }
} // Función para verificar si el campo de texto esta vacio

function encrypt(unencryptedText) {
  for (let i = 0; i < codeDictionary.length; i++) {
    if (unencryptedText.includes(codeDictionary[i][0])) {
      unencryptedText = unencryptedText.replaceAll(
        codeDictionary[i][0],
        codeDictionary[i][1]
      );
    }
  }
  return unencryptedText;
} // Función para encriptar el texto dado por el usuario

function decrypt(encryptedText) {
  for (let i = 0; i < codeDictionary.length; i++) {
    if (encryptedText.includes(codeDictionary[i][1])) {
      encryptedText = encryptedText.replaceAll(
        codeDictionary[i][1],
        codeDictionary[i][0]
      );
    }
  }
  return encryptedText;
} // Función para desencriptar el texto dado por el usuario

function encryptText() {
  const untransformedText = processText(inputTextField.value);
  const transformedText = encrypt(untransformedText);
  messageField.value = transformedText;
  inputTextField.value = "";
  if (transformedText !== "") {
    hideInfo();
  }
} // Función para activar la función "encrypt()"

function decryptText() {
  const text = decrypt(inputTextField.value);
  messageField.value = text;
  inputTextField.value = "";
  if (text !== "") {
    hideInfo();
  }
} // Función para activar la función "decrypt()"

function showInfo() {
  outputInfo.classList.remove("hidden");
  messageField.classList.add("hidden");
  copyButton.classList.add("pointer-events-none");
} // Función para mostrar el mensaje de información y ocultar el campo de texto

function hideInfo() {
  outputInfo.classList.add("hidden");
  messageField.classList.remove("hidden");
  copyButton.classList.remove("pointer-events-none");
} // Función para ocultar el mensaje de información y mostrar el campo de texto

encryptButton.addEventListener("click", encryptText); // Función para activar la función "encryptText()"

decryptButton.addEventListener("click", decryptText); // Función para activar la función "decrypText()"

copyButton.addEventListener("click", async () => {
  if (!isEmpty(messageField)) {
    await navigator.clipboard.writeText(messageField.value);
    showInfo();
    messageField.value = "";
  }
}); /* Función para copiar el texto del "messageField" al portapapeles
 y limpiar el campo de texto y mostrar la información de nuevo */

messageField.addEventListener("keyup", () => {
  if (isEmpty(messageField)) {
    showInfo();
  }
}); /* Función para mostrar el mensaje de información y ocultar el campo de texto
 cuando el campo del mensaje este vacio */
