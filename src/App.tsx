import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityLog } from './components/ActivityLog';
import { AddTaskForm } from './components/AddTaskForm';
import { ExportPanel } from './components/ExportPanel';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { createTaskRepository } from './data/repositories';
import { useTasks } from './hooks/useTasks';
import { CsvExporter, JsonExporter, MarkdownExporter } from './services/exporters';
import {
  ConsoleNotifier,
  InAppLogNotifier,
  NotificationService,
  ToastNotifier,
} from './services/notifiers';
import type { TaskExporter } from './types';

export default function App() {
  const repository = useMemo(createTaskRepository, []);
  const { tasks, loading, addTask, toggleTask } = useTasks(repository);

  const [toasts, setToasts] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);

  const pushToast = useCallback((message: string) => setToasts((all) => [...all, message]), []);
  const pushEvent = useCallback(
    (message: string) => setEvents((all) => [message, ...all].slice(0, 8)),
    [],
  );

  const notificationService = useMemo(() => {
    const service = new NotificationService();
    service.register(new ConsoleNotifier());
    service.register(new ToastNotifier(pushToast));
    service.register(new InAppLogNotifier(pushEvent));
    return service;
  }, [pushToast, pushEvent]);

  const notify = useCallback(
    (message: string) => notificationService.notify(message),
    [notificationService],
  );

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = window.setTimeout(() => setToasts((all) => all.slice(1)), 3000);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const exporters = useMemo<TaskExporter[]>(
    () => [new JsonExporter(), new CsvExporter(), new MarkdownExporter()],
    [],
  );

  const handleAdd = async (title: string) => {
    const task = await addTask(title);
    notify(`Added: ${task.title}`);
  };

  const handleToggle = async (id: string) => {
    const task = await toggleTask(id);
    notify(task.done ? `Completed: ${task.title}` : `Reopened: ${task.title}`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Task Board</h1>
          <p className="subtitle">A small place to keep track of what needs doing.</p>
        </div>
        <span className="saved-badge">Saved locally</span>
      </header>

      <main className="layout">
        <section className="card">
          <div className="card-heading">
            <h2>My taskszz</h2>
          </div>
          <AddTaskForm onAdd={handleAdd} />
          <TaskStats tasks={tasks} />
          <TaskList tasks={tasks} loading={loading} onToggle={handleToggle} />
          <div className="card-footer">
            <p className="muted small">Download a copy of your list.</p>
            <ExportPanel exporters={exporters} tasks={tasks} onNotify={notify} />
          </div>
        </section>

        <ActivityLog events={events} />
      </main>

      <div className="toast-stack" aria-live="polite">
        {toasts.map((message, index) => (
          <div className="toast" key={`${index}-${message}`}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
