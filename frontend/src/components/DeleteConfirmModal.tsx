interface Props {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ isOpen, title, onCancel, onConfirm }: Props) => {
  // ✅ No useState here unless necessary
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to delete <em>{title}</em> from the database?
        </h3>
        <div className="flex justify-center gap-4">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
