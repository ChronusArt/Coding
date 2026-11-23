import { useState, type FormEvent } from 'react';

export function AddTaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() === '') return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        aria-label="New task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs doing?"
      />
      <button type="submit">Add task</button>
    </form>
  );
}
