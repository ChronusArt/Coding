import type { Task, TaskExporter } from '../types';

export function ExportPanel({
  exporters,
  tasks,
  onNotify,
}: {
  exporters: readonly TaskExporter[];
  tasks: readonly Task[];
  onNotify: (message: string) => void;
}) {
  const download = (exporter: TaskExporter) => {
    const content = exporter.export(tasks);
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks.${exporter.extension}`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Exported ${tasks.length} tasks as ${exporter.label}`);
  };

  return (
    <div className="button-row">
      {exporters.map((exporter) => (
        <button key={exporter.id} type="button" onClick={() => download(exporter)}>
          Export {exporter.label}
        </button>
      ))}
    </div>
  );
}
