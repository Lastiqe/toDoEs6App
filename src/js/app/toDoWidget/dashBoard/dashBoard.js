import { app } from '../../app.js'

export class DashBoard {
    constructor() {
        this.mainSection = document.querySelector('.main');
        this.footer = document.querySelector('.footer');
        this.toDoCount = document.querySelector('.todo-count');
        this.clearAllCompleted = document.querySelector('.clear-completed');
        this.typeSelector = document.querySelectorAll('.filters > li > a');

        this.clearAllCompleted.addEventListener('click', () => {
            app.toDoWidget.deleteAllCompleteTasks();
        })

        this.typeSelector.forEach(item => {
            item.addEventListener('click', event => {
                this.typeSelector.forEach(item => item.classList.remove('selected'));
                event.currentTarget.classList.add('selected');
                this.filterTasks(event.currentTarget.classList[0])
            })
        })
    }

    dashBoardShowToggle(tasksArray) {
        if (tasksArray.length === 0) {
            this.mainSection.style.display = 'none';
            this.footer.style.display = 'none';
        } else {
            this.mainSection.style.display = 'block';
            this.footer.style.display = 'block';
        }
    }

    clearAllCompletedButtonShowToggle() {
        const completedTasksCount = app.toDoWidget.store.getTasks().filter(item => item.status === true).length;
        this.clearAllCompleted.style.display = 'none';

        if (completedTasksCount > 0) {
            console.log("вкл");
            this.clearAllCompleted.style.display = 'block'
        }
    }

    setCounter() {
        const completedTasksCount = app.toDoWidget.store.getTasks().filter(item => item.status === true).length;
        const allTasksCount = app.toDoWidget.store.getTasks().length;
        const count = allTasksCount - completedTasksCount;
        this.toDoCount.firstElementChild.textContent = count;
    }

    filterTasks(filterParams) {
        const filterToggle = (itemType) => {
            const allTasks = document.querySelectorAll('.todo-list > li');
            const completedTasks = document.querySelectorAll('.completed');

            allTasks.forEach((item) => {
                item.classList.remove('hidden');
            })

            if (itemType === 'active') {
                completedTasks.forEach((item) => {
                    item.classList.add('hidden');
                })
            }
            if (itemType === 'completed') {
                allTasks.forEach((item) => {
                    item.classList.add('hidden');
                })
                completedTasks.forEach((item) => {
                    item.classList.remove('hidden');
                })
            }
        }
        switch (filterParams) {
            case 'no-filter': return filterToggle();
            case 'active-filter': return filterToggle('active');
            case 'complete-filter': return filterToggle('completed');
            default: return;
        }
    }
}



