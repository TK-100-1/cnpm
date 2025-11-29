import React, { useState } from 'react';
import { attendanceData, filterOptions1 } from '../../data/pdtData.js';
import {FilterDropdown} from '../../components/Filter.jsx';
import './pdt.css';

function StudentParticipation() {
    // State để quản lý dữ liệu bảng (có thể được lọc sau này)
    const [data] = useState(attendanceData);
        const [searchTerm, setSearchTerm] = useState('');
        const [filterCriteria, setFilterCriteria] = useState({
        boMon: 'Tất cả',
        maMon: 'Tất cả',
        lop: 'Tất cả',
        diemTB: { label: 'Tất cả', min: null, max: null },
        hocKy: 'Tất cả',
        danhGia: 'Tất cả'
    });
    const [downloadMessage, setDownloadMessage] = useState(null); 
    const [isDownloading, setIsDownloading] = useState(false); // Trạng thái đang tải
    const handleFilterChange = (key, value) => {
    setFilterCriteria(prevCriteria => ({
        ...prevCriteria,
        [key]: value
    }));
    };
    const filteredData = data.filter(item => {
        // 1. Lọc theo chuỗi (BoMon, MaMon, HocKy, DanhGia)
        if (filterCriteria.boMon !== 'Tất cả' && item.boMon !== filterCriteria.boMon) return false;
        if (filterCriteria.maMon !== 'Tất cả' && item.maMon !== filterCriteria.maMon) return false;
        if (filterCriteria.lop !== 'Tất cả' && item.lop !== filterCriteria.lop) return false;
        if (filterCriteria.hocKy !== 'Tất cả' && item.hocKy !== filterCriteria.hocKy) return false;
        // Gán đúng tên trường dữ liệu trong item (danhGia)
        if (filterCriteria.danhGia !== 'Tất cả' && item.danhGia !== filterCriteria.danhGia) return false; 
        
        // 2. Lọc theo Điểm TB (Sử dụng đối tượng)
        const diemTBItem = filterCriteria.diemTB; 
        const diemHienTai = item.diemTB; 

        // 🚨 CHỈ LỌC KHI diemTBItem LÀ ĐỐI TƯỢNG VÀ KHÔNG PHẢI 'Tất cả'
        if (diemTBItem && typeof diemTBItem === 'object' && diemTBItem.min !== null) {
            
            // Kiểm tra điểm có nằm trong khoảng [min, max]
            // Lưu ý: item.diemTB (9.0) phải là số (number)
            if (diemHienTai < diemTBItem.min || diemHienTai > diemTBItem.max) {
                return false;
            }
        }

        return true;
    });
    const handleDownload = () => {
        setIsDownloading(true);
        setDownloadMessage('Đang chuẩn bị tệp tin để tải xuống...');
        
        // Giả lập quá trình tải hoặc xử lý file (ví dụ: 2 giây)
        setTimeout(() => {
            setDownloadMessage('Tải xuống hoàn tất!');
            setIsDownloading(false);
            
            // Xóa thông báo sau 3 giây
            setTimeout(() => setDownloadMessage(null), 3000); 
        }, 2000); 
    };
    
    // (Trong thực tế, bạn sẽ thêm logic lọc dữ liệu dựa trên searchTerm và các dropdown)

    return (
        <div className="assessment-container">

            <main className="assessment-main">
                {downloadMessage && (
                    <div className={`download-notification ${isDownloading ? 'loading' : 'success'}`}>
                        {downloadMessage}
                    </div>
                )}
                {/* Thanh Chức năng (Tìm kiếm và Tải xuống) */}
                <div className="utility-bar">
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder="🔍 Tìm kiếm"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                   <button 
                        className="btn-download" 
                        onClick={handleDownload}
                        disabled={isDownloading} // Vô hiệu hóa nút khi đang tải
                    >
                        {isDownloading ? 'Đang tải...' : '⬇️ Tải về file .pdf'}
                    </button>
                </div>
                
                {/* Thanh Lọc Dữ liệu */}
                <div className="filter-bar">
                    <span className="filter-label">Filter Your Search</span>
                    <FilterDropdown title="Bộ môn" options={filterOptions1.boMon} filterKey="boMon" onChange={handleFilterChange} />
                                <FilterDropdown title="Mã môn" options={filterOptions1.maMon} filterKey="maMon" onChange={handleFilterChange} />
                                <FilterDropdown title="Lớp" options={filterOptions1.lop} filterKey="lop" onChange={handleFilterChange} />
                                <FilterDropdown title="Điểm TB" options={filterOptions1.diemTB} filterKey="diemTB" onChange={handleFilterChange} />
                                <FilterDropdown title="Học kỳ" options={filterOptions1.hocKy} filterKey="hocKy" onChange={handleFilterChange} />
                                <FilterDropdown title="Đánh Giá" options={filterOptions1.danhGia} filterKey="danhGia" onChange={handleFilterChange} />
                </div>

                {/* Bảng Dữ liệu */}
                <div className="data-table-container">
                    <table className="assessment-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã môn</th>
                                <th>Lớp</th>
                                <th>Mentor</th>
                                <th>Học kỳ</th>
                                <th>Trạng thái</th>
                                <th>Điểm TB</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.stt}>
                                    <td>{item.stt}</td>
                                    <td>{item.maMon}</td>
                                    <td>{item.lop}</td>
                                    <td>{item.mentor}</td>
                                    <td>{item.hocKy}</td>
                                    <td>{item.danhGia}</td>
                                    <td>{item.diemTB.toFixed(1)}</td>
                                    <td>{item.ghiChu}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
}

export default StudentParticipation;
