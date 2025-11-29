import React from 'react';

const coordinatorHome = () => {
  return (
    <div
      style={{
        width: '99vw',
        height: '94vh',
        backgroundImage:
          'url("https://eduhub.vn/wp-content/uploads/2025/05/dai-hoc-bach-khoa-tphcm-1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0, 24, 101, 1) 0%, rgba(0, 24, 101, 0.86) 40%, rgba(0, 24, 101, 0.6) 70%, rgba(0, 24, 101, 0.45) 100%)',
        }}
      ></div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) translateY(-58px)',
          textAlign: 'center',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
        }}
      >
        Dự án TuturHub đến từ nhóm CNPM-L02-HK251
      </div>
    </div>
  );
};

export default coordinatorHome;