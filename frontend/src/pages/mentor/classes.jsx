import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  DocumentTextIcon,
  LinkIcon,
  PencilIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { mentorClassesDetail } from "../../data/mentorClassesData";
import EditClassInfoModal from "../../components/EditClassInfoModal";
import Toast from "../../components/Toast";
// import { jsPDF } from "jspdf"; // Chỉ dùng khi không có file PDF sẵn

const Classes = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  // State cho dữ liệu lớp học
  const [classInfo, setClassInfo] = useState({
    code: "",
    name: "",
    semester: "",
    instructor: "",
    lecture: "",
    email: "",
    schedule: [],
    courseMaterials: [],
    referenceMaterials: [],
  });

  // State cho modal chỉnh sửa
  const [editModal, setEditModal] = useState({
    isOpen: false,
    type: null, // 'announcement', 'courseMaterials', 'referenceMaterials'
  });

  // State cho form chỉnh sửa thông báo
  const [editForm, setEditForm] = useState({
    email: "",
    schedule: [],
    courseMaterials: [],
    referenceMaterials: [],
  });

  // State cho toast notification
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  // Load dữ liệu lớp học dựa trên id
  useEffect(() => {
    const classData = mentorClassesDetail[parseInt(id)];
    if (classData) {
      setClassInfo(classData);
      setEditForm({
        email: classData.email,
        schedule: classData.schedule,
        courseMaterials: classData.courseMaterials || [],
        referenceMaterials: classData.referenceMaterials || [],
      });
    } else {
      navigate("/mentor/classes");
    }
  }, [id, navigate]);

  // Function để download file PDF
  const handleDownloadFile = (material) => {
    // Nếu có fileUrl (file PDF có sẵn), download từ đó
    if (material.fileUrl) {
      // Tạo link để download file
      const link = document.createElement("a");
      link.href = material.fileUrl;
      link.download =
        material.fileName || `${material.name.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (material.fileName && material.fileName.startsWith("/")) {
      // Nếu fileName bắt đầu bằng "/", coi như là fileUrl
      const link = document.createElement("a");
      link.href = material.fileName;
      link.download = material.fileName.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("File URL không tồn tại:", material.fileUrl);
    }
  };

  // Function để mở link tài liệu tham khảo
  const handleOpenReferenceLink = (material) => {
    if (material.linkUrl) {
      window.open(material.linkUrl, "_blank");
    }
  };

  // Function để mở modal chỉnh sửa
  const handleOpenEditModal = (type) => {
    // Đảm bảo dữ liệu được load vào editForm khi mở modal
    if (type === "courseMaterials") {
      setEditForm({
        ...editForm,
        courseMaterials: classInfo.courseMaterials || [],
      });
    } else if (type === "referenceMaterials") {
      setEditForm({
        ...editForm,
        referenceMaterials: classInfo.referenceMaterials || [],
      });
    }
    setEditModal({ isOpen: true, type });
  };

  // Function để đóng modal
  const handleCloseEditModal = () => {
    setEditModal({ isOpen: false, type: null });
  };

  // Function để lưu thay đổi thông báo
  const handleSaveAnnouncement = () => {
    // TODO: Sau này sẽ gọi API để lưu
    // fetch(`/api/classes/${id}`, { method: 'PUT', body: JSON.stringify(editForm) })

    // Tạm thời cập nhật state
    setClassInfo({
      ...classInfo,
      email: editForm.email,
      schedule: editForm.schedule,
    });
    handleCloseEditModal();
    setToast({
      isOpen: true,
      message: "Đã lưu thay đổi thành công!",
      type: "success",
    });
  };

  // Function để lưu thay đổi tài liệu
  const handleSaveMaterials = (type) => {
    // TODO: Sau này sẽ gọi API để lưu
    // fetch(`/api/classes/${id}`, { method: 'PUT', body: JSON.stringify(editForm) })

    // Tạm thời cập nhật state
    if (type === "courseMaterials") {
      setClassInfo({
        ...classInfo,
        courseMaterials: editForm.courseMaterials,
      });
    } else if (type === "referenceMaterials") {
      setClassInfo({
        ...classInfo,
        referenceMaterials: editForm.referenceMaterials,
      });
    }

    handleCloseEditModal();
    setToast({
      isOpen: true,
      message: `Đã lưu thay đổi ${
        type === "courseMaterials" ? "tài liệu môn học" : "tài liệu tham khảo"
      } thành công!`,
      type: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header với tên lớp học */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button
          onClick={() => navigate("/mentor/classes")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-3 transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Quay lại danh sách lớp học</span>
        </button>
        <h1 className="text-2xl font-bold text-blue-600">
          [{classInfo.code}] {classInfo.name}_{classInfo.semester}_
          {classInfo.instructor}_{classInfo.lecture}
        </h1>
      </div>

      <div className="flex gap-6 px-6 py-6">
        {/* Main Content - Left Side */}
        <div className="flex-1 space-y-6">
          {/* Thông báo Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Thông báo</h2>
              <button
                onClick={() => handleOpenEditModal("announcement")}
                className="flex items-center gap-2 px-4 py-2 bg-[#0388B4] text-white rounded hover:bg-blue-800 transition"
              >
                <PencilIcon className="h-4 w-4" />
                Chỉnh sửa thông tin
              </button>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Môn học:</span> {classInfo.name}{" "}
                ({classInfo.code})
              </p>
              <p>
                <span className="font-semibold">Giảng viên:</span>{" "}
                {classInfo.instructor}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {classInfo.email}
              </p>
              <div>
                <span className="font-semibold">Thời khóa biểu:</span>
                <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                  {classInfo.schedule.map((item, index) => (
                    <li key={index}>
                      {item.group} - {item.day} {item.period} phòng {item.room}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tài liệu môn học Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Tài liệu môn học
              </h2>
              <button
                onClick={() => handleOpenEditModal("courseMaterials")}
                className="flex items-center gap-2 px-4 py-2 bg-[#0388B4] text-white rounded hover:bg-blue-800 transition"
              >
                <PencilIcon className="h-4 w-4" />
                Chỉnh sửa thông tin
              </button>
            </div>
            <div className="space-y-3">
              {classInfo.courseMaterials &&
              classInfo.courseMaterials.length > 0 ? (
                classInfo.courseMaterials.map((material) => (
                  <div
                    key={material.id}
                    onClick={() => handleDownloadFile(material)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer transition"
                  >
                    <DocumentTextIcon className="h-6 w-6 text-[#0388B4]" />
                    <span className="text-gray-700">{material.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Chưa có tài liệu môn học</p>
              )}
            </div>
          </div>

          {/* Tài liệu tham khảo Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Tài liệu tham khảo
              </h2>
              <button
                onClick={() => handleOpenEditModal("referenceMaterials")}
                className="flex items-center gap-2 px-4 py-2 bg-[#0388B4] text-white rounded hover:bg-blue-800 transition"
              >
                <PencilIcon className="h-4 w-4" />
                Chỉnh sửa thông tin
              </button>
            </div>
            <div className="space-y-3">
              {classInfo.referenceMaterials &&
              classInfo.referenceMaterials.length > 0 ? (
                classInfo.referenceMaterials.map((material) => (
                  <div
                    key={material.id}
                    onClick={() => handleOpenReferenceLink(material)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer transition"
                  >
                    <LinkIcon className="h-6 w-6 text-[#0388B4]" />
                    <span className="text-gray-700">{material.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Chưa có tài liệu tham khảo</p>
              )}
            </div>
          </div>

          {/* Nút Thêm nội dung */}
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium">
              Thêm nội dung
            </button>
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="w-64 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-2">
              <Link
                to={`/mentor/classes/${id}/students`}
                className="block font-semibold text-[#0388B4] hover:text-blue-800 hover:underline py-2"
              >
                Danh sách sinh viên
              </Link>
              <a
                href="#"
                className="block font-semibold text-[#0388B4] hover:text-blue-800 hover:underline py-2"
              >
                Bài kiểm tra
              </a>
              <a
                href="#"
                className="block font-semibold text-[#0388B4] hover:text-blue-800 hover:underline py-2"
              >
                Thảo luận
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Chỉnh sửa thông tin */}
      <EditClassInfoModal
        isOpen={editModal.isOpen}
        type={editModal.type}
        onClose={handleCloseEditModal}
        editForm={editForm}
        onFormChange={setEditForm}
        onSave={
          editModal.type === "announcement"
            ? handleSaveAnnouncement
            : handleSaveMaterials
        }
      />

      {/* Toast Notification */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
};

export default Classes;
