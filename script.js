// Funzione per visualizzare la data corrente
function setDate() {
    const dateElement = document.getElementById('date');
    const today = new Date();
    const dateString = today.toLocaleDateString('it-IT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateElement.textContent = dateString;
}

// Funzione per aprire la modale
function openModal() {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'block';
}

// Funzione per chiudere la modale
function closeModal() {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
}

// Funzione per aggiungere una nuova attività
function addTask(title, description, deadline, priority) {
    console.log("Funzione addTask chiamata");
    console.log("Dati ricevuti:", title, description, deadline, priority);

    if (!title || !description || !deadline || !priority) {
        alert("Per favore, compila tutti i campi.");
        return;
    }

    const task = {
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
        status: 'to-do'  // Impostiamo lo stato di default come "Da fare"
    };

    renderTask(task);  // Passa l'attività alla funzione renderTask
    closeModal(); // Chiude la modale dopo che l'attività è stata aggiunta
}

// Funzione per visualizzare l'attività nella colonna corretta
function renderTask(task) {
    console.log("Rendering activity:", task);  

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('draggable', 'true');  // Imposta l'attività come trascinabile
    taskCard.innerHTML = `
        <p><strong>${task.title}</strong></p>
        <p>Descrizione: ${task.description}</p>
        <p><small>Scadenza: ${task.deadline}</small></p>
        <p><small>Priorità: ${task.priority}</small></p>
        <div>
            <label for="status-select">Sposta a:</label>
            <select class="status-select">
                <option value="to-do" ${task.status === 'to-do' ? 'selected' : ''}>Da fare</option>
                <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In corso</option>
                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completato</option>
                <option value="waiting" ${task.status === 'waiting' ? 'selected' : ''}>In attesa</option>
            </select>
        </div>
        <button class="delete-btn">Cancella</button>
    `;

    taskCard.querySelector('.status-select').addEventListener('change', (e) => {
        const newStatus = e.target.value;
        updateTaskStatus(taskCard, newStatus);
    });

    taskCard.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskCard));

    // Seleziona la colonna in base allo stato e aggiungi la card
    const column = document.getElementById(task.status);
    if (column) {
        column.querySelector('.task-container').appendChild(taskCard);
    } else {
        console.log("Colonna non trovata:", task.status);
    }
}

// Funzione per aggiornare lo stato dell'attività
function updateTaskStatus(taskCard, newStatus) {
    // Aggiorna lo stato dell'attività nel DOM
    taskCard.querySelector('.status-select').value = newStatus;
    const statusLabel = taskCard.querySelector('small');
    if (statusLabel) {
        statusLabel.textContent = `Stato: ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`; // "Da fare", "In corso", ecc.
    }

    // Sposta la card nella colonna corrispondente
    const newColumn = document.getElementById(newStatus);
    if (newColumn) {
        newColumn.querySelector('.task-container').appendChild(taskCard);
    }

    taskCard.setAttribute('data-status', newStatus);  // Aggiungi l'attributo data-status per tracciare lo stato
}

// Funzione per cancellare un'attività
function deleteTask(taskCard) {
    taskCard.remove();
}

// Funzione di apertura modale per aggiungere attività
window.onload = () => {
    setDate();  // Imposta la data corrente

    // Apre la modale quando clicchi su "Aggiungi Attività"
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', openModal);

    // Chiude la modale quando clicchi su "X"
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', closeModal);

    // Aggiungi l'attività quando l'utente clicca su "Aggiungi" nel form
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;
        const priority = document.getElementById('priority').value;

        addTask(title, description, deadline, priority); // Aggiungi l'attività alla lista
    });
};
