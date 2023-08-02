"use client"
import { TaskItem } from '../ts/type';
import { todoStore } from '../todoLogic';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const AddTask = observer(() => {

    const task = todoStore.task;
    const storyPointers = [1, 2, 3]
    const handleAddUpdateTask = () => {
        if (todoStore.updateTaskId) {
            const selectedTask = todoStore.tasks.find(task => task.id === todoStore.updateTaskId)
            selectedTask!.title = task.title
            selectedTask!.description = task.description
            selectedTask!.story_point = task.story_point

            fetch(`http://localhost:8000/taskList/${selectedTask!.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...selectedTask,
                    title: task.title,
                    description: task.description,
                    story_point: task.story_point
                })
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))

            todoStore.buttonType = "Add"
            todoStore.updateTaskId = ""

        } else if (task.title.trim() !== "") {
            const Task: TaskItem = {
                id: String(Date.now()),
                title: task.title,
                description: task.description,
                status: 'toDo',
                createdAt: new Date().toISOString(),
                soft_delete: null,
                story_point: task.story_point
            };
            todoStore.addTask(Task);
        }


        task.title = '';
        task.description = '';
        task.story_point = 1;
    };


    return (
        <div className="flex flex-col space-y-3 mb-4">
            <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-l flex-1"
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

            <div className=''>
                <p className='text-lg'>Set story Point (default 1)</p>
                {
                    storyPointers.map(point => (
                        <button
                            key={point}
                            style={{
                                backgroundColor: task.story_point === point ? 'rgb(15 118 110)' : 'rgb(20 184 166)',
                            }}
                            onClick={() => {
                                task.story_point = point
                            }}
                            className='w-10 h-10 border-2 text-center text-white'
                        >
                            { point }
                        </button>
                    ))
                }
            </div>

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r w-max h-max self-end"
                onClick={handleAddUpdateTask}
            >
                {todoStore.buttonType} Task
            </button>
        </div>
    )
})

export default AddTask