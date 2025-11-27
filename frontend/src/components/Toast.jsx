import { useEffect } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

/**
 * Toast notification component
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether toast is visible
 * @param {string} props.message - Message to display
 * @param {string} props.type - Type of toast: 'success' | 'error' | 'info'
 * @param {number} props.duration - Duration in milliseconds (default: 3000)
 * @param {Function} props.onClose - Function to call when toast closes
 */
const Toast = ({
  isOpen,
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const bgColor =
    {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
    }[type] || "bg-green-500";

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div
        className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[500px]`}
      >
        <CheckCircleIcon className="h-6 w-6 shrink-0" />
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 hover:bg-white/20 rounded p-1 transition"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
