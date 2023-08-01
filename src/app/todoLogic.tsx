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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }


    deleteTask(taskId: string) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);

        fetch(`http://localhost:8000/taskList/${taskId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    handleUpdateTask = (taskId: string, title: string, description: string) => {
        todoStore.buttonType = "Update"
        todoStore.updateTaskId = taskId
        todoStore.task.title = title
        todoStore.task.description = description
    };

    handlePointerEnter = (item: statusType) => {
        if (todoStore.downTaskId) {
            const selectedTask = todoStore.tasks.find(task => task.id === todoStore.downTaskId)
            selectedTask!.status = item
            todoStore.downTaskId = null

            fetch(`http://localhost:8000/taskList/${selectedTask!.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...selectedTask,
                    status: item
                })
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
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