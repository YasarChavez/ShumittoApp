function tts(texto) {
    // Verificar si el navegador soporta la síntesis de voz
    if ('speechSynthesis' in window) {
        // Crear un objeto de síntesis de voz
        var synthesis = window.speechSynthesis;

        // Crear un objeto de síntesis de voz con el texto proporcionado
        var utterance = new SpeechSynthesisUtterance(texto);

        // Iniciar la síntesis de voz
        synthesis.speak(utterance);
    } else {
        // Si el navegador no soporta la síntesis de voz
        console.error('Tu navegador no soporta la síntesis de voz.');
    }
}

// Ejemplo de uso
tts("¡Hola! Esto es una prueba de síntesis de voz en JavaScript.");
