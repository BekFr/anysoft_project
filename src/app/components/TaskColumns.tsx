import { observer } from "mobx-react-lite"
import { todoStore } from "../todoLogic"
import { TaskItem, statusType } from "../ts/type"

const TaskColumns = observer(({ tasks, statusItem }: { tasks: TaskItem[], statusItem: statusType }) => {


    return (
        tasks.filter(el => el.status === statusItem).map((taskItem, index) => (

            <div
                draggable
                key={taskItem.id}
                className="flex items-center bg-gray-100 px-4 py-2 border border-gray-300 rounded mt-2"
                onPointerDown={() => todoStore.handlePointerDown(taskItem.id)}
                onPointerUp={todoStore.handlePointerUp}
            >
                <div className="flex-1 space-y-3">
                    <h1 className='text-2xl'>{taskItem.title}</h1>
                    <h4>{taskItem.description}</h4>
                </div>

                <div className="flex flex-col space-y-3">
                    <button
                        className="px-2 py-1 mr-2 bg-blue-500 text-white rounded"
                        onClick={() => todoStore.handleUpdateTask(taskItem.id, taskItem.title, taskItem.description)}
                    >
                        Update
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => todoStore.deleteTask(taskItem.id, taskItem)}
                    >
                        Delete
                    </button>
                    <span>Story point: {taskItem.story_point}</span>
                </div>
            </div>
        ))

    )
})

export default TaskColumns