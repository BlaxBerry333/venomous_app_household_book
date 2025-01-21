"use client";

import { Task } from "@prisma/client";
import React, { useState } from "react";

interface Props {
  onAdd: (title: Task["title"]) => void;
}

export default function AddTask({ onAdd }: Props) {
  const [title, setTitle] = useState<Task["title"]>("");

  /**
   * 新しいタスクを追加する
   *
   * @param e - フォーム送信イベント
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder="Add a new task"
        className="flex-grow"
      />
      <button type="submit">Add</button>
    </form>
  );
}
