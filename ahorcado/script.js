import { diccionario } from './diccionario.js';

const imagen = document.querySelector('.imagen');
const palabra = document.querySelector('.palabra');
const pista = document.querySelector('.pista');
const errores = document.querySelector('.errores');
const intentos = document.querySelector('.intentos');
const fin = document.querySelector('.fin');
const campoAdivinar = document.querySelector('.campoAdivinar');
const enviarAdivinar = document.getElementById('enviarAdivinar');

let palabraSecreta = valorRandomArray(diccionario);
let palabraMostrar = asteriscos(palabraSecreta).split('');
let letrasUsuario = [];
let numErrores = 0;
let letrasErrores = [];
let pistaPalabraSecreta = definicionPalabra(palabraSecreta);

let botonReiniciar;

function valorRandomArray(array)
{
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function asteriscos(palabra)
{
    let palabraAsteriscos = '';
    
    for (let i = 0; i < palabra.length; i++)
    {
        palabraAsteriscos += '*';
    }

    return palabraAsteriscos;
}

function contieneLetra(letra, palabra)
{
    let contiene = false;

    for (let i = 0; i < palabra.length; i++)
    {
        if (letra === palabra.charAt(i))
        {
            contiene = true;
            break;
        }
    } 
    
    return contiene;
}

function mostrarPalabra(letraUsuario, palabraMostrar)
{
    for (let i = 0; i < palabraSecreta.length; i++)
    {
        if (letraUsuario === palabraSecreta.charAt(i))
        {
            palabraMostrar[i] = palabraSecreta.charAt(i);
        }
    }
    
    return palabraMostrar;
}

function finDeJuego()
{
    campoAdivinar.disabled = true;
    enviarAdivinar.disabled = true;
    botonReiniciar = document.createElement('button');
    botonReiniciar.textContent = 'Reiniciar juego';
    document.body.append(botonReiniciar);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function reiniciarJuego()
{
    palabraSecreta = valorRandomArray(diccionario);
    palabraMostrar = asteriscos(palabraSecreta).split('');
    letrasUsuario = [];
    numErrores = 0; 
    letrasErrores = [];
    pistaPalabraSecreta = definicionPalabra(palabraSecreta);

    imagen.src = './img/1.png';
    palabra.textContent = 'Palabra: ' + palabraMostrar.join('').toUpperCase();
    pista.textContent = 'Pista: ' + pistaPalabraSecreta;
    errores.textContent = 'Errores: ' + letrasErrores.join(' ').toUpperCase();
    intentos.textContent = 'Intentos ' + (6 - numErrores);
    fin.textContent = '';

    botonReiniciar.parentNode.removeChild(botonReiniciar);

    campoAdivinar.disabled = false;
    enviarAdivinar.disabled = false;

    campoAdivinar.focus();
}

function definicionPalabra(palabraSecreta)
{
  let definicion;
  let requestText;
  let posInicial; 
  let posFinal;

  let request = new XMLHttpRequest();
  
  request.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/es/' + palabraSecreta, false);
  
  request.send();
  
  requestText = request.responseText;
  
  posInicial = requestText.indexOf('"definition"') + '"definition"'.length + 3;
  
  requestText = requestText.slice(posInicial);

  posFinal = requestText.indexOf('.",');

  definicion = requestText.slice(0, posFinal);
  
  return definicion;
}

palabra.textContent = 'Palabra: ' + palabraMostrar.join('').toUpperCase();
pista.textContent = 'Pista: ' + pistaPalabraSecreta;
errores.textContent = 'Errores: ' + letrasErrores.join(' ').toUpperCase();
intentos.textContent = 'Intentos ' + (6 - numErrores);

campoAdivinar.focus();

campoAdivinar.addEventListener('keypress', function (e)
{
    if (e.key === 'Enter') {
        compruebaLetra();
    }
})
enviarAdivinar.addEventListener('click', compruebaLetra); 

function compruebaLetra()
{
    let letraUsuario = campoAdivinar.value.toLowerCase();

    if (!contieneLetra(letraUsuario, letrasUsuario.join('')))
    {
        letrasUsuario.push(letraUsuario);

        if (contieneLetra(letraUsuario, palabraSecreta))
        {
            palabraMostrar =  mostrarPalabra(letraUsuario, palabraMostrar);
            palabra.textContent = 'Palabra: ' + palabraMostrar.join('').toUpperCase();
            
            if (!contieneLetra('*', palabraMostrar.join('')))
            {
                fin.textContent = '¡Se acabó! Has ganado :)';

                finDeJuego();
            }
        }
        else
        {
            letrasErrores.push(letraUsuario);
            numErrores++;
            imagen.src = './img/' + (numErrores + 1).toString() + '.png';

            if (numErrores == 6)
            {
                fin.textContent = '¡Se acabó! Has perdido :( La palabra es: ' + palabraSecreta.toUpperCase();

                finDeJuego();
            }
        }

        errores.textContent = 'Errores: ' + letrasErrores.join(' ').toUpperCase();
        intentos.textContent = 'Intentos ' + (6 - numErrores);
    }
    else
    {
        alert('Ya has introducido la ' + letraUsuario.toUpperCase());
    }

    campoAdivinar.value = '';
    campoAdivinar.focus();
}