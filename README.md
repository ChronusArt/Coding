# Task Board

A small React + TypeScript task app. Tasks are saved in the browser, and changes
appear as toasts and in an activity log. You can download the list as JSON, CSV
or Markdown.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run typecheck   # TypeScript only
npm run build       # typecheck + production bundle
```

## Under the hood

The UI is deliberately ordinary; the structure is what is interesting.

- **State/component split.** `src/hooks/useTasks.ts` owns task state and
  operations. `TaskList`, `TaskStats`, `AddTaskForm`, `ExportPanel` and
  `ActivityLog` each render one thing. `src/domain/stats.ts` is a pure function
  with no React or DOM dependency. *(Single Responsibility)*
- **Pluggable storage.** The hook takes a `TaskRepository` interface rather than
  calling `localStorage` itself. `createTaskRepository()` in
  `src/data/repositories.ts` chooses between `LocalStorageTaskRepository` and
  `InMemoryTaskRepository`; both satisfy the same contract and can be swapped
  without touching the hook or any component. *(Dependency Inversion,
  Liskov Substitution)*
- **Pluggable channels.** `NotificationService` in
  `src/services/notifiers.ts` fans messages out to a list of `Notifier`
  objects. Adding a new channel means adding a class and registering it — the
  service and the UI do not change. *(Open/Closed)*
- **Pluggable formats.** `src/services/exporters.ts` contains three exporters
  with the same `TaskExporter` contract; `ExportPanel` treats them all
  identically. *(Liskov Substitution)*
- **Narrow props.** `src/components/TaskItem.tsx` splits a row into `TaskTitle`,
  `TaskStatus` and `TaskMeta`, each taking only the props it uses instead of a
  single component with many optional props. *(Interface Segregation)*

All five contracts live in `src/types.ts`.

## Exercise

Add a `SoundNotifier` implementing `Notifier` in `src/services/notifiers.ts`,
register it in `src/App.tsx`, and watch it work without any change to
`NotificationService` or the UI components.
