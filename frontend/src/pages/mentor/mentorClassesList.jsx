import { useState } from "react";
import { Link } from "react-router-dom";
import { mentorClassesList } from "../../data/mentorClassesData";

/**
 * Trang danh sách lớp học của Mentor
 *
 * NOTE:
 * - Hiện tại đang sử dụng MOCK DATA từ file: src/data/mentorClassesData.js
 * - Khi nhấp vào một lớp học, sẽ navigate đến: /mentor/classes/:id (trang classes.jsx)
 * - TODO: Cần implement UI đầy đủ với filter, search, sort
 */
const MentorClassesList = () => {
  const [filter, setFilter] = useState("ongoing"); // 'ongoing', 'upcoming', 'completed'
  const [searchTerm, setSearchTerm] = useState("");
  const classes = mentorClassesList;

  // Filter classes based on status and search term
  const filteredClasses = classes.filter((classItem) => {
    return (
      classItem.status === filter &&
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Các khóa học của tôi
        </h1>
      </div>
    </div>
  );
};

export default MentorClassesList;
