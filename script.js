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
    let textoProcesado = textoNoProcesado.replace(/[^a-záéíóúü ]/gi, '').toLowerCase();
    return textoProcesado;
} //Funcion para convertir las letras en mayusculas a minúsculas y eliminar caracteres especiales

function botonEncriptar(){
    const textoNoTransformado = procesarTexto(campo_texto.value);
    const textoTransformado = encriptar(textoNoTransformado);
    campo_mensaje.value = textoTransformado;
    campo_texto.value = '';
    desaparecerInfo();
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
    desaparecerInfo();
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

function desaparecerInfo() {
    campoTextoSalida = campo_mensaje.value;
    info = infoSalida;
    if (campoTextoSalida =! '') {
        info.style.display = 'none';
    }
} //Funcion para desaparecer la informacion del "campo_mensaje"

function aparecerInfo() {
    campoTextoSalida = campo_mensaje.value;
    info = infoSalida;
    if (campoTextoSalida == '') {
        info.style.display = 'flex';
    }
} //Funcion para aparecer la informacion del "campo_mensaje"

campo_mensaje.addEventListener('keydown', desaparecerInfo) //Evento que llama a la funcion "desaparacerInfo()" cuando se presiona una tecla

campo_mensaje.addEventListener('keyup', aparecerInfo) //Evento que llama a la funcion "aparacerInfo()" cuando se levanta una tecla

copiar.addEventListener('click', async() => {
    await navigator.clipboard.writeText(campo_mensaje.value);
    campo_mensaje.value = '';
    aparecerInfo();
}); //Funcion para copiar el texto de "campo_mensaje".