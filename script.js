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
        status: 'to-do'
    };

    renderTask(task);
}

// Funzione per visualizzare l'attività nella colonna "Da fare"
function renderTask(task) {
    console.log("Rendering activity:", task);

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('draggable', 'true'); 
    taskCard.innerHTML = `
        <p><strong>${task.title}</strong></p>
        <p>${task.description}</p>
        <p><small>Scadenza: ${task.deadline}</small></p>
        <p><small>Priorità: ${task.priority}</small></p>
        <button class="edit-btn">Modifica</button>
        <button class="delete-btn">Cancella</button>
    `;

    taskCard.querySelector('.edit-btn').addEventListener('click', () => editTask(taskCard, task));
    taskCard.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskCard));

    const column = document.getElementById(task.status);
    if (column) {
        column.querySelector('.task-container').appendChild(taskCard);
        sortTasksByPriority();  
    } else {
        console.log("Colonna non trovata:", task.status);
    }
}

// Funzione per ordinare le attività in base alla priorità
function sortTasksByPriority() {
    const tasks = document.querySelectorAll('.task-card');
    const tasksArray = Array.from(tasks);
    
    tasksArray.sort((a, b) => {
        const priorityA = a.querySelector('small').textContent.toLowerCase();
        const priorityB = b.querySelector('small').textContent.toLowerCase();
        
        const priorityOrder = { 'alta': 1, 'media': 2, 'bassa': 3 };

        return priorityOrder[priorityA] - priorityOrder[priorityB];
    });

    const taskContainer = document.querySelector('#to-do .task-container');
    tasksArray.forEach(task => taskContainer.appendChild(task));
}

// Funzione per modificare un'attività
function editTask(taskCard, task) {
    const newTitle = prompt("Modifica il titolo dell'attività", task.title);
    const newDescription = prompt("Modifica la descrizione", task.description);
    const newDeadline = prompt("Modifica la scadenza", task.deadline);
    const newPriority = prompt("Modifica la priorità", task.priority);

    if (newTitle) task.title = newTitle;
    if (newDescription) task.description = newDescription;
    if (newDeadline) task.deadline = newDeadline;
    if (newPriority) task.priority = newPriority;

    taskCard.innerHTML = `
        <p><strong>${task.title}</strong></p>
        <p>${task.description}</p>
        <p><small>Scadenza: ${task.deadline}</small></p>
        <p><small>Priorità: ${task.priority}</small></p>
        <button class="edit-btn">Modifica</button>
        <button class="delete-btn">Cancella</button>
    `;
    taskCard.querySelector('.edit-btn').addEventListener('click', () => editTask(taskCard, task));
    taskCard.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskCard));
}

// Funzione per cancellare un'attività
function deleteTask(taskCard) {
    taskCard.remove();
}

// Funzione per abilitare il drag-and-drop
function enableDragAndDrop() {
    const taskCards = document.querySelectorAll('.task-card');
    const columns = document.querySelectorAll('.kanban-column');

    taskCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            const taskId = card.querySelector('strong').textContent;
            e.dataTransfer.setData('task-id', taskId);  
            console.log(`Dragging task with ID: ${taskId}`);  
            card.classList.add('dragging');  
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');  
        });
    });

    columns.forEach(col => {
        col.addEventListener('dragover', (e) => {
            e.preventDefault();  
        });

        col.addEventListener('drop', (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('task-id');  
            console.log(`Dropped task with ID: ${taskId} into column: ${col.id}`);  

            const droppedCard = [...document.querySelectorAll('.task-card')]
                .find(card => card.querySelector('strong').textContent === taskId);

            if (droppedCard) {
                const newStatus = col.id;  // Ottieni il nuovo stato della colonna
                droppedCard.querySelector('small').textContent = `Stato: ${newStatus}`;  // Aggiorna lo stato visibile
                droppedCard.setAttribute('data-status', newStatus);  // Aggiungi o aggiorna l'attributo data-status
                
                // Verifica se il nuovo stato è applicato
                console.log(`Updated status for task ${taskId} to: ${newStatus}`);

                col.querySelector('.task-container').appendChild(droppedCard);  // Sposta la card nella colonna
                updateTaskStatus(taskId, newStatus);  
                sortTasksByPriority();  
            }
        });
    });
}

// Funzione per aggiornare lo stato dell'attività quando viene spostata
function updateTaskStatus(taskId, newStatus) {
    const task = [...document.querySelectorAll('.task-card')]
        .find(card => card.querySelector('strong').textContent === taskId);

    if (task) {
        const statusElement = task.querySelector('small');
        if (statusElement) {
            statusElement.textContent = `Stato: ${newStatus}`;  
            task.setAttribute('data-status', newStatus); 
            console.log(`Task status updated in DOM for task ${taskId}: ${newStatus}`);
        }
    }
}


window.onload = () => {
    setDate();

    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', () => {
        const title = prompt("Inserisci il titolo dell'attività:");
        const description = prompt("Inserisci la descrizione dell'attività:");
        const deadline = prompt("Inserisci la scadenza dell'attività:");
        const priority = prompt("Inserisci la priorità (bassa, media, alta):");
        
        addTask(title, description, deadline, priority); 
    });

    enableDragAndDrop();  
};
