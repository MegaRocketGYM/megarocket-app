import React, { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from 'Components/Shared/Table/index';
import { useHistory } from 'react-router-dom';
import SharedModal from 'Components/Shared/Modal/index';
import Button from 'Components/Shared/Button/index';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptions, deleteSubscription } from 'Redux/subscriptions/thunks';
import ClipLoader from 'react-spinners/ClipLoader';

const Subscriptions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.subscriptions.loading);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  const handleAdd = () => {
    history.push('/admin/subscriptions/form');
  };

  const handleEdit = (_id) => {
    history.push(`/admin/subscriptions/form/${_id}`);
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptionId(id);
    setIsDelete(true);
    setTitleModal('Delete subscription');
    setBodyModal('Do you want to delete this subscription?');
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await dispatch(deleteSubscription(subscriptionId));
      setTitleModal('Success');
      setBodyModal(data.message);
      setTypeStyle('success');
      setIsDelete(false);
      setShowModal(true);
    } catch (error) {
      setBodyModal(error.message);
      setTitleModal('error');
      setTypeStyle('error');
      setIsDelete(false);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.subscriptionContainer}>
      <div className={styles.buttonContainer}>
        <h2>Subscriptions</h2>
        <Button text={'+ Add Subscription'} type={'add'} clickAction={handleAdd} />
      </div>
      {loading && subscriptions.length > 0 ? (
        <ClipLoader />
      ) : subscriptions && subscriptions.length > 0 ? (
        <>
          <Table
            data={subscriptions}
            properties={['member.firstName', 'member.lastName', 'classes.activity.name']}
            columnTitles={['First Name', 'Last Name', 'Class Name']}
            handleUpdateItem={handleEdit}
            handleDeleteItem={handleDeleteSubscription}
          />
          {showModal && (
            <SharedModal
              show={showModal}
              typeStyle={typeStyle}
              title={titleModal}
              body={bodyModal}
              isDelete={isDelete}
              onConfirm={handleConfirmDelete}
              closeModal={handleCloseModal}
            />
          )}
        </>
      ) : (
        <h3>There are no subscriptions in the database</h3>
      )}
    </section>
  );
};

export default Subscriptions;