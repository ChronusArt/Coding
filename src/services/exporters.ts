import type { Task, TaskExporter } from '../types';

export class JsonExporter implements TaskExporter {
  readonly id = 'json';
  readonly label = 'JSON';
  readonly extension = 'json';

  export(tasks: readonly Task[]): string {
    return JSON.stringify(tasks, null, 2);
  }
}

export class CsvExporter implements TaskExporter {
  readonly id = 'csv';
  readonly label = 'CSV';
  readonly extension = 'csv';

  export(tasks: readonly Task[]): string {
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const rows = tasks.map((task) =>
      [task.id, task.title, task.done ? 'done' : 'open', task.createdAt].map(escape).join(','),
    );
    return ['id,title,status,createdAt', ...rows].join('\n');
  }
}

export class MarkdownExporter implements TaskExporter {
  readonly id = 'md';
  readonly label = 'Markdown';
  readonly extension = 'md';

  export(tasks: readonly Task[]): string {
    const lines = tasks.map((task) => `- [${task.done ? 'x' : ' '}] ${task.title}`);
    return ['# Tasks', '', ...lines].join('\n');
  }
}
