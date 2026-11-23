import type { Task } from '../types';

export function TaskTitle({ title }: { title: string }) {
  return <span className="task-title">{title}</span>;
}

export function TaskStatus({ done, onToggle }: { done: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`status-pill ${done ? 'done' : 'open'}`}
      onClick={onToggle}
      aria-label={done ? 'Mark as not done' : 'Mark as done'}
    >
      {done ? 'Done' : 'Open'}
    </button>
  );
}

export function TaskMeta({ createdAt }: { createdAt: string }) {
  return <time className="task-meta">{new Date(createdAt).toLocaleDateString()}</time>;
}

export function TaskItem({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  return (
    <li className={`task-row ${task.done ? 'is-done' : ''}`}>
      <TaskStatus done={task.done} onToggle={() => onToggle(task.id)} />
      <TaskTitle title={task.title} />
      <TaskMeta createdAt={task.createdAt} />
    </li>
  );
}
