'use strict';
import { ToDoWidget } from './toDoWidget/toDoWidget.js';

class App {
    constructor() {
        this.toDoWidget = new ToDoWidget();
    }
    init() {
        this.toDoWidget.store.tasksArrayInit();
        const tasksArray = this.toDoWidget.store.getTasks();
        tasksArray.map(item => {
            this.toDoWidget.createTask(item.text, item.id, item.status);
        })
        this.toDoWidget.dashBoard.dashBoardShowToggle(tasksArray);
        this.toDoWidget.dashBoard.setCounter();
        this.toDoWidget.dashBoard.clearAllCompletedButtonShowToggle();
        this.toDoWidget.input.toggleAllTasksInit();
    }
}




export const app = new App();

app.init();

