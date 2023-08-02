import { test } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddTask from '../app/components/AddTask';
import { todoStore} from '../app/todoLogic';
import { TaskItem } from '@/app/ts/type';

test('it should add a new task with title and description', async () => {
    render(<AddTask />);

    const titleInput = document.querySelector('input[placeholder="Add a task title"]');
    const descriptionInput = document.querySelector('input[placeholder="Add a task description"]');
    const addButton = document.querySelector('button');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addButton!.textContent).toBe('Add Task');

    fireEvent.change(titleInput!, { target: { value: 'title' } });
    fireEvent.change(descriptionInput!, { target: { value: 'description' } });
    fireEvent.click(addButton!);

    await waitFor(() => {
        const newTask = todoStore.tasks.find(task => task.title === 'title');
        expect(newTask).toBeDefined();
        expect(newTask!.description).toBe('description');
        expect(newTask!.title).toBe('title');
    });
});

test('it should update an existing task with new title and description', async () => {
    const initialTask: TaskItem = {
        id: '1',
        title: 'Initial Task Title',
        description: 'Initial Task Description',
        status: 'toDo',
        createdAt: new Date().toISOString(),
        soft_delete: null,
    };
    todoStore.addTask(initialTask);

    todoStore.updateTaskId = initialTask.id;
    todoStore.buttonType = 'Update';

    render(<AddTask />);

    const titleInput = document.querySelector('input[placeholder="Add a task title"]');
    const descriptionInput = document.querySelector('input[placeholder="Add a task description"]');
    const updateButton = document.querySelector('button');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
    expect(updateButton!.textContent).toBe('Update Task');

    fireEvent.change(titleInput!, { target: { value: 'title' } });
    fireEvent.change(descriptionInput!, { target: { value: 'description' } });
    fireEvent.click(updateButton!);

    await waitFor(() => {
        const updatedTask = todoStore.tasks.find(task => task.id === initialTask.id);
        expect(updatedTask).toBeDefined();
        expect(updatedTask!.title).toBe('title');
        expect(updatedTask!.description).toBe('description');
        expect(todoStore.buttonType).toBe('Add');
        expect(todoStore.updateTaskId).toBe('');
    });
});