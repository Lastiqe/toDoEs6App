import { Store } from '../store/store.js';
import { Input } from './input/input.js';
import { utills } from '../../utills/utills.js';
import { DashBoard } from './dashBoard/dashBoard.js';
import { Content } from './content/content.js';

export class ToDoWidget {
    constructor() {
        this.clearAllCompleted = document.querySelector('.clear-completed');
        this.store = new Store();
        this.content = new Content();
        this.dashBoard = new DashBoard();
        this.input = new Input();
    }

    createTask(text, taskId, taskStatus) {
        const taskTemplate = document.createElement('li');
        taskTemplate.innerHTML = ` 
					<div class="view" data-id="${taskId}">
						<input class="toggle" type="checkbox">
						<label>${text}</label>
						<button class="destroy"></button>
					</div>
					<input class="edit">`
        if (taskStatus) {
            taskTemplate.classList.add('completed');
            taskTemplate.querySelector('input.toggle').checked = true;
        }
        this.content.toDoList.appendChild(taskTemplate);
    }

    addTask(text) {
        if (text) {
            const taskStatus = false;
            const taskId = utills.generateId();
            const task = utills.generateTaskProps(taskStatus, text, taskId);
            const tasksArray = this.store.getTasks();
            tasksArray.push(task);
            this.store.setTasks(tasksArray);
            this.store.updateLocalStorage(tasksArray);
            this.createTask(text, taskId);
            this.dashBoard.dashBoardShowToggle(tasksArray);
        }
        this.dashBoard.setCounter();
        this.dashBoard.clearAllCompletedButtonShowToggle();
        this.input.toggleAllTasksInit();
    }

    deleteTask(task) {
        const taskId = task.firstElementChild.getAttribute('data-id');
        const updatedTasksArray = this.store.getTasks()
            .filter((item) => item.id !== taskId);
        this.store.updateLocalStorage(updatedTasksArray);
        this.store.tasksArrayInit();
        task.remove();

        this.dashBoard.dashBoardShowToggle(updatedTasksArray);
        this.dashBoard.setCounter();
        this.dashBoard.clearAllCompletedButtonShowToggle();
        this.input.toggleAllTasksInit();
    }

    updateTask(taskId, status) {
        const updatedTasksArray = this.store.getTasks();
        updatedTasksArray.map((item) => {
            if (item.id === taskId) {
                if (status !== undefined) item.status = status;
            }
        });
        this.store.updateLocalStorage(updatedTasksArray);
        this.store.tasksArrayInit();
        this.dashBoard.setCounter();
        this.dashBoard.clearAllCompletedButtonShowToggle();
        this.input.toggleAllTasksInit();
    }

    deleteAllCompleteTasks() {
        const completedToDoListItems = document
            .querySelectorAll('.todo-list > .completed');
        completedToDoListItems.forEach((item) => this.deleteTask(item))
    }
}
