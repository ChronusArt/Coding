import type { Task, TaskRepository } from '../types';

const STORAGE_KEY = 'task-board-v1';

function seedTasks(): Task[] {
  return [
    { id: 'seed-1', title: 'Plan the week', done: true, createdAt: new Date().toISOString() },
    { id: 'seed-2', title: 'Reply to messages', done: false, createdAt: new Date().toISOString() },
    { id: 'seed-3', title: 'Review the notes', done: false, createdAt: new Date().toISOString() },
  ];
}

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = seedTasks();

  async getAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async add(task: Task): Promise<void> {
    this.tasks = [...this.tasks, task];
  }

  async update(task: Task): Promise<void> {
    this.tasks = this.tasks.map((item) => (item.id === task.id ? task : item));
  }
}

export class LocalStorageTaskRepository implements TaskRepository {
  private read(): Task[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        const initial = seedTasks();
        this.write(initial);
        return initial;
      }
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Task[]) : [];
    } catch {
      return [];
    }
  }

  private write(tasks: readonly Task[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  async getAll(): Promise<Task[]> {
    return this.read();
  }

  async add(task: Task): Promise<void> {
    this.write([...this.read(), task]);
  }

  async update(task: Task): Promise<void> {
    this.write(this.read().map((item) => (item.id === task.id ? task : item)));
  }
}

/** Pick a storage implementation once, at the edge of the app. */
export function createTaskRepository(): TaskRepository {
  if (typeof window === 'undefined' || !('localStorage' in window)) {
    return new InMemoryTaskRepository();
  }
  return new LocalStorageTaskRepository();
}
