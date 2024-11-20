import Dexie from 'dexie';

export const db = new Dexie('ticketingSystem');

db.version(1).stores({
  users: '++id, username, password, isAdmin',
  tickets: '++id, title, description, status, creatorId, createdAt'
});

// Add indexes
db.users.hook('creating', function (primKey, obj, trans) {
  obj.createdAt = new Date().toISOString();
});

db.tickets.hook('creating', function (primKey, obj, trans) {
  obj.createdAt = new Date().toISOString();
  obj.status = obj.status || 'pending';
});