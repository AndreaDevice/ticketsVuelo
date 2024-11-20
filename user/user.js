let reservedFlights = []; // Almacena los vuelos reservados

// Función de reserva
function reserveFlight(airline, origin, destination, price) {
    if (reservedFlights.length >= 3) {
        alert('Solo puedes reservar un máximo de 3 vuelos.');
        return;
    }

    const flight = { airline, origin, destination, price };
    reservedFlights.push(flight);
    alert(`¡Has reservado un vuelo con ${airline} de ${origin} a ${destination} por $${price}!\nVuelos reservados: ${reservedFlights.length}`);
    displayReservedFlights(); // Actualizar la lista de vuelos reservados
}

// Mostrar vuelos reservados
function displayReservedFlights() {
    const myFlights = document.getElementById('my-flights');
    myFlights.innerHTML = ''; // Limpiar la lista actual

    if (reservedFlights.length === 0) {
        myFlights.innerHTML = '<p>No tienes vuelos reservados.</p>';
        return;
    }

    reservedFlights.forEach((flight, index) => {
        const reservedCard = document.createElement('div');
        reservedCard.className = 'reserved-card';
        reservedCard.innerHTML = `
            <h3>${flight.airline}</h3>
            <p>De: ${flight.origin}</p>
            <p>A: ${flight.destination}</p>
            <p class="price">$${flight.price}</p>
            <button onclick="cancelFlight(${index})">Cancelar</button>
        `;
        myFlights.appendChild(reservedCard);
    });
}

// Función para cancelar un vuelo
function cancelFlight(index) {
    const cancelledFlight = reservedFlights.splice(index, 1)[0]; // Eliminar el vuelo de la lista
    alert(`Has cancelado tu vuelo con ${cancelledFlight.airline} de ${cancelledFlight.origin} a ${cancelledFlight.destination}.`);
    displayReservedFlights(); // Actualizar la lista de vuelos reservados
}

// Lógica para cargar vuelos al inicio
fetch('flights.json')
    .then(response => response.json())
    .then(data => {
        flights = data; // Guardar los vuelos en la variable global
        displayFilteredFlights(flights); // Mostrar todos los vuelos al inicio
    })
    .catch(error => console.error('Error al cargar flights.json:', error));

// Mostrar vuelos disponibles (ya implementado)
function displayFilteredFlights(filteredFlights) {
    const flightList = document.getElementById('available-flights');
    flightList.innerHTML = ''; // Limpiar la lista actual

    filteredFlights.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-card';
        flightCard.innerHTML = `
            <h3>${flight.airline}</h3>
            <p>De: ${flight.origin}</p>
            <p>A: ${flight.destination}</p>
            <p class="price">$${flight.price}</p>
            <button onclick="reserveFlight('${flight.airline}', '${flight.origin}', '${flight.destination}', ${flight.price})">Reservar</button>
        `;
        flightList.appendChild(flightCard);
    });
}

// Barra de búsqueda (ya implementada)
document.getElementById('search-input').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();

    // Filtrar vuelos según el texto ingresado
    const filteredFlights = flights.filter(flight =>
        flight.airline.toLowerCase().includes(query) ||
        flight.origin.toLowerCase().includes(query) ||
        flight.destination.toLowerCase().includes(query)
    );

    // Mostrar los vuelos filtrados
    displayFilteredFlights(filteredFlights);
});

// Inicializar el mapa
function initMap() {
    try {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.7128, lng: -74.0060 }, // Nueva York por defecto
            zoom: 3
        });

        // Agregar marcadores de vuelos
        flights.forEach(flight => {
            const marker = new google.maps.Marker({
                position: { lat: getRandomLat(), lng: getRandomLng() }, // Coordenadas aleatorias
                map,
                title: `${flight.airline}: ${flight.origin} → ${flight.destination}`
            });
        });
    } catch (error) {
        console.error('Error al cargar el mapa:', error);
        document.getElementById('map-error').style.display = 'block'; // Mostrar el mensaje de error
    }
}

// Generar coordenadas aleatorias
function getRandomLat() {
    return Math.random() * 180 - 90;
}

function getRandomLng() {
    return Math.random() * 360 - 180;
}

let cancelledFlights = []; // Lista de vuelos cancelados

// Función para cancelar un vuelo
function cancelFlight(index) {
    const cancelledFlight = reservedFlights.splice(index, 1)[0]; // Eliminar de reservas
    cancelledFlights.push(cancelledFlight); // Agregar al historial de cancelaciones
    alert(`Has cancelado tu vuelo con ${cancelledFlight.airline} de ${cancelledFlight.origin} a ${cancelledFlight.destination}.`);
    displayReservedFlights(); // Actualizar la lista de vuelos reservados
    displayCancelledFlights(); // Actualizar el historial de vuelos cancelados
}

// Mostrar vuelos cancelados
function displayCancelledFlights() {
    const cancelledList = document.getElementById('cancelled-list');
    cancelledList.innerHTML = ''; // Limpiar la lista actual

    if (cancelledFlights.length === 0) {
        cancelledList.innerHTML = '<p>No has cancelado ningún vuelo.</p>';
        return;
    }

    cancelledFlights.forEach(flight => {
        const cancelledCard = document.createElement('div');
        cancelledCard.className = 'cancelled-card';
        cancelledCard.innerHTML = `
            <h3>${flight.airline}</h3>
            <p>De: ${flight.origin}</p>
            <p>A: ${flight.destination}</p>
            <p class="price">$${flight.price}</p>
        `;
        cancelledList.appendChild(cancelledCard);
    });
}

// Referencias al modal y botón de pago
const payButton = document.getElementById('pay-button');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.querySelector('.close');
const paymentTotal = document.getElementById('payment-total');
const paymentForm = document.getElementById('payment-form');

// Mostrar el modal con el total a pagar
payButton.addEventListener('click', () => {
    const total = reservedFlights.reduce((sum, flight) => sum + flight.price, 0);
    paymentTotal.textContent = `$${total}`;
    paymentModal.style.display = 'flex';
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

// Procesar el formulario de pago
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pago procesado con éxito. ¡Gracias por tu reserva!');
    reservedFlights = []; // Vaciar las reservas después del pago
    displayReservedFlights(); // Actualizar la lista de reservas
    paymentModal.style.display = 'none';
});

// Generar un número aleatorio para el vuelo
function generateFlightNumber() {
    return `FL-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Generar datos ficticios del usuario
function generatePassengerInfo() {
    const names = ['Juan Pérez', 'Ana López', 'Carlos García', 'María Fernández'];
    const ids = ['ID-12345', 'ID-67890', 'ID-54321', 'ID-98765'];
    return {
        name: names[Math.floor(Math.random() * names.length)],
        id: ids[Math.floor(Math.random() * ids.length)],
        email: 'usuario@example.com'
    };
}

// Generar un PDF con los detalles del vuelo
function generatePDF(flight, flightNumber, passenger) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFontSize(16);
    doc.text('Detalles de la Reserva de Vuelo', 10, 10);

    // Información del vuelo
    doc.setFontSize(12);
    doc.text(`Número de Vuelo: ${flightNumber}`, 10, 30);
    doc.text(`Aerolínea: ${flight.airline}`, 10, 40);
    doc.text(`Origen: ${flight.origin}`, 10, 50);
    doc.text(`Destino: ${flight.destination}`, 10, 60);
    doc.text(`Precio: $${flight.price}`, 10, 70);
    doc.text(`Hora de Salida: 10:00 AM`, 10, 80);
    doc.text(`Hora de Llegada: 2:00 PM`, 10, 90);

    // Información del pasajero
    doc.text(`Nombre del Pasajero: ${passenger.name}`, 10, 110);
    doc.text(`ID: ${passenger.id}`, 10, 120);
    doc.text(`Correo Electrónico: ${passenger.email}`, 10, 130);

    // Guardar el PDF
    doc.save(`reserva_${flightNumber}.pdf`);
}

// Modificar la función de reserva
function reserveFlight(airline, origin, destination, price) {
    if (reservedFlights.length >= 3) {
        alert('Solo puedes reservar un máximo de 3 vuelos.');
        return;
    }

    const flight = { airline, origin, destination, price };
    reservedFlights.push(flight);
    const flightNumber = generateFlightNumber();
    const passengerInfo = generatePassengerInfo();

    alert(`¡Has reservado un vuelo con ${airline} de ${origin} a ${destination} por $${price}!\nNúmero de Vuelo: ${flightNumber}`);
    displayReservedFlights(); // Actualizar la lista de vuelos reservados
    generatePDF(flight, flightNumber, passengerInfo); // Generar el PDF
}

// Referencias al modal y botón de feedback
const feedbackButton = document.getElementById('feedback-button');
const feedbackModal = document.getElementById('feedback-modal');
const closeFeedback = document.querySelector('.close-feedback');
const feedbackForm = document.getElementById('feedback-form');

// Abrir el modal
feedbackButton.addEventListener('click', () => {
    feedbackModal.style.display = 'flex';
});

// Cerrar el modal
closeFeedback.addEventListener('click', () => {
    feedbackModal.style.display = 'none';
});

// Manejar el envío del formulario
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedbackText = document.getElementById('feedback-text').value;
    alert(`¡Gracias por tu mensaje! Hemos recibido lo siguiente:\n"${feedbackText}"`);
    feedbackModal.style.display = 'none';
    feedbackForm.reset(); // Limpiar el formulario
});
