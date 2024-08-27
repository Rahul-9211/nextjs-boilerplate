import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  customStyles?: React.CSSProperties;
}

const InvitationSentModal: React.FC<ModalProps> = ({ visible, onClose, children, width = 500, customStyles = {} }) => {
  return (
    <Rodal
      visible={visible}
      onClose={onClose}
      customStyles={{ borderRadius: 16, height: 'fit-content', ...customStyles }}
      width={width}
    >
      {children}
    </Rodal>
  );
};

export default InvitationSentModal;
