import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

export default function AdminPanel() {
  const tickets = useLiveQuery(() => db.tickets.toArray());

  const updateStatus = async (ticketId, newStatus) => {
    try {
      await db.tickets.update(ticketId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  if (!tickets) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      {tickets.map(ticket => (
        <div key={ticket.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">{ticket.title}</h3>
          <p className="text-gray-600">{ticket.description}</p>
          <div className="mt-2">
            <select
              value={ticket.status}
              onChange={(e) => updateStatus(ticket.id, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}