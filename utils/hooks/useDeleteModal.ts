import React, { useRef } from 'react';

interface UseDeleteModalReturn {
  ref: React.RefObject<HTMLDialogElement>;
  onOpen: () => void;
  onClose: () => void;
}

function useDeleteModal(): UseDeleteModalReturn {
  const ref = useRef<HTMLDialogElement>(null);

  const onOpen = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  const onClose = () => {
    if (ref.current) {
      ref.current.className = 'close';
      setTimeout(() => {
        if (ref.current) {
          ref.current.close();
          ref.current.className = '';
        }
      }, 400); // This value should match your CSS animation timing
    }
  };

  return { ref, onOpen, onClose };
}

export default useDeleteModal;
