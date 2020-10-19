// 11. El juego del ahorcado.

// Falta array de diccionario
// Lógica del programa: 
// 1. Elige una palabra random del diccionario
// 2. Muestra la palabra en forma de asteriscos
// 3. Al enviar una letra:
// 3.1 Compruba si ha sido introducida antes por el usurario, continua si false
// 3.2 Añade letraUsuario a arrayLetrasUsuario, combrueba si palabra random contiene letra del usuario
// 3.3 Si false -> erroresUsuario++ y cambia imagen / finaliza el juego si errores = 5
// 3.4 Si true -> reemplaza asterisco por letraUs donde corresponda
// 3.5 Compeuba si quedan asteriscos / si false- > fin - si true -> continua

import { diccionario } from './diccionario.js';

const imagen = document.querySelector('.imagen');
const palabra = document.querySelector('.palabra');
const errores = document.querySelector('.errores');
const intentos = document.querySelector('.intentos');
const fin = document.querySelector('.fin');
const campoAdivinar = document.querySelector('.campoAdivinar');
const enviarAdivinar = document.getElementById('enviarAdivinar');

let palabraSecreta = valorRandomArray(diccionario);
let palabraMostrar = asteriscos(palabraSecreta).split('');
let letrasUsuario = []; // Array para guardar letras correctas del usuario
let numErrores = 0; // Array con errores del usuario
let letrasErrores = []; // guarda letras erroneas

let botonReiniciar;

function valorRandomArray(array) // Devulve un valor al azar de un array
{
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function asteriscos(palabra) // Pone asteriscos para la palabra a adivinar
{
    let palabraAsteriscos = '';
    
    for (let i = 0; i < palabra.length; i++)
    {
        palabraAsteriscos += '*';
    }

    return palabraAsteriscos;
}

function contieneLetra(letra, palabra) // Comprueba si una palabra tiene una letra
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

function mostrarPalabra(letraUsuario, palabraMostrar) // Remplaza los asteriscos por la letra acertada
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

    palabra.textContent = 'Palabra: ' + palabraMostrar.join('').toUpperCase();
    errores.textContent = 'Errores: ' + letrasErrores.join(' ').toUpperCase();
    intentos.textContent = 'Intentos ' + (6 - numErrores);
    fin.textContent = '';

    botonReiniciar.parentNode.removeChild(botonReiniciar);

    campoAdivinar.disabled = false;
    enviarAdivinar.disabled = false;

    campoAdivinar.focus();
}

palabra.textContent = 'Palabra: ' + palabraMostrar.join('').toUpperCase();
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

function compruebaLetra() // Función princpipal
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
                fin.textContent = '¡Se acabó! Has perdido :(';

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
