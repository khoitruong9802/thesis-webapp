const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen &&
    // backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      {/* modal */}
      <div
        onClick={e => e.stopPropagation()}
        className="flex flex-col bg-white"
      >
        {/* <button
          className="bg-red-700 font-medium text-white p-2"
          onClick={onClose}
        >Cancel</button> */}
        {children}
      </div>
    </div>
  )
}

export default Modal;