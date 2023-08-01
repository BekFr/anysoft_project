"use client"
import AddTask from './components/AddTask';
import todoStore from './todoLogic';
import { observer } from 'mobx-react-lite';
import { TaskItem, statusType } from './ts/type';
import { useEffect, useState } from 'react';


const Home = observer(() => {
  const task = todoStore.task;

  const handleDeleteTask = (taskId: string) => {
    todoStore.deleteTask(taskId);
  };

  const handleUpdateTask = (taskId: string, title: string, description: string) => {
    todoStore.buttonType = "Update"
    todoStore.updateTaskId = taskId
    task.title = title
    task.description = description
  };

  const typeOfGroups: statusType[] = ["toDo", "inProgress", "done"]

  useEffect ( () => {
    fetch("http://localhost:8000/taskList")
      .then(res => res.json())
      .then(data => todoStore.tasks = data)
  }, [])

  return (
    <div className="container mx-auto mt-5 px-5">
      <h1 className="text-3xl font-semibold mb-4">To-Do App</h1>
      <AddTask />
      <div>
        {
          typeOfGroups.map((item) => (
            <div
              className='min-h-[100px] border mb-10'
              key={item}
              onPointerEnter={() => todoStore.handlePointerEnter(item)}
            >
              <h3 className='border'>{item}</h3>
              {
                todoStore.tasks.filter(el => el.status === item).map((taskItem, index) => (
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
                    <div className="flex-1">{taskItem.createdAt}</div>
                    <button
                      className="px-2 py-1 mr-2 bg-blue-500 text-white rounded"
                      onClick={() => handleUpdateTask(taskItem.id, taskItem.title, taskItem.description)}
                    >
                      Update
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteTask(taskItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default Home;