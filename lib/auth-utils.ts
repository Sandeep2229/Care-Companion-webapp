export type UserRole = 'technician' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Mock authentication for demo purposes
// In a real app, this would use a proper auth system
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Tech User',
    email: 'tech@example.com',
    role: 'technician',
  },
  {
    id: '2',
    name: 'Doctor User',
    email: 'doctor@example.com',
    role: 'doctor',
  },
];

export function authenticateUser(email: string, password: string): User | null {
  // Simple mock authentication
  // In a real app, this would verify credentials securely
  // This is just for demo purposes
  const user = MOCK_USERS.find(u => u.email === email);
  
  // For the demo, any password works
  return user || null;
}

export function saveUserSession(user: User): void {
  // In a real app, this would use secure httpOnly cookies,
  // JWT, or other proper session management
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function getUserFromSession(): User | null {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
  return null;
}

export function clearUserSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}