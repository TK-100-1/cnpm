import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  DocumentTextIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

/**
 * Modal chỉnh sửa thông tin lớp học
 */
const EditClassInfoModal = ({
  isOpen,
  type,
  onClose,
  editForm,
  onFormChange,
  onSave,
}) => {
  if (!isOpen) return null;

  const getTitle = () => {
    switch (type) {
      case "announcement":
        return "Chỉnh sửa thông báo";
      case "courseMaterials":
        return "Chỉnh sửa tài liệu môn học";
      case "referenceMaterials":
        return "Chỉnh sửa tài liệu tham khảo";
      default:
        return "Chỉnh sửa thông tin";
    }
  };

  const handleSave = () => {
    if (type === "announcement") {
      onSave();
    } else {
      onSave(type);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form chỉnh sửa thông báo */}
        {type === "announcement" && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Email:</label>
              <input
                type="email"
                value={editForm?.email || ""}
                onChange={(e) =>
                  onFormChange({ ...editForm, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Thời khóa biểu:
              </label>
              <div className="space-y-2">
                {editForm?.schedule?.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={item.group}
                      onChange={(e) => {
                        const newSchedule = [...editForm.schedule];
                        newSchedule[index].group = e.target.value;
                        onFormChange({ ...editForm, schedule: newSchedule });
                      }}
                      placeholder="Nhóm"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={item.day}
                      onChange={(e) => {
                        const newSchedule = [...editForm.schedule];
                        newSchedule[index].day = e.target.value;
                        onFormChange({ ...editForm, schedule: newSchedule });
                      }}
                      placeholder="Thứ"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={item.period}
                      onChange={(e) => {
                        const newSchedule = [...editForm.schedule];
                        newSchedule[index].period = e.target.value;
                        onFormChange({ ...editForm, schedule: newSchedule });
                      }}
                      placeholder="Tiết"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={item.room}
                      onChange={(e) => {
                        const newSchedule = [...editForm.schedule];
                        newSchedule[index].room = e.target.value;
                        onFormChange({ ...editForm, schedule: newSchedule });
                      }}
                      placeholder="Phòng"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#0388B4] text-white rounded hover:bg-blue-800"
              >
                Lưu
              </button>
            </div>
          </div>
        )}

        {/* Form chỉnh sửa tài liệu môn học */}
        {type === "courseMaterials" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">
                Danh sách tài liệu môn học
              </p>
              <button
                onClick={() => {
                  const newMaterial = {
                    id: Date.now(),
                    name: "",
                    fileName: "",
                    fileUrl: "",
                  };
                  onFormChange({
                    ...editForm,
                    courseMaterials: [
                      ...(editForm?.courseMaterials || []),
                      newMaterial,
                    ],
                  });
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
              >
                <PlusIcon className="h-4 w-4" />
                Thêm tài liệu
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {editForm?.courseMaterials?.length > 0 ? (
                editForm.courseMaterials.map((material, index) => (
                  <div
                    key={material.id || index}
                    className="border border-gray-300 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 text-gray-700">
                        <DocumentTextIcon className="h-5 w-5 text-[#0388B4]" />
                        <span className="font-medium">
                          Tài liệu #{index + 1}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const newMaterials = editForm.courseMaterials.filter(
                            (_, i) => i !== index
                          );
                          onFormChange({
                            ...editForm,
                            courseMaterials: newMaterials,
                          });
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">
                        Tên tài liệu:
                      </label>
                      <input
                        type="text"
                        value={material.name || ""}
                        onChange={(e) => {
                          const newMaterials = [...editForm.courseMaterials];
                          newMaterials[index].name = e.target.value;
                          onFormChange({
                            ...editForm,
                            courseMaterials: newMaterials,
                          });
                        }}
                        placeholder="VD: 01_Ch1 Introduction"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">
                        Tên file (fileName):
                      </label>
                      <input
                        type="text"
                        value={material.fileName || ""}
                        onChange={(e) => {
                          const newMaterials = [...editForm.courseMaterials];
                          newMaterials[index].fileName = e.target.value;
                          onFormChange({
                            ...editForm,
                            courseMaterials: newMaterials,
                          });
                        }}
                        placeholder="VD: 01_Ch1 Introduction.pdf"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">
                        Đường dẫn file (fileUrl):
                      </label>
                      <input
                        type="text"
                        value={material.fileUrl || ""}
                        onChange={(e) => {
                          const newMaterials = [...editForm.courseMaterials];
                          newMaterials[index].fileUrl = e.target.value;
                          onFormChange({
                            ...editForm,
                            courseMaterials: newMaterials,
                          });
                        }}
                        placeholder="VD: /01_Ch1 Introduction.pdf"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Đường dẫn file trong thư mục public (bắt đầu bằng /)
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Chưa có tài liệu nào. Nhấn "Thêm tài liệu" để thêm mới.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#0388B4] text-white rounded hover:bg-blue-800"
              >
                Lưu
              </button>
            </div>
          </div>
        )}

        {/* Form chỉnh sửa tài liệu tham khảo */}
        {type === "referenceMaterials" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">
                Danh sách tài liệu tham khảo
              </p>
              <button
                onClick={() => {
                  const newMaterial = {
                    id: Date.now(),
                    name: "",
                    linkUrl: "",
                  };
                  onFormChange({
                    ...editForm,
                    referenceMaterials: [
                      ...(editForm?.referenceMaterials || []),
                      newMaterial,
                    ],
                  });
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
              >
                <PlusIcon className="h-4 w-4" />
                Thêm tài liệu
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {editForm?.referenceMaterials?.length > 0 ? (
                editForm.referenceMaterials.map((material, index) => (
                  <div
                    key={material.id || index}
                    className="border border-gray-300 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 text-gray-700">
                        <LinkIcon className="h-5 w-5 text-[#0388B4]" />
                        <span className="font-medium">
                          Tài liệu #{index + 1}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const newMaterials =
                            editForm.referenceMaterials.filter(
                              (_, i) => i !== index
                            );
                          onFormChange({
                            ...editForm,
                            referenceMaterials: newMaterials,
                          });
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">
                        Tên tài liệu:
                      </label>
                      <input
                        type="text"
                        value={material.name || ""}
                        onChange={(e) => {
                          const newMaterials = [...editForm.referenceMaterials];
                          newMaterials[index].name = e.target.value;
                          onFormChange({
                            ...editForm,
                            referenceMaterials: newMaterials,
                          });
                        }}
                        placeholder="VD: Hướng dẫn vẽ Usecase Diagram"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">
                        Đường dẫn link (linkUrl):
                      </label>
                      <input
                        type="url"
                        value={material.linkUrl || ""}
                        onChange={(e) => {
                          const newMaterials = [...editForm.referenceMaterials];
                          newMaterials[index].linkUrl = e.target.value;
                          onFormChange({
                            ...editForm,
                            referenceMaterials: newMaterials,
                          });
                        }}
                        placeholder="VD: https://youtu.be/..."
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Đường dẫn URL (YouTube, website, v.v.)
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Chưa có tài liệu nào. Nhấn "Thêm tài liệu" để thêm mới.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#0388B4] text-white rounded hover:bg-blue-800"
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditClassInfoModal;
