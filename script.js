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
function addTask(title, description, deadline, priority, status) {
    if (!title || !description || !deadline || !priority) {
        alert("Per favore, compila tutti i campi.");
        return;
    }

    const task = {
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
        status: status
    };

    renderTask(task);  // Passa l'attività alla funzione renderTask
    closeModal(); // Chiude la modale dopo che l'attività è stata aggiunta
}

// Funzione per visualizzare l'attività nella colonna corretta
function renderTask(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card', task.status);  // Imposta la classe con il colore
    taskCard.setAttribute('draggable', 'true');
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
                <option value="follow-up" ${task.status === 'follow-up' ? 'selected' : ''}>Da seguire</option>
            </select>
        </div>
        <button class="delete-btn">Cancella</button>
    `;

    taskCard.querySelector('.status-select').addEventListener('change', (e) => {
        const newStatus = e.target.value;
        updateTaskStatus(taskCard, newStatus);
    });

    taskCard.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskCard));

    const column = document.getElementById(task.status);
    if (column) {
        column.querySelector('.task-container').appendChild(taskCard);
    }
}

// Funzione per aggiornare lo stato dell'attività
function updateTaskStatus(taskCard, newStatus) {
    taskCard.classList.remove('to-do', 'in-progress', 'waiting', 'follow-up', 'completed');
    taskCard.classList.add(newStatus);
    taskCard.querySelector('.status-select').value = newStatus;
    const newColumn = document.getElementById(newStatus);
    if (newColumn) {
        newColumn.querySelector('.task-container').appendChild(taskCard);
    }
    taskCard.setAttribute('data-status', newStatus);
}

// Funzione per cancellare un'attività
function deleteTask(taskCard) {
    taskCard.remove();
}

// Funzione di apertura modale per aggiungere attività
window.onload = () => {
    setDate();

    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', openModal);

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', closeModal);

    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;
        const priority = document.getElementById('priority').value;
        const status = document.getElementById('status').value;

        addTask(title, description, deadline, priority, status);
    });
};
