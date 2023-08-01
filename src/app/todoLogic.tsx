import { makeAutoObservable } from 'mobx';
import { TaskItem, btnType, statusType } from './ts/type';


class TodoLogic {
    tasks: TaskItem[] = [];
    buttonType: btnType = "Add";
    updateTaskId: string = "";
    downTaskId: null | string = null;

    task: TaskItem = {
        id: '',
        title: '',
        description: '',
        status: 'toDo',
        createdAt: new Date().toLocaleDateString(),
        soft_delete: null
    }

    constructor() {
        makeAutoObservable(this);
    }


    

    addTask(task: TaskItem) {
        this.tasks.push(task);

        fetch("http://localhost:8000/taskList", {
            method: "POST",
            body: JSON.stringify(this.tasks)
        })

        
    }


    deleteTask(taskId: string) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    handlePointerEnter = (item: statusType) => {
        if (todoStore.downTaskId) {
            const selectedTask = todoStore.tasks.find(task => task.id === todoStore.downTaskId)
            selectedTask!.status = item
            todoStore.downTaskId = null
        }
    }

    handlePointerDown = (taskId: string) => {
        todoStore.downTaskId = taskId
    }
    handlePointerUp = () => {
        todoStore.downTaskId = null
    }
}

const todoStore = new TodoLogic();
export default todoStore;