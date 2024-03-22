const menu = document.getElementById("menu");
// Función para mostrar o esconder el div y guardar el estado en el localStorage
function toggleDiv() {
    var div = document.getElementById("miDiv");
    if (div.style.display === "none") {
        div.style.display = "block";
        localStorage.setItem("divState", "visible");
        menu.innerHTML = `<span class="material-symbols-outlined">
        menu_open
        </span>`;
    } else {
        div.style.display = "none";
        localStorage.setItem("divState", "hidden");
        menu.innerHTML = `<span class="material-symbols-outlined">
        menu
        </span>`;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    localStorage.setItem("divState", "hidden");
});
// Verificar y restaurar el estado guardado en el localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    var divState = localStorage.getItem("divState");
    if (divState === "hidden") {
        var div = document.getElementById("miDiv");
        div.style.display = "none";
    }
});
