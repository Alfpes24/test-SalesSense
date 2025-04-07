document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeModalBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const taskForm = document.getElementById('taskForm');

    let editingTaskId = null;

    // Apri modale
    addTaskBtn.onclick = () => {
        modal.style.display = 'flex';
        taskForm.reset();
        editingTaskId = null;
    };

    // Chiudi modale
    const closeModal = () => {
        modal.style.display = 'none';
        taskForm.reset();
        editingTaskId = null;
    };

    closeModalBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };

    // Aggiungi o modifica task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value;
        const category = document.getElementById('taskCategory').value;
        const deadline = document.getElementById('taskDeadline').value;
        const priority = document.getElementById('taskPriority').value;
        const status = document.getElementById('taskStatus').value;

        let taskCard;

        if (editingTaskId) {
            taskCard = document.querySelector(`[data-id='${editingTaskId}']`);
            if (taskCard) taskCard.remove();
        } else {
            editingTaskId = Date.now();
        }

        taskCard = document.createElement('div');
        taskCard.classList.add('task-card', status);
        taskCard.setAttribute('data-id', editingTaskId);
        taskCard.innerHTML = `
            <strong>${title}</strong>
            <p>📂 ${category}</p>
            <p>📅 ${deadline}</p>
            <p>🎯 ${priority}</p>
        `;

        taskCard.addEventListener('click', () => {
            document.getElementById('taskTitle').value = title;
            document.getElementById('taskCategory').value = category;
            document.getElementById('taskDeadline').value = deadline;
            document.getElementById('taskPriority').value = priority;
            document.getElementById('taskStatus').value = status;

            editingTaskId = taskCard.getAttribute('data-id');
            modal.style.display = 'flex';
        });

        document.querySelector(`#${status} .task-container`).appendChild(taskCard);

        closeModal();
    });
});
