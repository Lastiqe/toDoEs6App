import { app } from '../../app.js'

export class Input {
    constructor() {
        this.inputField = document.querySelector('.new-todo');
        this.toggleAll = document.querySelector('#toggle-all');

        this.inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                app.toDoWidget.addTask(e.target.value)
                e.target.value = null;
            }
        })
        this.toggleAll.addEventListener('click', () => {
            this.toggleAll.checked === true
                ? this.toggleAllTasks('completeAll')
                : this.toggleAllTasks('clearAll');
        })
    }
    toggleAllTasks(action) {
        const toDoListItems = document.querySelectorAll('.todo-list > li');
        if (toDoListItems) {
            toDoListItems.forEach((item, index) => {
                const taskId = item.firstElementChild.getAttribute('data-id');
                if (action === 'completeAll') {
                    const taskStatus = true;
                    if (!item.matches('.completed')) {
                        item.classList.add('completed');
                        item.querySelector('.toggle').checked = true;
                        app.toDoWidget.updateTask(taskId, taskStatus);
                    }
                }
                if (action === 'clearAll') {
                    const taskStatus = false;
                    if (item.matches('.completed')) {
                        item.classList.remove('completed');
                        item.querySelector('.toggle').checked = false;
                        app.toDoWidget.updateTask(taskId, taskStatus);
                    }
                }
            })
        }
    }
    toggleAllTasksInit() {
        const toDoListItems = document.querySelectorAll('.todo-list > li');
        let completedTaskCount = 0;
        toDoListItems.forEach((item) => {
            if (item.classList.contains('completed')) completedTaskCount++;
        })
        if (toDoListItems.length === completedTaskCount) this.toggleAll.checked = true
    }

}

