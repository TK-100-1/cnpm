import React, { useState } from 'react';
export const FilterDropdown = ({ title, options, filterKey, onChange }) => {
    // State để quản lý trạng thái mở/đóng của dropdown
    const [isOpen, setIsOpen] = useState(false); 
    // State để giữ giá trị đang được chọn (tùy chọn)
    const [selectedValue, setSelectedValue] = useState('');
    const displayValue = 
    (typeof selectedValue === 'object' && selectedValue !== null && selectedValue.label)
    ? selectedValue.label 
    : selectedValue || title;
    const handleSelectClick = (value) => {
        setSelectedValue(value);
        setIsOpen(false); // Đóng dropdown sau khi chọn
        let valueToSend = value;

        // Nếu người dùng chọn lại tiêu đề (mục mặc định 'Tất cả'), gửi chuỗi 'Tất cả'
        if (value === title) {
            valueToSend = 'Tất cả';
        }
        
        if (onChange) {
            onChange(filterKey, valueToSend);
        }
    };
    
    return (
        <div className="custom-dropdown-wrapper">
            {/* Thanh hiển thị và nút bấm */}
            <div 
                className={`dropdown-display ${isOpen ? 'is-open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {displayValue}
                <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
            </div>
            
            {/* Danh sách Tùy chọn (Áp dụng CSS cuộn tại đây) */}
            {isOpen && (
                <ul className="dropdown-options-list">
                    {/* Mục mặc định/Tiêu đề */}
                    <li 
                        className="option-item" 
                        onClick={() => handleSelectClick('Tất cả')} // Cho phép chọn lại tiêu đề
                    >
                        {title}
                    </li>
                    
                    {/* Danh sách các tùy chọn */}
                    {options.map((option, index) => (
                      <li 
                            key={index} 
                            className="option-item" 
                            // 🚨 Giữ nguyên logic: Gửi chuỗi HOẶC đối tượng
                            onClick={() => handleSelectClick(option)} 
                        >
                            {/* Logic hiển thị đã đúng: ưu tiên label nếu là object */}
                            {option && typeof option === 'object' && option.label 
                                ? option.label 
                                : option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export const StatCard = ({ icon, title, value }) => {
    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <p className="stat-title">{title}</p>
            <p className="stat-value">{value}</p>
        </div>
    );
};
