"use client";
import { Task } from "@prisma/client";
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * タスク一覧を取得する
   *
   * @throws {Error} タスクの追加に失敗した場合
   */
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("タスクの取得に失敗しました:", error);
    }
  };

  /**
   * 新しいタスクを追加する
   *
   * @param title - 新しいタスクのタイトル
   * @throws {Error} タスクの追加に失敗した場合
   */
  const addTask = async (title: Task["title"]) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const newTask: Task = await res.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("タスクの追加に失敗しました:", error);
    }
  };

  /**
   * タスクの完了状態を切り替える
   *
   * @param id - 更新するタスクのID
   * @throws {Error} タスクの更新に失敗した場合
   */
  const toggleTask = async (id: Task["id"]) => {
    try {
      const task = tasks.find((task) => task.id === id);
      if (!task) return;

      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (res.ok) {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (error) {
      console.error("タスクの切り替えに失敗しました:", error);
    }
  };

  /**
   * タスクを削除する
   *
   * @param id - 削除するタスクのID
   * @throws {Error} タスクの削除に失敗した場合
   */
  const deleteTask = async (id: Task["id"]) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("タスクの削除に失敗しました:", error);
    }
  };

  return (
    <div>
      <AddTask onAdd={addTask} />
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
