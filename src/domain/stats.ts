import type { Task } from '../types';

export interface TaskStats {
  total: number;
  done: number;
  open: number;
  completion: number; // 0 - 100
}

/** Derive the numbers shown above the task list. */
export function computeStats(tasks: readonly Task[]): TaskStats {
  const done = tasks.filter((task) => task.done).length;
  const total = tasks.length;
  return {
    total,
    done,
    open: total - done,
    completion: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}
