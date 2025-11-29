// src/mockData.js

// Dữ liệu giả định cho Giảng viên
export const instructor = {
    name: "Nguyễn Văn A",
    id: "24100XX",
    major: "Khoa học và Kỹ thuật máy tính - Ngành Khoa học máy tính",
    email: "nguyenvana@hcmut.edu.vn",
    position: "Tiến sĩ",
    expertise: "Khoa học máy tính, AI",
    bio: "Là một giảng viên giàu kinh nghiệm, đã có thâm niên trong nghề giảng dạy, tâm huyết luôn muốn chia sẻ nhiều hơn nữa với những người cùng đam mê, những khóa đào tạo do thầy dựng lớp vừa giúp truyền lửa cho học viên, vừa mang đến những kiến thức và kỹ năng sâu rộng mà bất kì nhà quản lý nào cũng mong muốn có được.",
    courses: [
        { code: "CO03029_242", name: "Khai phá dữ liệu", instructor: "Tên Giảng Viên" },
        { code: "CO03032_242", name: "Khai phá dữ liệu", instructor: "Tên Giảng Viên" },
        { code: "CO03031_242", name: "Khai phá dữ liệu", instructor: "Tên Giảng Viên" },
        { code: "CO03033_242", name: "Khai phá dữ liệu", instructor: "Tên Giảng Viên" },
    ],
    research: [
        "Nguyễn V. A., Trần B., A Scalable Framework for Medical Text Classification, Journal of AI Research, 2023.",
        "Nguyễn V. A., Lê C., Distributed Data Processing for Large-scale Recommendation, IEEE Big Data, 2022.",
        "Nguyễn V. A., Lê C., Distributed Data Processing for Large-scale Recommendation, IEEE Big Data, 2022.",
        "Nguyễn V. A., Lê C., Distributed Data Processing for Large-scale Recommendation, IEEE Big Data, 2022.",
    ]
};

// Dữ liệu giả định cho Course Registration
export const assessmentData = [
    { stt: '01', maMon: 'CO3001', lop: 'L01', mentor: 'Lê Văn A', hocKy: 'HK1/2025-2026', danhGia: 'Tốt', diemTB: 8.5, ghiChu: 'Ghi chú' },
    { stt: '02', maMon: 'CO3001', lop: 'L02', mentor: 'Lê Văn B', hocKy: 'HK1/2025-2026', danhGia: 'Tốt', diemTB: 9.0, ghiChu: 'Ghi chú' },
    { stt: '03', maMon: 'CO3002', lop: 'L01', mentor: 'Trần C', hocKy: 'HK1/2025-2026', danhGia: 'Khá', diemTB: 7.8, ghiChu: 'Ghi chú' },
    { stt: '04', maMon: 'CO3002', lop: 'L01', mentor: 'Nguyễn V', hocKy: 'HK2/2025-2026', danhGia: 'Yếu', diemTB: 3.5, ghiChu: 'Ghi chú' },
    // Thêm các dòng dữ liệu khác nếu cần
];

export const filterOptions = {
    boMon: ['Tất cả', 'Cấu truc dữ liệu và giải thuật', 'Công nghệ phần mềm', 'Mạng máy tính', 'Hệ điều hành', 'Trí tuệ nhân tạo'],
    maMon: ['Tất cả', 'CO3001', 'CO3002', 'CO3015', 'CO3020', 'CO3030'],
    lop: ['Tất cả', 'L01', 'L02', 'L03', 'L04','CC01','CC02','CC03'],
    diemTB: [
        { label: 'Tất cả', min: null, max: null },
        { label: '≥ 9.0', min: 9.0, max: 10.0 }, // (10.0 là max điểm tối đa)
        { label: '8.0 - 8.9', min: 8.0, max: 8.9 },
        { label: '7.0 - 7.9', min: 7.0, max: 7.9 },
        { label: '6.0 - 6.9', min: 6.0, max: 6.9 },
        { label: '< 6.0', min: 0.0, max: 5.9 }
    ],
    hocKy: ['Tất cả', 'HK1/2025-2026', 'HK2/2025-2026', 'HK1/2024-2025', 'HK2/2024-2025', 'HK1/2023-2024'],
    danhGia: ['Tất cả', 'Tốt', 'Khá', 'Yếu']
};

//// Dữ liệu giả định cho KQTG
export const attendanceData = [
    { stt: '01', maMon: 'CO3001', lop: 'L01', mentor: 'Lê Văn A', hocKy: 'HK1/2025-2026', danhGia: 'Hoàn thành tốt', diemTB: 8.5, ghiChu: 'Ghi chú' },
    { stt: '02', maMon: 'CO3001', lop: 'L02', mentor: 'Lê Văn B', hocKy: 'HK1/2025-2026', danhGia: 'Không tham gia', diemTB: 13, ghiChu: 'Ghi chú' },
    { stt: '03', maMon: 'CO3002', lop: 'L01', mentor: 'Trần C', hocKy: 'HK1/2025-2026', danhGia: 'Đang hoàn thành', diemTB: 7.8, ghiChu: 'Ghi chú' },
    { stt: '04', maMon: 'CO3015', lop: 'CC01', mentor: 'Nguyễn Lê D', hocKy: 'HK2/2023-2024', danhGia: 'Hoàn thành tốt', diemTB: 9.2, ghiChu: 'Ghi chú' },
    // Thêm các dòng dữ liệu khác nếu cần
];
export const filterOptions1 = {
    boMon: ['Tất cả', 'Cấu truc dữ liệu và giải thuật', 'Công nghệ phần mềm', 'Mạng máy tính', 'Hệ điều hành', 'Trí tuệ nhân tạo'],
    maMon: ['Tất cả', 'CO3001', 'CO3002', 'CO3015', 'CO3020', 'CO3030'],
    lop: ['Tất cả', 'L01', 'L02', 'L03', 'L04','CC01','CC02','CC03'],
    diemTB: [
        { label: 'Tất cả', min: null, max: null },
        { label: '≥ 9.0', min: 9.0, max: 10.0 }, // (10.0 là max điểm tối đa)
        { label: '8.0 - 8.9', min: 8.0, max: 8.9 },
        { label: '7.0 - 7.9', min: 7.0, max: 7.9 },
        { label: '6.0 - 6.9', min: 6.0, max: 6.9 },
        { label: '< 6.0', min: 0.0, max: 5.9 }
    ],
    hocKy: ['Tất cả', 'HK1/2025-2026', 'HK2/2025-2026', 'HK1/2024-2025', 'HK2/2024-2025', 'HK2/2023-2024'],
    danhGia: ['Tất cả', 'Hoàn thành tốt', 'Đang hoàn thành', 'Không tham gia']
};
// src/overviewData.js

export const statCardsData = [
    { icon: '📄', title: 'Tổng số khoa', value: 10 }, // Thay '📄' bằng icon thực tế
    { icon: '🏫', title: 'Tổng số lớp', value: 20 },
    { icon: '👨‍🎓', title: 'Tổng số SV', value: 80 },
    { icon: '📈', title: 'Tỷ lệ hoàn thành TB', value: `${(93 / 100) * 100}%`},
];

