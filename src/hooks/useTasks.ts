import { useCallback, useEffect, useState } from 'react';
import type { Task, TaskRepository } from '../types';

/** Task state and operations. Storage is provided by the caller. */
export function useTasks(repository: TaskRepository) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    repository.getAll().then((loaded) => {
      if (active) {
        setTasks(loaded);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [repository]);

  const addTask = useCallback(
    async (title: string): Promise<Task> => {
      const task: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        done: false,
        createdAt: new Date().toISOString(),
      };
      await repository.add(task);
      setTasks((current) => [...current, task]);
      return task;
    },
    [repository],
  );

  const toggleTask = useCallback(
    async (id: string): Promise<Task> => {
      const existing = tasks.find((task) => task.id === id);
      if (!existing) throw new Error(`Task ${id} not found`);

      const updated: Task = { ...existing, done: !existing.done };
      await repository.update(updated);
      setTasks((current) => current.map((task) => (task.id === id ? updated : task)));
      return updated;
    },
    [repository, tasks],
  );

  return { tasks, loading, addTask, toggleTask };
}
