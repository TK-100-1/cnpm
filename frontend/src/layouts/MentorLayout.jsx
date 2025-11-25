import MentorNavbar from '../components/navbar/MentorNavbar';
import { Outlet } from 'react-router-dom';

export default function MentorLayout() {
  return (
    <div>
      <MentorNavbar />
      <Outlet />
    </div>
  );
}
