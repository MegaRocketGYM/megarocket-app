import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

const SharedModal = (data) => {
  if (!data.show) {
    return null;
  }

  const onCloseModal = () => {
    data.closeModal();
  };

  const onConfirm = () => {
    data.onConfirm();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h3>{data.title}</h3>
        <p>{data.body}</p>
        <div className={styles.buttonContainer}>
          {data.isDelete ? (
            <>
              <Button type="cancel" text={'Cancel'} clickAction={onCloseModal} />
              <Button type="confirm" text={'Confirm'} clickAction={onConfirm} />
            </>
          ) : (
            <Button type="confirm" text={'Confirm'} clickAction={onCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedModal;