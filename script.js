const campo_texto = document.getElementById('interfaz_entrada--campo_texto');
const campo_mensaje = document.getElementById('interfaz_salida--campo_texto');
const copiar = document.getElementById('boton-copiar');
const indicadorEntrada = document.getElementById('interfaz_entrada--indicador');
const infoSalida = document.getElementById('interfaz_salida--info');
const diccionario_codigos = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function procesarTexto(textoNoProcesado) {
    let textoProcesado = textoNoProcesado.replace(/[^a-záéíóúüñ ]/gi, '').toLowerCase();
    return textoProcesado;
} //Funcion para convertir las letras en mayusculas a minúsculas y eliminar caracteres especiales

function botonEncriptar(){
    const textoNoTransformado = procesarTexto(campo_texto.value);
    const textoTransformado = encriptar(textoNoTransformado);
    campo_mensaje.value = textoTransformado;
    campo_texto.value = '';
    infoSalida.style.display = 'none';
} //Funcion para activar la Funcion "encriptar()".

function encriptar(textoDesencriptado) {
    for (let i = 0; i < diccionario_codigos.length; i++) {
        if (textoDesencriptado.includes(diccionario_codigos[i][0])) {
            textoDesencriptado = textoDesencriptado.replaceAll(
                diccionario_codigos[i][0], 
                diccionario_codigos[i][1]
                );
        }
    }
    return textoDesencriptado;
} //Funcion para encriptar el texto dado por el usuario.

function botonDesencriptar() {
    const texto = desencriptar(campo_texto.value);
    campo_mensaje.value = texto;
    campo_texto.value = '';
    infoSalida.style.display = 'none';
} //Funcion para activar la Funcion "desencriptar()".

function desencriptar(textoEncriptado) {
    for(let i = 0; i < diccionario_codigos.length; i++){
        if (textoEncriptado.includes(diccionario_codigos[i][1])) {
            textoEncriptado = textoEncriptado.replaceAll(
                diccionario_codigos[i][1],
                diccionario_codigos[i][0]
            );
        }
    }
    return textoEncriptado;
} //Funcion para desencriptar el texto dado por el usuario.

copiar.addEventListener('click', async() => {
    await navigator.clipboard.writeText(campo_mensaje.value);
    campo_mensaje.value = '';
    infoSalida.style.display = 'inline-block';
}); //Funcion para copiar el texto de "campo_mensaje".

/*
function copiarTexto() {
    let textoCopiado = campo_mensaje;
    navigator.clipboard.writeText(textoCopiado.value);
} //Funcion para copiar el texto de la caja de texto "campo-mensaje"
*/ //Funcion alternativa para copiar texto que hice al principio, antes de que se me ocurriera agregar un boton para pegar xD.
