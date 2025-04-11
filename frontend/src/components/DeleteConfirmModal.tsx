interface Props {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ isOpen, title, onCancel, onConfirm }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-modal bg-white text-black p-6 rounded shadow-lg max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-black">
          Are you sure you want to delete <em>{title}</em> from the database?
        </h3>
        <div className="flex justify-center gap-4">
          <button
            className="bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
