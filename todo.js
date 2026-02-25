// Data: Initial tasks
let tasks = JSON.parse(localStorage.getItem('myTodos')) || [];

// 1. Initial Render
render();

function render() {
    const list = document.getElementById('todoList');
    if (!list) return; // Guard clause
    
    list.innerHTML = '';
    
    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'todo-item';
        item.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggle(${task.id})">
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            </div>
            <div class="task-actions">
                <button class="btn-icon edit-icon" onclick="edit(${task.id})"><i data-lucide="pencil"></i></button>
                <button class="btn-icon delete-icon" onclick="remove(${task.id})"><i data-lucide="trash-2"></i></button>
            </div>
        `;
        list.appendChild(item);
    });

    // Refresh icons and stats
    if (window.lucide) lucide.createIcons();
    updateStats();
    localStorage.setItem('myTodos', JSON.stringify(tasks));
}

// 2. Logic Functions
function addTask() {
    const input = document.getElementById('todoInput');
    if (!input || !input.value.trim()) return;
    tasks.push({ id: Date.now(), text: input.value.trim(), completed: false });
    input.value = '';
    render();
}

function toggle(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    render();
}

function remove(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
}

function edit(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        tasks = tasks.map(t => t.id === id ? {...t, text: newText.trim()} : t);
        render();
    }
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    const totalEl = document.getElementById('totalCount');
    const completedEl = document.getElementById('completedCount');
    const activeEl = document.getElementById('activeCount');

    if (totalEl) totalEl.innerText = total;
    if (completedEl) completedEl.innerText = completed;
    if (activeEl) activeEl.innerText = total - completed;
}
