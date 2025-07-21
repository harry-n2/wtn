document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button onclick="toggleTask(${index})">✅</button>
                    <button onclick="deleteTask(${index})">❌</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // 初期サンプル
    tasks.push({ text: '今日の冒険の計画を立てる', completed: false });
    renderTasks();
});
