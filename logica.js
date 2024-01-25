/*Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"

Requisitos:

Debe funcionar solo con letras minúsculas
No deben ser utilizados letras con acentos ni caracteres especiales
Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.
Por ejemplo:
"gato" => "gaitober"
gaitober" => "gato"*/

let textEncrip = document.getElementById("inputEntrada");
let textoSalida = document.querySelector(".container-salida-tex");
let botonEncrip = document.getElementsByClassName("boton-1")[0];
let botonDesencrip = document.getElementsByClassName("boton-2")[0];
let botonCopiar = document.getElementsByClassName("boton-copiar")[0];
function quitarTildes(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function encriptar() {
    let reemplazos = {
        'a': 'ai',
        'e': 'enter', 
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    }

    let texto = quitarTildes(textEncrip.value.toLowerCase());
    let caracteres = texto.split('');

    for (let i = 0; i < caracteres.length; i++) {
        let caracterActual = caracteres[i];
        if (reemplazos.hasOwnProperty(caracterActual)) {
            caracteres[i] = reemplazos[caracterActual];
        }
    }
    let cadenaModificada = caracteres.join('');

    textoSalida.textContent = cadenaModificada;
    textEncrip.value = "";
}

function desencriptar() {
    let textoEncriptado = textEncrip.value.toLowerCase();
    let reemplazos = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    }
    for (let clave in reemplazos) {
        if (reemplazos.hasOwnProperty(clave)) {
            let valor = reemplazos[clave];
            while (textoEncriptado.indexOf(clave) !== -1) {
                textoEncriptado = textoEncriptado.replace(clave, valor);
            }
        }
    }
    textoSalida.textContent = textoEncriptado;
    textEncrip.value = "";
}
function copiar(textoSalida) {
    let parrafo = document.getElementsByClassName("container-salida-tex")[0];
    let range = document.createRange();
    range.selectNode(parrafo);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    textoSalida.textContent = '';
}
/* ocultar */
function ocultar() {
    let p = document.querySelector('.container-salida-tex');
    let containerDiv2 = document.querySelector('.container-div2');
    let containerDiv3 = document.querySelector('.container-div3');
    
    if (p.textContent.trim() === '') {
        // Si no hay texto, muestra container-div2
        containerDiv2.style.display = 'flex';
        containerDiv3.style.display = 'none';
    } else {
        // Si hay texto, oculta container-div2
        containerDiv2.style.display = 'none';
        containerDiv3.style.display = 'flex';
    }
};

/* funciones de los botones */
botonEncrip.addEventListener('click', function(){
    encriptar();
    ocultar();
});
botonDesencrip.addEventListener('click', function(){
    desencriptar();
    ocultar();
});
botonCopiar.addEventListener('click', function() {
    copiar(textoSalida);
    ocultar()
});