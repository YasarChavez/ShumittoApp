// COLORES
// Obtener referencias a los selectores de color
const colorSelector1 = document.getElementById("color1");
const colorSelector2 = document.getElementById("color2");
const colorSelector3 = document.getElementById("color3");
const inputs = document.querySelectorAll("input");

// Verificar si hay valores guardados en el localStorage y establecer los colores
if (localStorage.getItem("color1")) {
    colorSelector1.value = localStorage.getItem("color1");
}

if (localStorage.getItem("color2")) {
    colorSelector2.value = localStorage.getItem("color2");
}

if (localStorage.getItem("color3")) {
    colorSelector3.value = localStorage.getItem("color3");
}

// Función para manejar cambios en los selectores de color
function handleColorChange() {
    localStorage.setItem("color1", colorSelector1.value);
    localStorage.setItem("color2", colorSelector2.value);
    localStorage.setItem("color3", colorSelector3.value);
}
// Función para aplicar el color seleccionado al fondo del body
function aplicarColor() {
    document.body.style.backgroundColor = colorSelector3.value;
}

// Agregar evento de cambio al input de color
colorSelector3.addEventListener("change", aplicarColor);

// Aplicar el color seleccionado al cargar la página
window.addEventListener("load", aplicarColor);

// Agregar eventos de cambio a los selectores de color
colorSelector1.addEventListener("change", handleColorChange);
colorSelector2.addEventListener("change", handleColorChange);
colorSelector3.addEventListener("change", handleColorChange);

const timerDisplay = document.querySelector(".timer");
const startButton = document.getElementById("start-btn");
const exerciseTimeInput = document.getElementById("exercise-time");
const restTimeInput = document.getElementById("rest-time");
const numSetsInput = document.getElementById("num-sets");
const cuadro = document.getElementById("cuadro");
const aplicar = document.getElementById("aplicar");

let exerciseTime = parseInt(exerciseTimeInput.value, 10); // Obtener el tiempo de ejercicio ingresado por el usuario
let restTime = parseInt(restTimeInput.value, 10); // Obtener el tiempo de descanso ingresado por el usuario
let numSets = parseInt(numSetsInput.value); // Obtener la cantidad de series ingresada por el usuario

// Aplicar color a los campos de inputs
inputs.forEach((input) => {
    input.style.backgroundColor = colorSelector3.value;
});

timerDisplay.textContent = "00:00";
timerDisplay.style.backgroundColor = color1.value; // Cambiar el color de fondo  para el ejercicio
cuadro.style.backgroundColor = color1.value;

// Función para actualizar los valores de tiempo y series
function updateValues() {
    exerciseTime = parseInt(exerciseTimeInput.value, 10);
    restTime = parseInt(restTimeInput.value, 10);
    numSets = parseInt(numSetsInput.value);
}

// Función para mostrar el temporizador
function displayTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    timerDisplay.textContent = display;
    if (time == 10) {
        playSound("sound/quedan10.mp3");
    }
    if (time == 1) {
        playSound("sound/ding.m4a");
    }
}

// Función para reproducir sonido
function playSound(sound) {
    const audio = new Audio(sound);
    audio.play();
}

function tts(texto) {
    // Verificar si el navegador soporta la síntesis de voz
    if ("speechSynthesis" in window) {
        // Crear un objeto de síntesis de voz
        var synthesis = window.speechSynthesis;

        // Crear un objeto de síntesis de voz con el texto proporcionado
        var utterance = new SpeechSynthesisUtterance(texto);

        // Iniciar la síntesis de voz
        synthesis.speak(utterance);
    } else {
        // Si el navegador no soporta la síntesis de voz
        console.error("Tu navegador no soporta la síntesis de voz.");
    }
}

// Función para iniciar el temporizador
function startTimer() {
    if (startButton.id == "stop-btn") {
        setTimeout(function () {
            location.reload();
        }, 10);
    }
    playSound("sound/ding.m4a");

    updateValues(); // Actualizar los valores antes de iniciar el temporizador

    // modificar boton
    startButton.id = "stop-btn";
    startButton.innerHTML = `<span class="material-symbols-outlined"> stop_circle </span>`;

    let time = exerciseTime;
    let isRest = false;
    let setsRemaining = numSets - 1;

    const interval = setInterval(() => {
        if (time <= 0) {
            if (setsRemaining > 0) {
                if (isRest) {
                    // playSound("ding.m4a");
                    setsRemaining--;
                    if (setsRemaining == 0) {
                        playSound("sound/ultima.mp3");
                    }
                    isRest = false;
                    time = exerciseTime;
                    // Cambiar el color de fondo  para el ejercicio
                    cuadro.style.backgroundColor = color1.value;
                    timerDisplay.style.backgroundColor = color1.value;
                } else {
                    playSound("sound/rest_sound.mp3");
                    isRest = true;
                    time = restTime;
                    // Cambiar el color de fondo para el descanso
                    cuadro.style.backgroundColor = color2.value;
                    timerDisplay.style.backgroundColor = color2.value;
                }
            } else {
                clearInterval(interval);
                playSound("sound/finish_sound.mp3");
                timerDisplay.textContent = "Terminamos!";
                // Cambiar el color de fondo para el ejercicio
                cuadro.style.backgroundColor = color1.value;
                timerDisplay.style.backgroundColor = color1.value;
            }
        } else {
            displayTimer(time);
            time--;
        }
    }, 1000);
}

// Listener de eventos para el botón de inicio
startButton.addEventListener("click", startTimer);
aplicar.addEventListener("click", function () {
    location.reload();
});
