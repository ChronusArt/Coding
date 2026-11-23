import { computeStats } from '../domain/stats';
import type { Task } from '../types';

export function TaskStats({ tasks }: { tasks: readonly Task[] }) {
  const { total, done, open, completion } = computeStats(tasks);

  return (
    <div className="stats">
      <div className="stat">
        <strong>{total}</strong>
        <span>total</span>
      </div>
      <div className="stat">
        <strong>{open}</strong>
        <span>open</span>
      </div>
      <div className="stat">
        <strong>{done}</strong>
        <span>done</span>
      </div>
      <div className="stat progress-stat">
        <strong>{completion}%</strong>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completion}%` }} />
        </div>
      </div>
    </div>
  );
}
