type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

export default function Modal({ isOpen, onClose, imageUrl }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative">
        <img src={imageUrl} alt="Large" className="max-h-screen rounded-lg" />
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
