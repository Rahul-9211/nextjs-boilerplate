import React from 'react';
import Rodal from 'rodal'; // You can use any modal library, or create your own

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberEmail: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, memberEmail }) => {
    const handleOnClose = ()=> {
        onClose();
    }
  return (
    <Rodal visible={isOpen} onClose={onClose} className='rounded-md'  customStyles={{borderRadius : "16px"}}>
      <div className='text-center flex items-center justify-center flex-col h-full rounded-md'>
        <h3 className="text-lg font-semibold">Confirm Removal</h3>
        <p>Are you sure you want to remove {memberEmail}?</p>
       <div className='pt-4'>
       <button className="px-4 py-2 bg-primary-5 text-white rounded-md" onClick={onConfirm}>
          Confirm
        </button>
        <button className="px-4 py-2 bg-gray-300 text-black rounded-md ml-2" onClick={handleOnClose}>
          Cancel
        </button>
       </div>
      </div>
    </Rodal>
  );
};

export default ConfirmModal;
