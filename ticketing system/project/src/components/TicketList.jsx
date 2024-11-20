import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { useAuth } from '../contexts/AuthContext';

export default function TicketList() {
  const { user } = useAuth();
  
  const tickets = useLiveQuery(
    () => {
      if (user?.isAdmin) {
        return db.tickets
          .orderBy('createdAt')
          .reverse()
          .toArray();
      }
      return db.tickets
        .where('creatorId')
        .equals(user?.id)
        .reverse()
        .toArray();
    },
    [user]
  );

  if (!tickets) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {tickets.map(ticket => (
        <div key={ticket.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">{ticket.title}</h3>
          <p className="text-gray-600">{ticket.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className={`px-2 py-1 rounded text-sm ${
              ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              ticket.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
              ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {ticket.status}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}