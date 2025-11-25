import { Outlet } from 'react-router-dom';
import PDTNavbar from '../components/navbar/PDTNavbar';

export default function PDTLayout() {
  return (
    <div>
      <PDTNavbar />
      <Outlet />
    </div>
  );
}
