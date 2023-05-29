import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  const CloseModal = () => {
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div>
          <h3>{props.title}</h3>
        </div>
        <div>
          <button className={styles.closeButton} onClick={CloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
