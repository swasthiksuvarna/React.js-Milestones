import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close in 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: {
      border: "border-green-500",
      bg: "bg-green-100",
      iconBg: "bg-green-200",
      text: "text-green-600",
    },
    error: {
      border: "border-red-500",
      bg: "bg-red-100",
      iconBg: "bg-red-200",
      text: "text-red-600",
    },
  };

  const icon =
    type === "success" ? (
      <svg
        className="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg
        className="w-5 h-5 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );

  return (
    <div
      className={`fixed top-5 right-5 z-50 rounded-lg border px-5 py-3 shadow-lg flex items-center gap-4 animate-slide-in ${colors[type].border} ${colors[type].bg}`}
    >
      <div className={`p-2 rounded-full ${colors[type].iconBg}`}>{icon}</div>
      <span className="text-sm font-medium text-black">{message}</span>
      <button onClick={onClose}>
        <svg
          className={`w-5 h-5 ${colors[type].text}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
