import { FC, ReactNode } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent/ModalContent';
import styles from './ModalWindow.module.scss';

interface ModelWindowProps {
  content: ReactNode;
  title: string
}

const ModalWindow: FC<ModelWindowProps> = ({ content, title }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={styles.container_button}>
        <button className={styles.create_button} onClick={() => setShowModal(true)}>
          {title}
        </button>
      </div>
      {showModal && createPortal(
        <ModalContent
          Component={content}
          onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
};
export default ModalWindow;