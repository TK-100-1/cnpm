import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hard-coded users
const USERS = [
  { username: 'mentee', password: '123', role: 'mentee' },
  { username: 'mentor', password: '123', role: 'mentor' },
  { username: 'coordinator', password: '123', role: 'coordinator' },
  { username: 'pdt', password: '123', role: 'pdt' },
];

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();

    const user = USERS.find(
      u => u.username === form.username && u.password === form.password
    );

    if (!user) {
      setError('Sai username hoặc password!');
      return;
    }

    // Lưu user vào localStorage
    localStorage.setItem(
      'user',
      JSON.stringify({ username: user.username, role: user.role })
    );

    // Redirect theo vai trò
    if (user.role === 'mentee') navigate('/mentee');
    if (user.role === 'mentor') navigate('/mentor');
    if (user.role === 'pdt') navigate('/pdt');
    if (user.role === 'coordinator') navigate('/coordinator');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-[350px]"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="mb-4">
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border px-3 py-2 rounded mt-1"
            value={form.username}
            onChange={handleChange}
            placeholder="mentee / mentor / coordinator"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded mt-1"
            value={form.password}
            onChange={handleChange}
            placeholder="123"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
        >
          Login
        </button>

        <div className="mt-5">
          <p className="font-medium text-sm text-gray-500">
            🔐 Tài khoản test:
          </p>
          <ul className="text-sm text-gray-600 mt-1">
            <li>mentee / 123</li>
            <li>mentor / 123</li>
            <li>coordinator / 123</li>
            <li>pdt / 123</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Login;
