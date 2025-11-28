import React, { useState, useEffect } from 'react';
import './pdt.css';
import {StatCard} from '../../components/Filter.jsx';
import { statCardsData } from '../../data/pdtData.js';
import CustomBarChart from '../../components//barChart.jsx'; 
import CustomLineChart from '../../components//lineChart.jsx';
const OverallReport = () => {
  const [downloadMessage, setDownloadMessage] = useState(null); 
        const [isDownloading, setIsDownloading] = useState(false); // Trạng thái đang tải
    const [reportScope, setReportScope] = useState({
        scopeType: 'toanTruong', // Mặc định: 'toanTruong' (Toàn trường)
        startYear: 2020,
        endYear: 2024
    });
    const [dataKey, setDataKey] = useState(0);
    const handleScopeChange = (e) => {
    const { name, value } = e.target;
    
    setReportScope(prev => ({
        ...prev,
        [name]: value
    }));
    
    // ✅ GỌI DATA KEY NGAY TẠI HÀM CẬP NHẬT TRẠNG THÁI
    setDataKey(prev => prev + 1); 
};
    useEffect(() => {
        console.log("Truy vấn lại dữ liệu tổng hợp với phạm vi:", reportScope);
        // Trong thực tế: Gọi API với reportScope.scopeType, reportScope.startYear, v.v.
        // Cập nhật biểu đồ bằng cách thay đổi key

    }, [reportScope]);
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

    return (
        <div className="overview-container">
            {/* Thanh Header Điều hướng (Tái sử dụng từ các trang khác) */}

            <main className="overview-main">
                {downloadMessage && (
                    <div className={`download-notification ${isDownloading ? 'loading' : 'success'}`}>
                        {downloadMessage}
                    </div>
                )}
                <div className="report-filter-form">
                    <h3>Chọn Phạm vi Báo cáo Tổng thể</h3>
                    <div className="filter-group">
                        <label>Phạm vi:</label>
                        <select name="scopeType" value={reportScope.scopeType} onChange={handleScopeChange}>
                            <option value="toanTruong">Toàn trường</option>
                            <option value="nhieuNam">So sánh nhiều năm</option>
                        </select>
                    </div>
                    
                    {reportScope.scopeType === 'nhieuNam' && (
                        <>
                            <div className="filter-group">
                                <label>Từ Năm:</label>
                                <input type="number" name="startYear" value={reportScope.startYear} onChange={handleScopeChange} />
                            </div>
                            <div className="filter-group">
                                <label>Đến Năm:</label>
                                <input type="number" name="endYear" value={reportScope.endYear} onChange={handleScopeChange} />
                            </div>
                        </>
                    )}
                </div>
                <h2 className="report-heading">Báo cáo Xu hướng Tổng hợp ({reportScope.scopeType === 'toanTruong' ? 'Toàn trường' : 'So sánh năm'})</h2>
                {/* Khu vực các thẻ thống kê */}
                <div className="stat-cards-grid">
                    {statCardsData.map((card, index) => (
                        <StatCard key={index} icon={card.icon} title={card.title} value={card.value} />
                    ))}
                </div>

                {/* Khu vực biểu đồ */}
                <div className="charts-grid" key={dataKey}> {/* 👈 Áp dụng key ở đây */}
                    <div className="chart-card">
                    <CustomBarChart />
                    </div>
        
                    <div className="chart-card">
                    <CustomLineChart />
                    </div>
                </div>
                
                {/* Nút Download PDF ở góc dưới bên phải */}
                <div className="download-pdf-section">
                    <button 
                        className="btn-download" 
                        onClick={handleDownload}
                        disabled={isDownloading} // Vô hiệu hóa nút khi đang tải
                    >
                        {isDownloading ? 'Đang tải...' : '⬇️ Tải về file .pdf'}
                    </button>
                </div>

            </main>
        </div>
    );
};

export default OverallReport;
