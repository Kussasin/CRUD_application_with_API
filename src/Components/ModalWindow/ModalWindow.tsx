import { FC } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent/ModalContent';

interface ModelWindowProps {
  headerText: string;
  contentText: string
}

const ModalWindow: FC<ModelWindowProps> = ({ headerText, contentText }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <ModalContent
          headerText={headerText}
          contentText={contentText}
          onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
};
export default ModalWindow;