import { Navigate } from 'react-router-dom';

/**
 * Props:
 *   allow: ["mentor"]    — chỉ cho role = mentor
 *   allow: ["mentee"]    — chỉ cho mentee
 *   allow: ["coordinator"] — chỉ cho coordinator
 *   allow: ["mentor", "mentee"] — cho nhiều role
 */

export default function RoleRoute({ allow = [], children }) {
  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Chưa login → không cho vào
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // user.role không nằm trong danh sách allow → cấm
  if (!allow.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Hợp lệ → render children
  return children;
}
