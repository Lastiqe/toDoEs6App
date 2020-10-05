export class Store {
    constructor() {
        this.tasksArray = []
    }

    getTasks() {
        return this.tasksArray.slice();
    }

    setTasks(tasksData) {
        this.tasksArray = tasksData;
    }

    tasksArrayInit() {
        const tasksData = localStorage.getItem('taskItems');
        if (tasksData) this.setTasks(JSON.parse(tasksData));
    }

    updateLocalStorage(tasksArray) {
        const JSONtasksArray = JSON.stringify(tasksArray);
        localStorage.setItem('taskItems', JSONtasksArray);
    }
}



