import MenteeNavbar from '../components/navbar/MenteeNavbar';
import { Outlet } from 'react-router-dom';

export default function MenteeLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MenteeNavbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
