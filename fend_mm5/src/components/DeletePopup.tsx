import React from "react";
import DeleteIcon from "../assets/delete-popup.svg";
interface DeleteModalProps {
  isOpen: boolean;
  productName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  productName,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <div className="flex flex-col items-start text-start">
          <div className="bg-red-100 rounded-full p-3 mb-4">
          <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-10 h-10 group-hover:scale-120 "
                    />
          </div>
          <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete the product '{productName}'?
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
