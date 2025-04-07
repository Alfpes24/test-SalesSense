document.addEventListener('DOMContentLoaded', () => {

    // Apertura modale
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeModalBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    addTaskBtn.onclick = () => modal.style.display = 'block';
    closeModalBtn.onclick = () => modal.style.display = 'none';
    cancelBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Aggiunta Task
    const taskForm = document.getElementById('taskForm');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value;
        const category = document.getElementById('taskCategory').value;
        const deadline = document.getElementById('taskDeadline').value;
        const priority = document.getElementById('taskPriority').value;
        const status = document.getElementById('taskStatus').value;

        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card', status);
        taskCard.innerHTML = `
            <strong>${title}</strong>
            <p>📂 ${category}</p>
            <p>📅 ${deadline}</p>
            <p>🎯 ${priority}</p>
        `;

        document.querySelector(`#${status} .task-container`).appendChild(taskCard);

        taskForm.reset();
        modal.style.display = 'none';

        taskCard.onclick = () => taskCard.remove(); // semplice cancellazione task al click
    });
});
