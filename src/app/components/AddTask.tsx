import { TaskItem } from '../ts/type';
import todoStore from '../todoLogic';
import { observer } from 'mobx-react-lite';

const AddTask = observer(() => {

    const task = todoStore.task;
    const handleAddUpdateTask = () => {
        if (todoStore.updateTaskId) {
            const selectedTask = todoStore.tasks.find(task => task.id === todoStore.updateTaskId)
            selectedTask!.title = task.title
            selectedTask!.description = task.description

            fetch(`http://localhost:8000/taskList/${selectedTask!.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...selectedTask,
                    title: task.title,
                    description: task.description
                })
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))

            todoStore.buttonType = "Add"
            todoStore.updateTaskId  = ""

        } else {
            const Task: TaskItem = {
                id: String(Date.now()),
                title: task.title,
                description: task.description,
                status: 'toDo',
                createdAt: new Date().toISOString(),
                soft_delete: null,
            };
            todoStore.addTask(Task);
        }


        task.title = '';
        task.description = '';
    };


    return (
        <div className="flex flex-col space-y-3 mb-4">
            <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-l"
                placeholder="Add a task title"
                value={task.title}
                onChange={(e) => task.title = e.target.value}
            />
            <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-l"
                placeholder="Add a task description"
                value={task.description}
                onChange={(e) => task.description = e.target.value}
            />

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r w-max h-max self-end"
                onClick={handleAddUpdateTask}
            >
                {todoStore.buttonType}  Task
            </button>
        </div>
    )
})

export default AddTask