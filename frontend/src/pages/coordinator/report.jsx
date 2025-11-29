import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// HARDCODED DATABASE & MOCK DATA
const SEMESTERS = [
    { id: 'K251', name: 'Học kỳ 1 (2025-2026)', isCurrent: true },
    { id: 'K242', name: 'Học kỳ 2 (2024-2025)' },
    { id: 'K241', name: 'Học kỳ 1 (2024-2025)' },
    { id: 'K232', name: 'Học kỳ 2 (2023-2024)' },
    { id: 'K231', name: 'Học kỳ 1 (2023-2024)' },
    { id: 'K222', name: 'Học kỳ 2 (2022-2023)' },
    { id: 'K221', name: 'Học kỳ 1 (2022-2023)' },
];

const CURRENT_SEMESTER_ID = SEMESTERS[0].id;

const MOCK_MENTEES_BASE = [
    { stt: 1, mssv: '231000', name: 'Nguyễn Trần A', participation: 95 },
    { stt: 2, mssv: '231001', name: 'Nguyễn Trần B', participation: 80 },
    { stt: 3, mssv: '231002', name: 'Nguyễn Trần C', participation: 75 },
    { stt: 4, mssv: '231003', name: 'Nguyễn Trần D', participation: 90 },
    { stt: 5, mssv: '231004', name: 'Nguyễn Trần E', participation: 80 },
];

const createMockClass = (id, semId, index) => {
    const classId = `${semId}C${String(index).padStart(2, '0')}`;
    const code = `CO${3000 + index}`;
    const name = `Môn học ${index}`;
    const mentorName = `Mentor ${semId}${index}`;

    let progress;
    if (semId === CURRENT_SEMESTER_ID) {
        progress = Math.min(100, Math.floor(60 + Math.random() * 30));
    } else {
        const isCompleted = Math.random() < 0.9; 
        progress = isCompleted ? 100 : Math.floor(90 + Math.random() * 10);
    }
    
   
    const randomRating = Math.min(5, 3 + Math.floor(Math.random() * 2));
    const mockRegistrationNew = Math.floor(Math.random() * (50 - 2 + 1)) + 2; 
    const mockSessionsRescheduled = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
    const mockSessionsCancelled = Math.floor(Math.random() * (30 - 5 + 1)) + 5;

    
    const classDetail = {
        mentor: { name: mentorName, id: 800 + index, rating: (Math.min(5, (2.0 + randomRating * 0.5 + Math.random() * 0.5))).toFixed(1) },
        progress: progress,
        sessions_completed: Math.floor(progress / 100 * 20) - 2, 
        sessions_rescheduled: Math.floor(Math.random() * 3), 
        sessions_cancelled: Math.floor(Math.random() * 2), 
        mentees: MOCK_MENTEES_BASE.map(m => ({ 
            ...m, 
            participation: Math.min(100, m.participation + (semId === CURRENT_SEMESTER_ID ? 0 : Math.floor(Math.random() * 10))) 
        })),
    };

    
    return {
        id: classId,
        semesterId: semId,
        code: code,
        name: name,
        mentor: mentorName,
        mentorId: 800 + index,
        progress: progress,
        menteeCount: classDetail.mentees.length,
        rating: randomRating,
        registration_new: mockRegistrationNew,
        sessions_rescheduled: mockSessionsRescheduled,
        sessions_cancelled: mockSessionsCancelled,
        detailData: classDetail,
    };
};

// GEN ALL CLASS DATA
const ALL_CLASSES_DATA = SEMESTERS.flatMap(sem => 
    [1, 2, 3, 4, 5, 6, 7].map(i => createMockClass(i, sem.id, i)) 
);

// HANDLE 
const REPORT_DATA = SEMESTERS.reduce((acc, sem) => {
    const classesInSem = ALL_CLASSES_DATA.filter(cls => cls.semesterId === sem.id);
    
    const total_classes = classesInSem.length;
    const total_mentees = classesInSem.reduce((sum, cls) => sum + cls.menteeCount, 0);
    const total_mentors = total_classes; 
    
    const ratings = { total: total_mentees, five_star: 0, four_star: 0, three_star: 0, below_three_star: 0 };
    classesInSem.forEach(cls => {
        if (cls.rating === 5) ratings.five_star++;
        else if (cls.rating === 4) ratings.four_star++;
        else if (cls.rating === 3) ratings.three_star++;
        else ratings.below_three_star++; 
    });
    
    // PREPẢE DATA FOR PIE CHART
    const pieChartData = [
        { name: '4-5 sao', value: ratings.five_star + ratings.four_star, color: '#4CAF50' },
        { name: '3-4 sao', value: ratings.three_star, color: '#FFC107' },
        { name: 'Dưới 3 sao', value: ratings.below_three_star, color: '#F44336' },
    ];
    const totalRatedClasses = pieChartData.reduce((sum, item) => sum + item.value, 0);

    const getPercentage = (value) => {
        if (totalRatedClasses === 0) return 0;
        return Math.round((value / totalRatedClasses) * 100);
    }
    
    // PREPARE DATA FOR LINE CHART
    const trendData = {
        'Lượt đăng ký mới': classesInSem.reduce((sum, cls) => cls.registration_new, 0),
        'Lượt thay đổi lịch buổi học': classesInSem.reduce((sum, cls) => cls.sessions_rescheduled, 0),
        'Lượt hủy bỏ buổi học': classesInSem.reduce((sum, cls) => cls.sessions_cancelled, 0),
    };

    acc[sem.id] = {
        total_classes, total_mentees, total_mentors,
        ratings: {
            ...ratings,
            pieChartData,
            totalRatedClasses,
            p4_5star: getPercentage(pieChartData[0].value),
            p3star: getPercentage(pieChartData[1].value),
            pBelow3star: getPercentage(pieChartData[2].value),
        },
        classes: classesInSem,
        trend: trendData,
    };
    return acc;
}, {});


// CALC DATA TO DRAW LINE CHART
const getHistoricalTrendData = (currentSemId) => {
    const currentIndex = SEMESTERS.findIndex(s => s.id === currentSemId);
    if (currentIndex === -1) return [];
    const relevantSemesters = SEMESTERS
        .slice(currentIndex, currentIndex + 4)
        .reverse(); // X-axis: K_n-3, K_n-2, K_n-1, K_n
    
    const trendChartData = relevantSemesters.map(sem => {
        const data = REPORT_DATA[sem.id].trend;
        return {
            name: sem.id,
            'Lượt đăng ký mới': data['Lượt đăng ký mới'],
            'Lượt thay đổi lịch buổi học': data['Lượt thay đổi lịch buổi học'],
            'Lượt hủy bỏ buổi học': data['Lượt hủy bỏ buổi học'],
        };
    });
    
    return trendChartData;
};


// MOCK API LOGIC
const mockFetchReport = (semId, classId = null) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (classId) {
                // Fetch Class Report Detail
                const classData = ALL_CLASSES_DATA.find(c => c.id === classId);
                if (classData && classData.detailData) {
                    resolve(classData.detailData);
                } else {
                    console.error("Dữ liệu chi tiết lớp không tìm thấy:", classId);
                    resolve(null); 
                }
            } else {
                // Fetch Semester Report
                const semesterData = REPORT_DATA[semId];
                resolve(semesterData);
            }
        }, 300);
    });
};


// UTILITY COMPONENTS
const RatingPieChart = ({ data, total }) => {
    const COLORS = data.map(d => d.color);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            const percent = ((item.value / total) * 100).toFixed(1);
            return (
                <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-sm">
                    <p className="font-bold" style={{ color: item.color }}>{item.name}: {item.value} lớp</p>
                    <p>Chiếm: {percent}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip total={total} />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

const TrendLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 0, left: 20, bottom: 5 }} 
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#333" />
                <YAxis stroke="#333" allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
                
                {/* Legend*/}
                <Legend 
                    iconType="circle" 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ 
                        paddingLeft: '20px', 
                        width: '120px',
                        fontSize: '12px'
                    }} 
                />

                <Line type="monotone" dataKey="Lượt đăng ký mới" stroke="#4CAF50" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Lượt thay đổi lịch buổi học" stroke="#FFC107" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Lượt hủy bỏ buổi học" stroke="#F44336" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};



const ProgressBar = ({ percentage, height = 'h-5', barColor = 'bg-[#8dd06c]' }) => (
    <div className="w-full bg-gray-50 rounded-full p-[1px] border border-gray-300" style={{ height: height }}>
        <div
            className={`${height} rounded-full ${barColor}`}
            style={{ 
                width: `${percentage}%`,
                margin: '1px', 
            }}
        ></div>
    </div>
);


const StatCard = ({ title, value, unit, icon }) => (
    <div className="bg-white border border-gray-300 rounded-[12px] shadow-sm flex items-center p-4" style={{ width: '376px', height: '80px' }}>
        <img src={icon} alt="Icon" className="mr-4" style={{ width: '50px', height: '50px' }} />
        <div className="flex-1 flex flex-col justify-center items-center text-center border-l border-gray-300">
            <p className="text-base text-gray-700 font-semibold">{title}</p>
            <p className="text-2xl font-semibold text-black">{value} {unit}</p>
        </div>
    </div>
);


// COMPONENT BCHD_KY
const SemesterReportView = ({ semesterId, reportData, onSelectClass }) => {
    if (!reportData || !reportData.ratings) {
      return <p className="p-10 text-center">Đang tải dữ liệu...</p>;
    }

    const [searchQuery, setSearchQuery] = useState('');
    const trendChartData = useMemo(() => getHistoricalTrendData(semesterId), [semesterId]);

    const filteredClasses = useMemo(() => {
        const query = searchQuery.toLowerCase();
        const classes = reportData.classes || []; 
        return classes.filter(cls =>
            cls.code.toLowerCase().includes(query) ||
            cls.name.toLowerCase().includes(query) ||
            cls.mentor.toLowerCase().includes(query)
        );
    }, [searchQuery, reportData.classes]);

    const ratingData = reportData.ratings;

    return (
        <div style={{ width: '1246px' }} className="mx-auto">
            <div className="flex justify-start items-center" style={{ height: '80px', marginBottom: '40px' }}>
                <StatCard 
                    title="Tổng số lớp đã mở" 
                    value={reportData.total_classes} 
                    unit="lớp"
                    icon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4k041oqy_expires_30_days.png"
                />
                <div style={{ width: '59px' }}></div>
                <StatCard 
                    title="Tổng số mentee tham gia" 
                    value={reportData.total_mentees} 
                    unit="mentee"
                    icon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4k041oqy_expires_30_days.png"
                />
                <div style={{ width: '59px' }}></div>
                <StatCard 
                    title="Tổng số mentor tham gia" 
                    value={reportData.total_mentors} 
                    unit="mentor"
                    icon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4k041oqy_expires_30_days.png"
                />
            </div>


            <div className="flex justify-between items-start bg-white border border-gray-200 rounded-lg shadow-md mb-[40px]" 
                style={{ width: '1246px', height: '280px' }}>
                <div style={{ width: '50%' }} className="p-6 flex items-center">
                    <div style={{ width: '250px', height: '250px' }}> {/* Khung cho Biểu đồ Tròn */}
                        <RatingPieChart data={ratingData.pieChartData} total={ratingData.totalRatedClasses} />
                    </div>
                    
                    <div className="ml-6 mb-6 text-left">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Biểu đồ đánh giá trung bình các lớp đã mở</h3>
                        <p className="text-sm text-gray-500 mb-4">Tổng số lượt đáng giá: **{ratingData.totalRatedClasses} lớp**</p>
                        
                        <ul className="text-base space-y-2">
                            <li className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#4CAF50' }}></span> 
                                Tỉ lệ đánh giá 4-5 sao: {ratingData.p4_5star}%
                            </li>
                            <li className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#FFC107' }}></span> 
                                Tỉ lệ đánh giá 3-4 sao: {ratingData.p3star}%
                            </li>
                            <li className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#F44336' }}></span> 
                                Tỉ lệ đánh giá dưới 3 sao: {ratingData.pBelow3star}%
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ width: '50%' }} className="p-2 border-l border-gray-200 h-full flex flex-col justify-start">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Biểu đồ xu hướng hoạt động {trendChartData.length > 0 ? `(${trendChartData.map(d => d.name).join(', ')})` : ''}</h3>
                    <TrendLineChart data={trendChartData} />
                    <p className="text-sm italic text-gray-500 text-center">
                        Thể hiện sự biến đổi của 3 đại lượng trong {trendChartData.length} kỳ gần nhất.
                    </p>
                </div>
            </div>


            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-xl" style={{ width: '1246px' }}>
                <div className="h-[36px] bg-[#f2f2f2] flex items-center rounded-t-lg px-4 mb-2">
                    <span className="text-xl mr-3">🔍</span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã môn học hoặc tên người hướng dẫn"
                        className="w-full bg-transparent outline-none text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <table className="min-w-full">
                    <thead className="bg-[#e0e0e0]">
                        <tr style={{ height: '36px' }}>
                            <th className="p-2 text-center text-sm font-bold w-[102px]">STT</th>
                            <th className="p-2 text-left text-sm font-bold w-[420px]">Lớp học</th>
                            <th className="p-2 text-left text-sm font-bold w-[228px]">Tên Mentor</th>
                            <th className="p-2 text-left text-sm font-bold w-[496px]">Mức độ hoàn thành (%)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredClasses.length > 0 ? filteredClasses.map((cls, index) => (
                            <tr 
                                key={cls.id} 
                                className="hover:bg-blue-50 cursor-pointer"
                                onClick={() => onSelectClass(cls.id)}
                                style={{ height: '36px' }}
                            >
                                <td className="p-2 text-center text-sm font-medium">{index + 1}</td>
                                <td className="p-2 text-sm font-medium">{cls.code} - {cls.name}</td>
                                <td className="p-2 text-sm">{cls.mentor}</td>
                                <td className="p-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1">
                                            <ProgressBar percentage={cls.progress} height='h-4' />
                                        </div>
                                        <div className="w-1/14 text-right text-xs font-semibold">{cls.progress}%</div>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="p-5 text-center text-gray-500 italic">Không tìm thấy lớp nào phù hợp.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



// COMPONENT BCHD_LOP
const ClassReportView = ({ reportData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const mentor = reportData?.mentor || { name: 'Không tìm thấy', id: 'N/A', rating: 'N/A' };
    const allMentees = reportData?.mentees || [];
    
    const filteredMentees = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return allMentees.filter(mentee =>
            mentee.mssv.includes(query) ||
            mentee.name.toLowerCase().includes(query)
        );
    }, [searchQuery, allMentees]);
    
    // GEN default avt
    const getInitials = (fullName) => {
        const names = fullName.toUpperCase().split(' ');
        if (names.length === 1) return names[0].substring(0, 2);
        return names[0].charAt(0) + names[names.length - 1].charAt(0);
    };

    return (
        <div style={{ width: '1246px' }} className="mx-auto">
            
            {/* 1. frame for Mentor Info & Tiến độ Khóa học) */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border" style={{ width: '1246px', height: '150px', marginBottom: '40px' }}>
                <div className="flex items-center">
                    <div className="rounded-full flex items-center justify-center text-3xl font-bold text-gray-600"
                        style={{ width: '100px', height: '100px', backgroundColor: '#f2f2f2', border: '1px solid #ccc' }}>
                        {getInitials(mentor.name)}
                    </div>
                    <div className="ml-8 text-left">
                        <p className="text-xl font-bold text-gray-800">Tên: {mentor.name}</p>
                        <p className="text-lg text-gray-600">ID: {mentor.id}</p>
                        <p className="text-lg text-yellow-600">
                            Rating: {mentor.rating} / 5 <span role="img" aria-label="star">⭐</span>
                        </p>
                    </div>
                </div>

                <div className="w-1/3 p-4 flex flex-col justify-center">
                    <p className="text-lg font-semibold text-gray-700 mb-2 text-right">Tiến độ hoàn thành khóa học</p>
                    <ProgressBar percentage={reportData?.progress || 0} height='h-5' />
                    <p className="text-sm italic text-gray-500 mt-1 text-right">{reportData?.progress || 0}% hoàn thành</p>
                </div>
            </div>

            {/* 2. frame for 3 boxx */}
            <div className="flex justify-start items-center" style={{ width: '1246px', height: '80px', marginBottom: '40px' }}>
                <StatCard 
                    title="Tổng số buổi học đã hoàn thành" 
                    value={reportData?.sessions_completed || 0} 
                    icon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4k041oqy_expires_30_days.png"
                    unit="buổi"
                />
                <div style={{ width: '59px' }}></div>
                <StatCard 
                    title="Tổng số buổi học đã đổi lịch" 
                    value={reportData?.sessions_rescheduled || 0} 
                    icon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4k041oqy_expires_30_days.png"
                    unit="buổi"
                />
                <div style={{ width: '59px' }}></div>
                <StatCard 
                    title="Tổng số buổi học đã bị hủy" 
                    value={reportData?.sessions_cancelled || 0} 
                    icon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4k041oqy_expires_30_days.png"
                    unit="buổi"
                />
            </div>

            {/* 3. mentee list */}
            <div className="bg-white rounded-lg shadow-xl" style={{ width: '1246px' }}>
                <div className="h-[36px] bg-[#f2f2f2] flex items-center rounded-t-lg px-4 mb-2">
                    <span className="text-xl mr-3">🔍</span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã số hoặc tên học viên"
                        className="w-full bg-transparent outline-none text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <table className="min-w-full">
                    <thead className="bg-[#e0e0e0]">
                        <tr style={{ height: '36px' }}>
                            <th className="p-2 text-center text-sm font-bold w-[102px]">STT</th>
                            <th className="p-2 text-left text-sm font-bold w-[137px]">MSSV</th>
                            <th className="p-2 text-left text-sm font-bold w-[411px]">Họ và tên học viên</th>
                            <th className="p-2 text-left text-sm font-bold w-[596px]">Mức độ tham gia (%)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredMentees.length > 0 ? filteredMentees.map((mentee, index) => (
                            <tr key={mentee.mssv} className="hover:bg-gray-50" style={{ height: '36px' }}>
                                <td className="p-2 text-center text-sm font-medium">{index + 1}</td>
                                <td className="p-2 text-sm font-medium">{mentee.mssv}</td>
                                <td className="p-2 text-sm">{mentee.name}</td>
                                <td className="p-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1">
                                            <ProgressBar percentage={mentee.participation} height='h-4' />
                                        </div>
                                        <div className="w-1/14 text-right text-xs font-semibold">{mentee.participation}%</div>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="p-5 text-center text-gray-500 italic">
                                    Không tìm thấy học viên nào phù hợp (Tổng số mentee: {allMentees.length}).
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// MAIN COMPONENT: ReportCoordinator 
const report = () => {
    // default: K251, Lớp = null (Tất cả)
    const [selectedSemesterId, setSelectedSemesterId] = useState(CURRENT_SEMESTER_ID);
    const [selectedClassId, setSelectedClassId] = useState(null); 
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const currentSemester = SEMESTERS.find(s => s.id === selectedSemesterId);
    
    const currentClassInfo = ALL_CLASSES_DATA.find(c => c.id === selectedClassId);

    const currentSemClasses = ALL_CLASSES_DATA.filter(cls => cls.semesterId === selectedSemesterId);

    const loadReportData = useCallback(async (semesterId, classId) => {
        setIsLoading(true);
        setReportData(null);
        try {
            const data = await mockFetchReport(semesterId, classId);
            setReportData(data);
        } catch (error) {
            console.error("Error loading report data:", error);
            setReportData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadReportData(selectedSemesterId, selectedClassId);
    }, [selectedSemesterId, selectedClassId, loadReportData]);
    
    // SELECT CLASS FUNCT
    const handleSelectClass = (classId) => {
        if (classId === 'all') {
            setSelectedClassId(null);
            return;
        }
        
        setSelectedClassId(classId);
    };
    
    // SELECT SMT FUNCT
    const handleSelectSemester = (semesterId) => {
        setSelectedSemesterId(semesterId);
        setSelectedClassId(null);
    };


    const handleActionClick = (action) => {
         alert(`Chức năng "${action}" đang trong quá trình phát triển.`);
    };

    const isClassMode = selectedClassId !== null;

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            
            {/* 1. filter and download, print button */}
            <div className="flex justify-between items-center bg-gray-50" style={{ width: '1246px', height: '58px', margin: '0 auto 20px auto' }}>
                
                <div className="flex items-center space-x-3 bg-[#f2f2f2] p-2 rounded-lg shadow-inner" style={{ width: '473px', height: '58px' }}>
                    <h3 className="text-base font-semibold text-gray-700 ml-2">Lọc báo cáo theo:</h3>
                    
                    {/* Dropdown smt */}
                    <select
                        className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm"
                        value={selectedSemesterId}
                        onChange={(e) => handleSelectSemester(e.target.value)}
                    >
                        {SEMESTERS.map(s => (
                            <option key={s.id} value={s.id}>
                                Học Kỳ: {s.id}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown class */}
                    <select
                        className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm"
                        value={selectedClassId || 'all'} 
                        onChange={(e) => handleSelectClass(e.target.value)}
                    >
                        <option value="all">-- Tất cả --</option>
                        {currentSemClasses.map(cls => (
                            <option key={cls.id} value={cls.id}>
                                Lớp: {cls.code}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* feature button */}
                <div className="space-x-3">
                    <button 
                        className="text-white font-semibold rounded-lg shadow-md transition duration-150"
                        style={{ width: '160px', height: '40px', backgroundColor: '#0388c4' }}
                        onClick={() => handleActionClick("Tải xuống PDF")}
                    >
                        Tải xuống PDF
                    </button>
                    <button 
                        className="text-white font-semibold rounded-lg shadow-md transition duration-150"
                        style={{ width: '160px', height: '40px', backgroundColor: '#044cc8' }}
                        onClick={() => handleActionClick("In báo cáo")}
                    >
                        In báo cáo
                    </button>
                </div>
            </div>
            
            {/* REPORT title */}
            <h2 className="text-2xl font-extrabold mb-4 text-blue-800 text-center" style={{ width: '1246px', margin: '0 auto 20px auto' }}>
                BÁO CÁO HOẠT ĐỘNG 
                {isClassMode 
                    ? ` LỚP ${currentClassInfo?.code} - MÔN ${currentClassInfo?.name}` 
                    : ` HỌC KỲ ${currentSemester.id}`
                }
            </h2>

            {isLoading ? (
                <div className="flex justify-center items-center h-[500px]">
                    <p className="text-xl font-semibold text-blue-600 animate-pulse">Đang tải dữ liệu báo cáo...</p>
                </div>
            ) : reportData ? (
                isClassMode ? (
                    <ClassReportView reportData={reportData} />
                ) : (
                    <SemesterReportView 
                        semesterId={selectedSemesterId}
                        reportData={reportData} 
                        onSelectClass={handleSelectClass} 
                    />
                )
            ) : (
                <div className="flex justify-center items-center h-[500px]">
                     <p className="text-xl text-red-500">
                        Không tìm thấy dữ liệu cho kỳ học hoặc lớp này.
                     </p>
                </div>
            )}

        </div>
    );
};

export default report;