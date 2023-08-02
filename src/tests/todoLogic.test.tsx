import { TodoLogic } from "../app/todoLogic"
import { TaskItem } from "../app/ts/type";
import uuid from 'react-uuid';
import { test, expect } from 'vitest';

test("it should add new task to the taskList", () => {
    const todoTestStore = new TodoLogic();
    const task: TaskItem = {
        id: '1',
        title: 'title',
        description: 'description',
        status: 'toDo',
        createdAt: uuid(),
        soft_delete: null,
        story_point: 1
    }

    todoTestStore.addTask(task)

    expect(todoTestStore.tasks.length).toBe(1)
    expect(todoTestStore.tasks[0]).toEqual(task)
})

test("it should delete task item from the taskList", () => {
    const todoTestStore = new TodoLogic();
    const task: TaskItem = {
        id: '1',
        title: 'title',
        description: 'description',
        status: 'toDo',
        createdAt: uuid(),
        soft_delete: null,
        story_point: 1
    }

    todoTestStore.addTask(task)
    todoTestStore.deleteTask(task.id, task)

    expect(task.soft_delete).not.toEqual(null)
})


test("it should update task", () => {
    const todoTestStore = new TodoLogic();
    const task: TaskItem = {
        id: '1',
        title: 'title',
        description: 'description',
        status: 'toDo',
        createdAt: uuid(),
        soft_delete: null,
        story_point: 1
    }

    todoTestStore.addTask(task)
    todoTestStore.handleUpdateTask(task.id, "Updated task title", "Updated task description")

    expect(todoTestStore.tasks.length).toBe(1)
    expect(todoTestStore.task.title).toBe("Updated task title")
    expect(todoTestStore.updateTaskId).toBe(task.id);

})

test('it should handle dragging a task and update its status', () => {
    const todoTestStore = new TodoLogic();

    const task: TaskItem = {
        id: '1',
        title: 'Test Task Title',
        description: 'Test Task Description',
        status: 'toDo',
        createdAt: uuid(),
        soft_delete: null,
        story_point: 1
    };
    todoTestStore.tasks.push(task);

    todoTestStore.handlePointerDown(task.id);
    expect(todoTestStore.downTaskId).toBe(task.id);
    todoTestStore.handlePointerEnter('inProgress');
    expect(todoTestStore.tasks[0].status).toBe('inProgress');
    todoTestStore.handlePointerUp();
    expect(todoTestStore.downTaskId).toBe(null);
});