import Modal from "../../components/Modal";
import { useState } from "react";

const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <button
        onClick={() => {
          setIsOpen(true)
        }}
        className="bg-blue-700 rounded-md font-medium text-white p-2"
      >open modal</button>
      <Modal isOpen={isOpen} onClose={() => {setIsOpen(false)}}>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, accusamus.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, accusamus.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, accusamus.</p>
      </Modal>
    </div>
  )
}

export default Overview;