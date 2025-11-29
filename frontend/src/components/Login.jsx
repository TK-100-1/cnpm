import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hard-coded users
const USERS = [
  { username: 'mentee', password: '123', role: 'mentee' },
  { username: 'mentor', password: '123', role: 'mentor' },
  { username: 'coordinator', password: '123', role: 'coordinator' },
  { username: 'pdt', password: '123', role: 'pdt' },
];


// COMPONENT: Landing Page
const LandingPage = ({ onSelectLoginType }) => {
  return (
    <div
      className="bg-[#f0f2f4] overflow-hidden w-full min-w-[1440px] min-h-screen flex flex-col gap-[0px]"
    >
      <div className="w-full h-[58px] relative">
        <div className="absolute top-0 left-0 w-full h-[58px] bg-[#0388b4]" />

        <img
          className="top-[9px] left-[41px] w-[39px] h-10 absolute object-cover"
          alt="logo"
          src="https://c.animaapp.com/micx2cm5DwdPLN/img/logo-bach-khoa-1.png"
        />
      
        <div
          className="absolute left-[105px] top-0 w-[101px] h-[58px] bg-[#044cc8] flex items-center justify-center cursor-pointer rounded"
        >
          <span className="text-[#ffffff] text-center">Trang chủ</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center mt-[0px]">
        <div className="w-[483px] h-[470px] bg-[#ffffff] rounded-[10px] shadow flex flex-col items-center justify-start relative ">

          <img
            className="w-[137px] h-[140px] mt-[37px] object-cover"
            alt="logo center"
            src="https://c.animaapp.com/micx2cm5DwdPLN/img/logo-bach-khoa-1.png"
          />

          <p className="mt-[30px] w-[389px] font-normal text-[#244cc9] text-[22px] font-semibold text-center">
            Đăng nhập bằng tài khoản HCMUT
          </p>

          <button
            onClick={() => onSelectLoginType('hcmut')} // Next to LoginForm
            className="mt-[40px] w-[387px] h-[41px] flex items-center justify-center bg-[#ffffff] rounded-[5px] shadow border cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="font-normal text-black text-sm">Tài khoản HCMUT</span>
          </button>


          <button
            className="mt-[20px] w-[387px] h-[41px] flex items-center justify-center bg-[#ffffff] shadow rounded-[5px] border cursor-pointer"
          >
            <span className="font-normal text-black text-sm">Quản trị viên</span>
          </button>
          
        </div>
      </div>
    </div>
  );
};



// COMPONENT: Login Form
const LoginForm = ({ form, error, handleChange, handleLogin, handleClear, onBack }) => {
  return (
    <div
      className="bg-[#f0f2f4] overflow-hidden w-full min-w-[1440px] min-h-[769px] relative"
    >
      <header className="absolute top-0 left-0 w-full h-[82px] bg-[#210f7a]">
        <img
          className="absolute top-[17px] left-[37px] w-[46px] h-[47px]"
          alt="logo"
          src="https://c.animaapp.com/micw25kc5W4C7A/img/logo-bach-khoa-2.png"
        />

        <p className="absolute top-[25px] left-[111px] h-[27px] flex items-center font-sans text-[28px] font-semibold text-[#ffffff]">
          DỊCH VỤ XÁC THỰC TẬP TRUNG
        </p>
      </header>

      <form
        onSubmit={handleLogin}
        className="absolute top-[104px] left-[107px] w-[1234px] h-[355px] relative"
        id="login-container"
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#ffffff] shadow rounded-[10px] z-0"
          id="white-background"
        />

        <div
          className="absolute top-[16px] left-[15px] w-[473px] h-[323px] bg-[#eeeeee] border rounded-[10px] z-1"
          id="gray-panel"
        />

        <p
          className="absolute top-[34px] left-[43px] w-[389px] font-sans text-[22px] font-extrabold text-[#ae3c62] z-10"
          id="login-title"
        >
          Nhập thông tin tài khoản của bạn
        </p>
        
        {error && (
            <p className="absolute top-[60px] left-[43px] w-[389px] font-medium text-red-500 text-center z-10">
                {error}
            </p>
        )}


        <div
          className="absolute top-[34px] left-[523px] w-[73px] font-sans text-[22px] font-extrabold text-[#ae3c62] z-10"
          id="note-label"
        >
          Lưu ý
        </div>

        <p
          className="absolute top-[75px] left-[523px] w-[677px] font-normal text-black text-[15px] leading-5 z-50"
          id="note-content"
        >
          Sử dụng tài khoản Demo được cung cấp để đăng nhập vào hệ thống.
        </p>
        
        <div className="absolute top-[140px] left-[523px] z-50">
            <p className="font-semibold text-sm text-gray-700">🔐 Tài khoản test:</p>
            <ul className="text-sm text-gray-600 list-disc ml-5 mt-1">
                <li>**mentee** / 123</li>
                <li>**mentor** / 123</li>
                <li>**coordinator** / 123</li>
                <li>**pdt** / 123</li>
            </ul>
        </div>


        {/* Label: Username */}
        <label
          className="absolute top-[95px] left-[45px] text-xs font-semibold text-[#77787e] z-10"
          id="username-label"
        >
          Tên tài khoản
        </label>

        {/* Input: Username */}
        <input
          name="username"
          type="text"
          className="absolute top-[115px] left-[46px] w-[387px] h-[29px] bg-[#ffffdd] border rounded px-2 text-xs z-10"
          id="username-input"
          value={form.username}
          onChange={handleChange}
          placeholder="Ví dụ: mentee"
        />

        {/* Label: Password */}
        <label
          className="absolute top-[175px] left-[45px] text-xs font-semibold text-[#77787e] z-10"
          id="password-label"
        >
          Mật khẩu
        </label>

        {/* Input: Password */}
        <input
          name="password"
          type="password"
          className="absolute top-[195px] left-[46px] w-[387px] h-[29px] bg-[#ffffdd] border rounded px-2 text-xs z-10"
          id="password-input"
          value={form.password}
          onChange={handleChange}
          placeholder="Ví dụ: 123"
        />

        {/* feature button */}
        <button
          type="submit"
          className="absolute top-[276px] left-[46px] w-[103px] h-[35px] rounded bg-[#006dcc] text-[#ffffff] border-none z-10 hover:bg-blue-700 transition"
          id="login-button"
        >
          Đăng nhập
        </button>

        <button
          type="button" 
          onClick={handleClear}
          className="absolute top-[276px] left-[160px] w-[66px] h-[35px] rounded bg-[#006dcc] text-[#ffffff] border-none z-10 hover:bg-blue-700 transition"
          id="clear-button"
        >
          Xóa
        </button>
        
        <button
          type="button" 
          onClick={onBack}
          className="absolute top-[276px] left-[236px] w-[90px] h-[35px] rounded border border-[#006dcc] text-[#006dcc] bg-white z-10 hover:bg-gray-100 transition"
          id="back-button"
        >
          Quay lại
        </button>
      </form>
    </div>
  );
};


// MAIN COMPONENT: Login
const Login = () => {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState('landing');
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };
  
  const handleClear = () => {
    setForm({ username: '', password: '' });
    setError('');
  };

  const handleLogin = e => {
    e.preventDefault();

    const user = USERS.find(
      u => u.username === form.username && u.password === form.password
    );

    if (!user) {
      setError('Sai tên tài khoản hoặc mật khẩu!');
      return;
    }

    localStorage.setItem(
      'user',
      JSON.stringify({ username: user.username, role: user.role })
    );

    // Redirect according to role
    if (user.role === 'mentee') navigate('/mentee');
    if (user.role === 'mentor') navigate('/mentor');
    if (user.role === 'pdt') navigate('/pdt');
    if (user.role === 'coordinator') navigate('/coordinator');
  };

  if (currentView === 'landing') {
    return <LandingPage onSelectLoginType={() => setCurrentView('login')} />;
  }

  if (currentView === 'login') {
    return (
      <LoginForm 
        form={form}
        error={error}
        handleChange={handleChange}
        handleLogin={handleLogin}
        handleClear={handleClear}
        onBack={() => setCurrentView('landing')}
      />
    );
  }
  
  return null;
};

export default Login;