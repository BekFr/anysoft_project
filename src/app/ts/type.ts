// , , , , estimate/story-point, , .

export interface TaskItem {
    id: string;
    title: string;
    description: string,
    status: statusType;
    createdAt: string;
    soft_delete: string | null;
}

export type statusType = "inProgress" | "toDo" | "done";
export type btnType = "Add" | "Update";