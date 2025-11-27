import React, { useEffect, useState, useCallback } from "react";

// MOCK DATA
const CLASSES = [
    {
        id: "C001", code: "CO1005", name: "Nhập môn Điện toán", dept: "Khoa KH&KT Máy tính", progress: 75,
        total_sessions_planned: 12, total_sessions_conducted: 9, 
        mentor_id: "2001", 
        schedule: "Thứ Hai, 8:00 - 10:00, Phòng H3-201",
        students: [
            { student_id: "2312101", name: "Nguyễn Văn A", attended_sessions: 9 },
            { student_id: "2312102", name: "Trần Thị B", attended_sessions: 8 },
            { student_id: "2312103", name: "Lê Văn C", attended_sessions: 9 },
        ]
    },
    {
        id: "C002", code: "MT1007", name: "Đại số tuyến tính", dept: "Khoa Khoa học Ứng dụng", progress: 50,
        total_sessions_planned: 10, total_sessions_conducted: 5, 
        mentor_id: "2002", 
        schedule: "Thứ Tư, 07:00 - 9:00, Phòng H2-305",
        students: [
            { student_id: "2412004", name: "Phạm Văn D", attended_sessions: 5 },
            { student_id: "2412005", name: "Võ Thị E", attended_sessions: 4 },
        ]
    },
    {
        id: "C003", code: "AS2039", name: "Cơ sở vật lý hạt nhân và ứng dụng", dept: "KHOA KHOA HỌC ỨNG DỤNG", progress: 33,
        total_sessions_planned: 15, total_sessions_conducted: 5, 
        mentor_id: "2003", 
        schedule: "Thứ Sáu, 14:00 - 16:00, Phòng H6-101",
        students: [
            { student_id: "2212106", name: "Hoàng Văn F", attended_sessions: 4 },
            { student_id: "2212111", name: "Đặng Minh D", attended_sessions: 5 },
        ]
    }
];

const MENTORS = [
    { id: "2001", name: "Lê Đức Trung", email: "trungdm@hcmut.edu.vn", role: "mentor", location: "TP.HCM", hobby: "Công nghệ phần mềm, Kiến trúc hệ thống", avatar: null },
    { id: "2002", name: "Vũ Thanh Toàn", email: "maivt@hcmut.edu.vn", role: "mentor", location: "Hà Nội", hobby: "Machine learning, Neural network", avatar: null },
    { id: "2003", name: "Trịnh Đình Nam", email: "namtv@hcmut.edu.vn", role: "mentor", location: "Đà Nẵng", hobby: "Cơ học lượng tử", avatar: null },
];

// MOCK API FUNCTION
const mockFetch = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (url.endsWith("/courses")) {
                resolve({ 
                    json: () => Promise.resolve(CLASSES.map(c => ({ id: c.id, code: c.code, name: c.name })))
                });
            } else if (url.endsWith("/users")) {
                resolve({ 
                    json: () => Promise.resolve(MENTORS) 
                });
            } else if (url.startsWith("/courses/")) {
                const id = url.split('/').pop();
                const course = CLASSES.find(c => c.id === id);
                if (course) {
                    resolve({ json: () => Promise.resolve(course) }); 
                } else {
                    resolve({ json: () => Promise.resolve(null) });
                }
            } else if (url.startsWith("/users/")) {
                const id = url.split('/').pop();
                const user = MENTORS.find(u => u.id === id);
                if (user) {
                    resolve({ json: () => Promise.resolve(user) }); 
                } else {
                    resolve({ json: () => Promise.resolve(null) });
                }
            } else if (url.startsWith("/my_teaching_courses/")) {
                const mentor_id = url.split('/').pop();
                const courses = CLASSES
                    .filter(c => c.mentor_id === mentor_id)
                    .map(c => ({ id: c.id, code: c.code, name: c.name }));
                resolve({ json: () => Promise.resolve(courses) });
            } else {
                resolve({ json: () => Promise.resolve([]) });
            }
        }, 200);
    });
};


// HELPER COMPONENT DISPLAYING SCHEDULE TABLE
const ScheduleTable = ({ scheduleString }) => {
    const parts = scheduleString ? scheduleString.split(',').map(p => p.trim()) : [];
    
    if (parts.length < 3) {
        return <p className="text-lg italic text-red-600">Lịch học không xác định: {scheduleString}</p>;
    }

    const day = parts[0];
    const time = parts[1];
    const location = parts[2];
    
    return (
        <table className="w-[400px] border border-gray-300">
            <thead>
                <tr className="bg-blue-100">
                    <th className="p-2 border border-gray-300 text-left">Tiêu chí</th>
                    <th className="p-2 border border-gray-300 text-left">Chi tiết</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2 border border-gray-300 font-semibold">Ngày học</td>
                    <td className="p-2 border border-gray-300">{day}</td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-300 font-semibold">Thời gian</td>
                    <td className="p-2 border border-gray-300">{time}</td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-300 font-semibold">Địa điểm</td>
                    <td className="p-2 border border-gray-300">{location}</td>
                </tr>
            </tbody>
        </table>
    );
};


// MAIN COMPONENT: manageCoordinator)
const ManageCoordinator = () => {
    const [classes, setClasses] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false); 

    // Load Data init
    const loadInitialData = useCallback(() => {
        mockFetch("/courses")
            .then((res) => res.json())
            .then((data) => setClasses(data))
            .catch(error => console.error("Error fetching courses:", error));
            
        mockFetch("/users")
            .then((res) => res.json())
            .then((data) => {
                const mentorList = Array.isArray(data) ? data.filter(user => user.role === 'mentor') : [];
                setMentors(mentorList);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    // LOAD CLASS/MENTOR DETAIL (ĐÃ SỬA ĐỔI)
    const openClass = (cls) => {
        setSelectedMentor(null);
        setSelectedClass(null); 
        setIsLoadingDetail(true);

        mockFetch(`/courses/${cls.id}`)
            .then((res) => res.json())
            .then((courseData) => {
                if (!courseData || !courseData.mentor_id) {
                    console.error("Course data or mentor_id missing:", courseData);
                    alert("Không tìm thấy dữ liệu lớp hoặc Mentor.");
                    setIsLoadingDetail(false);
                    return;
                }

                return mockFetch(`/users/${courseData.mentor_id}`)
                    .then((resMentor) => resMentor.json())
                    .then((mentorData) => {
                        setSelectedClass({
                            course: courseData,
                            mentor: mentorData,
                            students: courseData.students 
                        });
                    })
            })
            .catch(error => console.error("Error fetching class details:", error))
            .finally(() => {
                setIsLoadingDetail(false); 
            });
    };

    const openMentor = (m) => {
        setSelectedClass(null);
        setSelectedMentor(null);
        setIsLoadingDetail(true);

        mockFetch(`/users/${m.id}`)
            .then((res) => res.json())
            .then((mentorDetails) => {
                return mockFetch(`/my_teaching_courses/${m.id}`)
                    .then((resCourses) => resCourses.json())
                    .then((teachingCourses) => {
                        setSelectedMentor({
                            mentor: mentorDetails,
                            teaching_classes: teachingCourses 
                        });
                    })
            })
            .catch(error => console.error("Error fetching mentor details:", error))
            .finally(() => {
                setIsLoadingDetail(false);
            });
    };



    const renderContent = () => {
        if (isLoadingDetail) {
            return (
                <div className="flex justify-center items-center h-full min-h-[500px]">
                    <p className="text-xl font-semibold text-blue-800 animate-pulse">
                        Đang tải chi tiết...
                    </p>
                </div>
            );
        }

        // Display class detail
        if (selectedClass) {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-5 text-blue-800">
                    {selectedClass.course.code} — {selectedClass.course.name}
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-5 p-4 border rounded bg-gray-50">
                        <p className="text-lg">
                            <b>Khoa phụ trách:</b> {selectedClass.course.dept}
                        </p>
                        <p className="text-lg">
                            <b>Tiến độ:</b> <span className="font-bold text-green-600">{selectedClass.course.progress}%</span>
                        </p>
                        <p className="text-lg">
                            <b>Mentor:</b> <span className="font-semibold">{selectedClass.mentor.name}</span> ({selectedClass.mentor.email})
                        </p>
                        <p className="text-lg">
                            <b>Buổi đã dạy:</b> {selectedClass.course.total_sessions_conducted} / {selectedClass.course.total_sessions_planned}
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold mt-6 mb-3 pb-1">
                        Lịch học
                    </h3>

                    <ScheduleTable scheduleString={selectedClass.course.schedule} />
                    
                    <h3 className="text-xl font-semibold mt-8 mb-3 pb-1">
                        Danh sách sinh viên ({selectedClass.students.length})
                    </h3>

                    <table className="w-full bg-white shadow rounded overflow-hidden border border-black"> 
                    <thead>
                        <tr className="bg-[#FFEFE5] text-black border border-black text-left"> 
                        <th className="p-2 w-16 border-r border-b border-black">STT</th> 
                        <th className="p-2 w-1/3 border-r border-b border-black">Họ và tên</th>
                        <th className="p-2 w-1/4 border-r border-b border-black">MSSV</th>
                        <th className="p-2 border-b">Tỉ lệ tham gia</th>
                        </tr>
                    </thead>

                        <tbody>
                            {selectedClass.students.map((st, index) => {
                                const attendanceRate = selectedClass.course.total_sessions_conducted > 0
                                    ? ((st.attended_sessions / selectedClass.course.total_sessions_conducted) * 100).toFixed(0)
                                    : 0;

                                return (
                                    <tr key={st.student_id} className="border-b border-gray-300 hover:bg-gray-100">
                                    <td className="p-2 border-r border-t border-gray-300">{index + 1}</td>
                                    <td className="p-2 border-r border-t border-gray-300">{st.name}</td>
                                    <td className="p-2 border-r border-t border-gray-300">{st.student_id}</td>
                                    <td className="p-2 font-medium">
                                    {st.attended_sessions} / {selectedClass.course.total_sessions_conducted} ({attendanceRate}%)
                                    </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }

        // Display mentor detail
        if (selectedMentor) {
            return (
                <div className="max-w-3xl mx-auto mt-10">
                    <div className="flex flex-col items-center text-center mt-[50px]">
                    <img
                        className="w-[200px] h-[200px] rounded-full mb-6"
                        alt="avatar"
                        src={
                        selectedMentor.mentor.avatar ||
                        "https://aic.com.vn/wp-content/uploads/2024/10/avatar-mac-dinh-1.jpg"
                        }
                    />
                    <h2 className="text-2xl font-bold text-blue-800">
                        {selectedMentor.mentor.name}
                    </h2>

                    <div className="mt-4 bg-white p-4 rounded-md shadow-md w-fit mx-auto text-left">
                        <p className="text-base">📧 Email: {selectedMentor.mentor.email}</p>
                        <p className="text-base">📍 Đến từ: {selectedMentor.mentor.location}</p>
                        <p className="text-base">💖 Sở thích: {selectedMentor.mentor.hobby}</p>
                    </div>
                    </div>

                    <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 pb-2">
                        Danh sách lớp phụ trách ({selectedMentor.teaching_classes.length})
                    </h3>

                    {selectedMentor.teaching_classes.length > 0 ? (
                        <table className="min-w-full bg-white shadow-md rounded overflow-hidden border border-black">
                            <thead>
                                <tr className="bg-[#FFEFE5] text-black border border-black text-left">
                                    <th className="p-3 w-16 border-r border-b border-black">STT</th>
                                    <th className="p-3 border-r border-b border-black">Mã lớp</th>
                                    <th className="p-3 border-b">Tên môn học</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMentor.teaching_classes.map((course, index) => (
                                    <tr key={course.id} className="border-b border-gray-300 hover:bg-gray-100">
                                        <td className="p-3 border-r border-t border-gray-300">{index + 1}</td>
                                        <td className="p-3 font-medium border-r border-t border-gray-300">{course.code}</td>
                                        <td className="p-3 border-t">{course.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table >
                    ) : (
                        <p className="text-lg italic text-gray-500">Mentor này hiện chưa phụ trách lớp nào.</p>
                    )}
                </div>
            );
        }

        // No select mentor or class
        return (
            <p className="text-2xl mt-5 text-gray-500 text-center pt-[100px]">
                Hãy chọn một lớp hoặc cố vấn viên ở thanh bên để xem chi tiết.
            </p>
        );
    };

    return (
        <div className="w-full min-h-screen relative bg-white flex">
            
            {/* SIDEBAR */}
            <div className="w-[280px] bg-[#efefef] min-h-screen pt-[40px] px-3">
                {/* Class list */}
                <div className="text-xl font-bold mb-3 flex items-center gap-3">
                    <img
                        className="w-[27px] h-[27px]"
                        alt="icon"
                        src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/7027pequ_expires_30_days.png"
                    />
                    Danh sách lớp ({classes.length})
                </div>
                {Array.isArray(classes) && classes.map((cls) => (
                    <div
                        key={cls.id}
                        className={`ml-[20px] p-2 rounded text-lg mb-1 cursor-pointer 
                            ${selectedClass && selectedClass.course.id === cls.id 
                                ? 'bg-blue-600 text-white font-bold' 
                                : 'hover:bg-gray-300'
                            }`}
                        onClick={() => openClass(cls)}
                    >
                        {cls.code} - {cls.name}
                    </div>
                ))}
                {classes.length === 0 && <p className="ml-[50px] italic">Đang tải...</p>}

                {/* Mentor list */}
                <div className="mt-[30px] text-xl font-bold mb-3 flex items-center gap-3">
                    <img
                        className="w-[27px] h-[27px]"
                        alt="icon"
                        src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/yj1t2dey_expires_30_days.png"
                    />
                    Cố vấn viên ({mentors.length})
                </div>
                {Array.isArray(mentors) && mentors.map((mn) => (
                    <div
                        key={mn.id}
                        className={`ml-[20px] p-2 rounded text-lg mb-1 cursor-pointer 
                            ${selectedMentor && selectedMentor.mentor.id === mn.id 
                                ? 'bg-blue-600 text-white font-bold' 
                                : 'hover:bg-gray-300'
                            }`}
                        onClick={() => openMentor(mn)}
                    >
                        {mn.name}
                    </div>
                ))}
                {mentors.length === 0 && <p className="ml-[50px] italic">Đang tải...</p>}
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-10 bg-[#ffffff]">
                {renderContent()}
            </div>

        </div>
    );
};

export default ManageCoordinator;