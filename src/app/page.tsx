"use client"
import AddTask from './components/AddTask';
import { todoStore } from './todoLogic';
import { observer } from 'mobx-react-lite';
import { statusType } from './ts/type';
import { useEffect, useState } from 'react';
import TaskColumns from './components/TaskColumns';


const Home = observer(() => {
  const tasks = todoStore.tasks;
  const [search, setSearch] = useState("");
  const typeOfGroups: statusType[] = ["toDo", "inProgress", "done"]

  useEffect(() => {
    fetch("http://localhost:8000/taskList")
      .then(res => res.json())
      .then(data => todoStore.tasks = data)
      .catch(err => console.log(err))
  }, [])

  const filteredTasks = todoStore.tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5 px-5">
      <h1 className="text-3xl font-semibold mb-4">Todo App</h1>
      <AddTask />
      {
        tasks.length > 0 &&
        <input
          type="text"
          className="px-4 py-2 mb-3 border border-gray-300 rounded-l w-full"
          placeholder='Search task by title'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }

      <div className='flex border-2 justify-between  border-sky-500 p-5 rounded space-x-3'>
        {
          typeOfGroups.map((statusItem) => (
            <div
              className='min-h-[200px] border mb-10 p-2 flex-1'
              key={statusItem}
              onPointerEnter={() => todoStore.handlePointerEnter(statusItem)}
            >
              <h3 className='border pl-3 text-center'>{statusItem.toUpperCase()}</h3>
              <TaskColumns tasks={filteredTasks} statusItem={statusItem} />
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default Home;