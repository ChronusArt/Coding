/** Shared domain model and contracts used across the app. */

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string; // ISO date string
}

/** Storage contract. Implementations decide where tasks actually live. */
export interface TaskRepository {
  getAll(): Promise<Task[]>;
  add(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
}

/** A single notification channel. */
export interface Notifier {
  readonly id: string;
  readonly label: string;
  notify(message: string): void;
}

/** A file format for downloading tasks. */
export interface TaskExporter {
  readonly id: string;
  readonly label: string;
  readonly extension: string;
  export(tasks: readonly Task[]): string;
}
