import { Outlet } from 'react-router-dom';
import CoordinatorNavbar from '../components/navbar/CoordinatorNavbar';

export default function CoordinatorLayout() {
  return (
    <div>
      <CoordinatorNavbar />
      <Outlet />
    </div>
  );
}
