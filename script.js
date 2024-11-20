document.addEventListener("DOMContentLoaded", () => {
    // Cargar los vuelos desde el archivo JSON
    fetch("flights.json")
        .then(response => response.json())
        .then(data => displayFlights(data))
        .catch(error => console.error("Error cargando los vuelos:", error));
});

// Función para mostrar los vuelos en la página
function displayFlights(flights) {
    const flightList = document.getElementById("flight-list");

    flights.forEach(flight => {
        const flightCard = document.createElement("div");
        flightCard.className = "flight-card";

        flightCard.innerHTML = `
            <h3>${flight.airline}</h3>
            <p><strong>Origen:</strong> ${flight.origin}</p>
            <p><strong>Destino:</strong> ${flight.destination}</p>
            <p><strong>Fecha:</strong> ${flight.date}</p>
            <p class="price">USD ${flight.price}</p>
        `;

        flightList.appendChild(flightCard);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Secciones
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    
    // Enlaces
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');

    // Funciones para mostrar las secciones de Login y Registro
    signupLink.addEventListener('click', function(event) {
        event.preventDefault();  // Prevenir la acción por defecto del enlace
        loginSection.style.display = 'none';  // Ocultar el formulario de login
        signupSection.style.display = 'block';  // Mostrar el formulario de registro
    });

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();  // Prevenir la acción por defecto del enlace
        signupSection.style.display = 'none';  // Ocultar el formulario de registro
        loginSection.style.display = 'block';  // Mostrar el formulario de login
    });
});

// Función para bajar hasta el final de la página
document.getElementById("scrollDown").addEventListener("click", function () {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});

// Función para subir hasta el principio de la página
document.getElementById("scrollUp").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Función para bajar hasta el final de la página
document.getElementById("scrollDown").addEventListener("click", function () {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});

// Función para subir hasta el principio de la página
document.getElementById("scrollUp").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Manejo del formulario de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Redirigir directamente a la página del usuario
    window.location.href = 'user/user.html';
});
