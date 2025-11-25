import MenteeNavbar from '../components/navbar/MenteeNavbar';
import { Outlet } from 'react-router-dom';

export default function MenteeLayout() {
  return (
    <div>
      <MenteeNavbar />
      <Outlet />
    </div>
  );
}
