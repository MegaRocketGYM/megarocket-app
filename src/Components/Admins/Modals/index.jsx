import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = () => {
    props.handleConfirmDelete();
    props.handleCancelDelete();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.title}</h3>
        <p>{props.body}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.deleteButton} onClick={onCloseModal}>
            Yes
          </button>
          <button className={styles.noButton} onClick={props.handleCancelDelete}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
