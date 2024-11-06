class Room {
    constructor(id, name, capacity) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.reservations = [];
    }

    isAvailable(date) {
        return !this.reservations.some(reservation => reservation.date === date);
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    removeReservation(reservationId) {
        this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId);
    }
}

class Reservation {
    constructor(id, roomId, date, name) {
        this.id = id;
        this.roomId = roomId;
        this.date = date;
        this.name = name;
    }
}

const rooms = [
    new Room(1, 'Conference Room A', 10),
    new Room(2, 'Conference Room B', 15),
    new Room(3, 'Meeting Room C', 5)
];

let reservationIdCounter = 1;

function addNewReservation(roomId, date, name) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        alert("Room not found.");
        return;
    }

    if (!room.isAvailable(date)) {
        alert("Room is not available on the selected date.");
        return;
    }

    const newReservation = new Reservation(reservationIdCounter++, roomId, date, name);
    room.addReservation(newReservation);
    alert("Reservation added successfully.");
    renderReservations();
}

function renderRooms() {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = "<h3>Room List</h3>";

    rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.innerText = `${room.name} (Capacity: ${room.capacity}) - ID: ${room.id}`;
        roomList.appendChild(roomElement);
    });
}

function renderReservations() {
    const reservationList = document.getElementById('reservation-list');
    reservationList.innerHTML = "<h3>Reservation List</h3>";

    rooms.forEach(room => {
        if (room.reservations.length > 0) {
            const roomHeader = document.createElement('h4');
            roomHeader.innerText = `Reservations for ${room.name}`;
            reservationList.appendChild(roomHeader);

            room.reservations.forEach(reservation => {
                const reservationElement = document.createElement('div');
                reservationElement.innerText = `Room: ${room.name}, Date: ${reservation.date}, Name: ${reservation.name}`;
                reservationElement.setAttribute('data-id', reservation.id);

                const cancelButton = document.createElement('button');
                cancelButton.innerText = "Cancel";
                cancelButton.onclick = () => cancelReservation(reservation.id, room.id);
                reservationElement.appendChild(cancelButton);

                reservationList.appendChild(reservationElement);
            });
        }
    });
}

function cancelReservation(reservationId, roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        room.removeReservation(reservationId);
        alert("Reservation cancelled.");
        renderReservations();
    } else {
        alert("Room not found.");
    }
}

function handleAddReservation() {
    const roomId = parseInt(document.getElementById('roomId').value);
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;

    if (roomId && date && name) {
        addNewReservation(roomId, date, name);
    } else {
        alert("Please fill out all fields.");
    }
}

// Initial rendering of rooms and reservations
renderRooms();
renderReservations();
