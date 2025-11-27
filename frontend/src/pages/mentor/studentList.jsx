import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

/**
 * Trang danh sách sinh viên của một lớp học
 *
 * NOTE:
 *
 */

const mockStudents = {
  1: [
    {
      id: 1,
      studentId: "2212345",
      name: "Nguyễn Văn A",
      email: "2212345@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 2,
      studentId: "2212346",
      name: "Trần Thị B",
      email: "2212346@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 3,
      studentId: "2212347",
      name: "Lê Văn C",
      email: "2212347@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 4,
      studentId: "2212348",
      name: "Phạm Thị D",
      email: "2212348@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 5,
      studentId: "2212349",
      name: "Hoàng Văn E",
      email: "2212349@student.hcmut.edu.vn",
      status: "active",
    },
  ],
  2: [
    {
      id: 1,
      studentId: "2212350",
      name: "Võ Thị F",
      email: "2212350@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 2,
      studentId: "2212351",
      name: "Đặng Văn G",
      email: "2212351@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 3,
      studentId: "2212352",
      name: "Bùi Thị H",
      email: "2212352@student.hcmut.edu.vn",
      status: "active",
    },
  ],
  3: [
    {
      id: 1,
      studentId: "2212353",
      name: "Đỗ Văn I",
      email: "2212353@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 2,
      studentId: "2212354",
      name: "Ngô Thị K",
      email: "2212354@student.hcmut.edu.vn",
      status: "active",
    },
  ],
  4: [
    {
      id: 1,
      studentId: "2212355",
      name: "Dương Văn L",
      email: "2212355@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 2,
      studentId: "2212356",
      name: "Vũ Thị M",
      email: "2212356@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 3,
      studentId: "2212357",
      name: "Lý Văn N",
      email: "2212357@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 4,
      studentId: "2212358",
      name: "Trịnh Thị O",
      email: "2212358@student.hcmut.edu.vn",
      status: "active",
    },
  ],
  5: [
    {
      id: 1,
      studentId: "2212359",
      name: "Phan Văn P",
      email: "2212359@student.hcmut.edu.vn",
      status: "active",
    },
    {
      id: 2,
      studentId: "2212360",
      name: "Vương Thị Q",
      email: "2212360@student.hcmut.edu.vn",
      status: "active",
    },
  ],
};

const StudentList = () => {
  const { id } = useParams(); // Lấy class ID từ URL
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);

  // Load danh sách sinh viên dựa trên class id
  useEffect(() => {
    const classStudents = mockStudents[parseInt(id)] || [];
    setStudents(classStudents);
  }, [id]);

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    return (
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/mentor/classes/${id}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Quay lại trang lớp học</span>
        </button>

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Danh sách sinh viên
        </h1>

        {/* Search Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo MSSV, tên, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MSSV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Họ và Tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {student.status === "active"
                            ? "Đang học"
                            : "Nghỉ học"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Không tìm thấy sinh viên nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Tổng số sinh viên:{" "}
          <span className="font-semibold">{filteredStudents.length}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
