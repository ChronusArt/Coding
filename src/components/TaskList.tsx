import type { Task } from '../types';
import { TaskItem } from './TaskItem';

export function TaskList({
  tasks,
  loading,
  onToggle,
}: {
  tasks: readonly Task[];
  loading: boolean;
  onToggle: (id: string) => void;
}) {
  if (loading) return <p className="muted">Loading tasks…</p>;
  if (tasks.length === 0) return <p className="muted">No tasks yet. Add one above.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}
