import React, { useState, useEffect, useCallback, useMemo } from 'react';

// MOCK DATA
const COMPLAINTS = [
    {
        id: "CP0001",
        title: "Sự cố thiết bị: Máy chiếu",
        category: "Cơ sở vật chất",
        submitted_by: "Mentor Lê Đức Trung",
        submit_date: "20-10-2025",
        status: "Đã hoàn tất",
        details: "Máy chiếu tại phòng học H3-201 không hoạt động/không lên nguồn trong buổi học chính thức ngày 15/10/2025 (tiết 1-3). Đề nghị kiểm tra và sửa chữa gấp để đảm bảo chất lượng giảng dạy.",
        assigned_to: "QL001",
        response: {
            date: "21-102025",
            handler: "Quản lý Hoài Nam",
            content: "Đội kỹ thuật đã kiểm tra và thay thế bóng đèn máy chiếu. Máy chiếu phòng H3-201 đã hoạt động ổn định. Đã thông báo cho Mentor xác nhận.",
        },
    },
    {
        id: "CP0002",
        title: "Vấn đề dịch vụ: Thiếu thiết bị mô phỏng",
        category: "Thiết bị học tập",
        submitted_by: "Sinh viên lớp thực hành Vi xử lý L03)",
        submit_date: "15-10-2025",
        status: "Đang xử lý",
        details: "Phòng Lab H6-802 (dùng cho môn Kỹ thuật Điện tử) hiện đang thiếu thiết bị mạch chạy mô phỏng (breadboard) cho 5 nhóm sinh viên. Các nhóm còn lại không thể thực hành đúng tiến độ.",
        assigned_to: "QL002",
        response: {
            date: "16-10-2025",
            handler: "Quản lý Chí Trung",
            content: "Đã ghi nhận yêu cầu và đặt mua bổ sung 10 thiết bị mạch chạy mô phỏng. Dự kiến sẽ có hàng và lắp đặt trong phòng Lab vào cuối tuần này (25/10). Sẽ cập nhật tiến độ sau.",
        },
    },
    {
        id: "CP0003",
        title: "Yêu cầu hỗ trợ cài đặt phần mềm",
        category: "Hỗ trợ Kỹ thuật",
        submitted_by: "Mentor Trịnh Huỳnh Nam",
        submit_date: "01-12-2025",
        status: "Đang xử lý",
        details: "Cần được hỗ trợ cài đặt và cấu hình phần mềm nghiên cứu chuyên dụng X (do Khoa Máy tính phát triển) trên 20 máy tính của Lab H6-701 cho buổi hướng dẫn sắp tới. Yêu cầu hoàn thành trước ngày 05/09.",
        assigned_to: "QL001",
        response: {
            date: "2-12-2025",
            handler: "Quản lý Đỗ Minh Trung",
            content: "Đã gửi yêu cầu hỗ trợ đến Khoa KH&KT Máy tính. Dự kiến hoàn tất hỗ trợ trong 3 ngày tới.",
        },
    },
    {
        id: "CP0004",
        title: "Cải tạo CSVC: Cửa phòng Lab bị kẹt",
        category: "Cơ sở vật chất",
        submitted_by: "Mentor Lê Đình Nhân",
        submit_date: "30-11-2025",
        status: "Mới",
        details: "Cửa phòng Lab H6-601 bị mất tín hiệu điện khóa tự động, gây ra tình trạng kẹt cửa, không thể mở được từ bên ngoài. Đề nghị sửa chữa hệ thống điện của cửa.",
        assigned_to: "QL002",
    },
    {
        id: "CP0005",
        title: "Vấn đề khác: Tiếng ồn xây dựng",
        category: "Môi trường học tập",
        submitted_by: "Sinh viên lớp PH301",
        submit_date: "25-10-2025",
        status: "Bị từ chối",
        details: "Có tiếng ồn lớn và kéo dài từ công trình xây dựng gần phòng H6-109 vào các buổi chiều, gây mất tập trung nghiêm trọng cho giờ học. Đề nghị có biện pháp can thiệp.",
        assigned_to: "QL001",
        response: {
            date: "26-10-2025",
            handler: "Quản lý Đặng Vũ",
            content: "Đây là tiếng ồn từ công trình chung của trường và nằm ngoài khả năng can thiệp trực tiếp của Ban Quản lý Chương trình. Đã kiến nghị lên Ban Quản lý cơ sở vật chất chung. Trong thời gian này, chúng tôi sẽ xem xét chuyển lớp PH301 sang phòng khác yên tĩnh hơn (Phòng C105) cho đến khi tiếng ồn giảm bớt.",
        },
    },
    {
        id: "CP0006",
        title: "Sự cố thiết bị: Lỗi kết nối mạng",
        category: "Hệ thống mạng",
        submitted_by: "Mentor lớp AV3 - L01",
        submit_date: "3-12-2025",
        status: "Mới",
        details: "Gặp lỗi kết nối mạng chập chờn hoặc mất hẳn trong khoảng thời gian tiết 7-8 ngày 3/12 tại khu vực tầng 4 tòa H6. Ảnh hưởng đến lớp học trực tuyến.",
        assigned_to: "QL002",
    },
    {
        id: "CP0007",
        title: "Yêu cầu hỗ trợ: Ghép lớp cho học viên",
        category: "Quản lý Học vụ",
        submitted_by: "Mentee Nguyễn Đức Huy",
        submit_date: "03-11-2025",
        status: "Đã hoàn tất",
        details: "Yêu cầu được chấp nhận ghép lớp (chuyển từ lớp A sang lớp B) đối với học viên X vì lý do gia đình (Y). Đã nộp đủ hồ sơ chuyển đổi.",
        assigned_to: "QL001",
        response: {
            date: "05-11-2025",
            handler: "Quản lý Hoài Nam",
            content: "Hồ sơ chuyển lớp đã được xét duyệt và chấp thuận. Học viên X đã được cập nhật vào danh sách lớp B từ ngày 05/12/2025. Đã gửi thông báo xác nhận chính thức.",
        },
    },
    {
        id: "CP0008",
        title: "Yêu cầu hỗ trợ: Chuyển đổi hình thức buổi học",
        category: "Quản lý Giảng dạy",
        submitted_by: "Mentor Trần Hoài Đức",
        submit_date: "10-11-2025",
        status: "Đã hoàn tất",
        details: "Đề nghị chuyển đổi hình thức buổi học Môn học 1 (tiết 3-4 ngày 12/11) từ trực tiếp tại phòng H5-202 sang trực tuyến do Mentor có chuyến công tác đột xuất.",
        assigned_to: "QL002",
        response: {
            date: "10-11-2025",
            handler: "Quản lý Mai Hạ",
            content: "Yêu cầu chuyển đổi hình thức đã được chấp thuận. Đã gửi thông báo đến toàn bộ học viên về việc chuyển sang học trực tuyến (qua google meet) vào ngày 12/11. Đã cập nhật trên hệ thống lịch học.",
        },
    },
    {
        id: "CP0009",
        title: "Yêu cầu hỗ trợ: Gia hạn thời gian nộp đề thi",
        category: "Quản lý Học vụ",
        submitted_by: "Trưởng ban ra đề Môn Đại số tuyến tính",
        submit_date: "02-12-2025",
        status: "Mới",
        details: "Do có sự thay đổi hình thức thi, đề nghị gia hạn thêm 3 ngày cho thời gian nộp đề thi cuối kỳ. Hạn nộp hiện tại là 5/12.",
        assigned_to: "QL001",
        response: null,
    },
];

// MOCK API FUNCTION
const mockFetchComplaints = (status = 'all') => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = COMPLAINTS;
            if (status !== 'all') {
                filtered = COMPLAINTS.filter(c => c.status === status);
            }
            const result = filtered.map(c => ({
                id: c.id,
                title: c.title,
                submit_date: c.submit_date,
                status: c.status,
            }));
            resolve({ json: () => Promise.resolve(result) });
        }, 300);
    });
};

const mockFetchComplaintDetail = (complaintId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const detail = COMPLAINTS.find(c => c.id === complaintId);
            resolve({ json: () => Promise.resolve(detail) });
        }, 300);
    });
};

// HELPER COMPONENT: DISPLAY COMPLAINT DETAIL
const ComplaintDetailView = ({ complaint }) => {
    if (!complaint) return null;

    const statusColor = (status) => {
        switch (status) {
            case 'Mới': return 'bg-red-500';
            case 'Đang xử lý': return 'bg-yellow-500';
            case 'Đã hoàn tất': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-xl min-h-[500px]">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-800">{complaint.title}</h2>
                <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColor(complaint.status)}`}>
                    {complaint.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-lg mb-8">
                <div>
                    <p className="font-semibold text-gray-600">Mã khiếu nại:</p>
                    <p className="font-bold text-blue-700">{complaint.id}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Ngày gửi:</p>
                    <p>{complaint.submit_date}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Danh mục:</p>
                    <p>{complaint.category}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Người gửi:</p>
                    <p>{complaint.submitted_by}</p>
                </div>
            </div>

            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700 border-b-2 border-orange-400 pb-1">
                📝 Nội dung chi tiết
            </h3>
            <div className="p-4 bg-gray-50 border rounded-lg mb-8">
                <p className="text-gray-800 italic leading-relaxed">{complaint.details}</p>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-gray-700 border-b-2 border-blue-400 pb-1">
                💬 Phản hồi của Quản lý
            </h3>
            {complaint.response ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-600">
                        **Người xử lý:** <span className="font-bold">{complaint.response.handler}</span>
                        <span className="mx-2">|</span>
                        **Ngày:** {complaint.response.date}
                    </p>
                    <p className="mt-2 text-gray-800 leading-relaxed">{complaint.response.content}</p>
                </div>
            ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-700 italic">
                    Chưa có phản hồi chính thức. Khiếu nại đang chờ được phân công.
                </div>
            )}
        </div>
    );
};


// MAIN COMPONENT: ComplaintCoordinator
const ComplaintCoordinator = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaintId, setSelectedComplaintId] = useState(null);
    const [selectedComplaintDetail, setSelectedComplaintDetail] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Mới', 'Đang xử lý', 'Đã hoàn tất'
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    // Num of filter
    const counts = useMemo(() => {
        const allCounts = COMPLAINTS.reduce((acc, c) => {
            acc[c.status] = (acc[c.status] || 0) + 1;
            return acc;
        }, {});
        allCounts['all'] = COMPLAINTS.length;
        return allCounts;
    }, []);


    // Load complaints list
    const loadComplaints = useCallback((status) => {
        setIsLoadingList(true);
        setSelectedComplaintId(null);
        setSelectedComplaintDetail(null);

        mockFetchComplaints(status)
            .then(res => res.json())
            .then(data => {
                setComplaints(data);
            })
            .catch(error => console.error("Error fetching complaints:", error))
            .finally(() => setIsLoadingList(false));
    }, []);

    useEffect(() => {
        loadComplaints(filterStatus);
    }, [filterStatus, loadComplaints]);


    // Open complaint detail
    const openComplaintDetail = (id) => {
        setSelectedComplaintId(id);
        setSelectedComplaintDetail(null);
        setIsLoadingDetail(true);

        mockFetchComplaintDetail(id)
            .then(res => res.json())
            .then(data => {
                setSelectedComplaintDetail(data);
            })
            .catch(error => console.error("Error fetching complaint detail:", error))
            .finally(() => setIsLoadingDetail(false));
    };


    return (
        <div className="w-full min-h-screen relative bg-gray-50 flex">
            
            {/* SIDE BAR */}
            <div className="w-[350px] bg-[#efefef] min-h-screen pt-[30px] px-4 shadow-xl">
                <h2 className="text-2xl font-bold mb-5 text-gray-700 flex items-center gap-2">
                    <span role="img" aria-label="complaint"></span> Quản lý Khiếu nại
                </h2>
                
                {/* Filter according to status */}
                <div className="mb-6 space-y-2">
                    {['all', 'Mới', 'Đang xử lý', 'Đã hoàn tất'].map(status => (
                        <div
                            key={status}
                            className={`p-3 rounded-lg text-lg cursor-pointer flex justify-between items-center transition-colors 
                                ${filterStatus === status 
                                    ? 'bg-blue-600 text-white font-bold shadow-md' 
                                    : 'hover:bg-gray-300 bg-white'
                                }`}
                            onClick={() => setFilterStatus(status)}
                        >
                            <span>
                                {status === 'all' ? 'Tất cả Khiếu nại' : `Trạng thái: ${status}`}
                            </span>
                            <span className={`px-2 py-0.5 text-sm rounded ${filterStatus === status ? 'bg-blue-800' : 'bg-gray-400 text-white'}`}>
                                {counts[status] || 0}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Complaints list */}
                <h3 className="text-xl font-bold mb-3 mt-5 text-gray-700 border-t pt-3">
                    Danh sách ({complaints.length})
                </h3>
                
                <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                    {isLoadingList && (
                        <p className="text-base italic text-gray-600 animate-pulse mt-5">Đang tải danh sách...</p>
                    )}
                    
                    {!isLoadingList && complaints.map((cp) => (
                        <div
                            key={cp.id}
                            className={`p-3 rounded text-base cursor-pointer border transition-all duration-150
                                ${selectedComplaintId === cp.id 
                                    ? 'bg-blue-500 text-white shadow-lg border-blue-700' 
                                    : 'bg-white hover:bg-gray-100 border-gray-200'
                                }`}
                            onClick={() => openComplaintDetail(cp.id)}
                        >
                            <p className={`font-semibold ${selectedComplaintId === cp.id ? 'text-white' : 'text-gray-800'}`}>{cp.title}</p>
                            <p className="text-sm opacity-90">
                                Mã: {cp.id} | Ngày: {cp.submit_date}
                            </p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block 
                                ${cp.status === 'Mới' ? 'bg-red-200 text-red-800' : 
                                  cp.status === 'Đang xử lý' ? 'bg-yellow-200 text-yellow-800' : 
                                  'bg-green-200 text-green-800'}`}
                            >
                                {cp.status}
                            </span>
                        </div>
                    ))}
                    
                    {!isLoadingList && complaints.length === 0 && (
                        <p className="text-base italic text-gray-600 mt-5">Không có khiếu nại nào ở trạng thái này.</p>
                    )}
                </div>
            </div>

            {/* Display complaint detail */}
            <div className="flex-1 p-8 bg-white">
                {isLoadingDetail ? (
                    <div className="flex justify-center items-center h-full min-h-[500px]">
                        <p className="text-xl font-semibold text-blue-600 animate-pulse">
                            Đang tải chi tiết khiếu nại...
                        </p>
                    </div>
                ) : selectedComplaintDetail ? (
                    <ComplaintDetailView complaint={selectedComplaintDetail} />
                ) : (
                    <p className="text-2xl mt-5 text-gray-500 text-center pt-[150px]">
                        Hãy chọn một khiếu nại trong danh sách để xem chi tiết và phản hồi.
                    </p>
                )}
            </div>

        </div>
    );
};

export default ComplaintCoordinator;