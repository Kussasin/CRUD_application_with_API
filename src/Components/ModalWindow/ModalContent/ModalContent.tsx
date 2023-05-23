import { FC, ReactNode } from 'react';
import styles from './ModalContent.module.scss';

interface ModalContentProps {
  onClose: () => void;
  Component: ReactNode;
}

const ModalContent: FC<ModalContentProps> = ({ onClose, Component }) => {
  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.modal_backdrop} />
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <button className={styles.modal_close} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.modal_body}>
          {Component}
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
