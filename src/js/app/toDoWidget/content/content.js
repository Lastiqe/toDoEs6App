import { app } from '../../app.js'
export class Content {
    constructor() {
        this.toDoList = document.querySelector('.todo-list');
        this.toDoList.addEventListener('click', (event) => {
            const checkboxClick = event.target.closest('input');
            const DeleteButtonClick = event.target.closest('.destroy');
            if (checkboxClick) {
                const item = event.target.closest('li');
                const taskId = item.firstElementChild.getAttribute('data-id');
                let taskStatus;
                if (!item.matches('.completed')) {
                    taskStatus = true;
                    app.toDoWidget.updateTask(taskId, taskStatus);
                } else {
                    taskStatus = false;
                    app.toDoWidget.updateTask(taskId, taskStatus);
                }
                item.classList.toggle('completed');
            }
            if (DeleteButtonClick) {
                const item = event.target.closest('li');
                app.toDoWidget.deleteTask(item);
            }
        });
    }


}