import { FC } from 'react';
import styles from './ModalContent.module.scss';

interface ModalContentProps {
    onClose: () => void;
    headerText: string;
    contentText: string;
}

const ModalContent: FC<ModalContentProps> = ({ onClose, headerText, contentText }) => {
    return (
        <div className={styles.modal_wrapper}>
          <div className={styles.modal_backdrop}/>
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <h2>{headerText}</h2>
              <button className={styles.modal_close} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.modal_body}>
              <p>{contentText}</p>
            </div>
          </div>
        </div>
      );
};

export default ModalContent;
