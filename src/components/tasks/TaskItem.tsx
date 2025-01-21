import { Task } from "@prisma/client";
import React from "react";

interface Props {
  task: Task;
  onToggle: (id: Task["id"]) => void;
  onDelete: (id: Task["id"]) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? "line-through" : ""}>
          {task.title}
        </span>
      </div>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
