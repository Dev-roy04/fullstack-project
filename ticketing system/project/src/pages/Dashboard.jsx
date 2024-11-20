import { useAuth } from '../contexts/AuthContext';
import TicketList from '../components/TicketList';
import CreateTicket from '../components/CreateTicket';
import AdminPanel from '../components/AdminPanel';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Ticketing System</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Create New Ticket</h2>
                  <CreateTicket />
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Your Tickets</h2>
                  <TicketList />
                </div>
              </div>
            </div>
            {user.isAdmin && (
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <AdminPanel />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}