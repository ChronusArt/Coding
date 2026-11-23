export function ActivityLog({ events }: { events: readonly string[] }) {
  return (
    <section className="card">
      <div className="card-heading">
        <h2>Activity</h2>
      </div>
      {events.length === 0 ? (
        <p className="muted">Changes to your tasks will show up here.</p>
      ) : (
        <ul className="event-list">
          {events.map((event, index) => (
            <li key={`${index}-${event}`}>{event}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
