import { useEffect, useState } from 'react';
import SharedModal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import styles from './activities.module.css';
import { useHistory } from 'react-router-dom';
import { getActivities, deleteActivities } from 'Redux/activities/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const Activities = () => {
  const history = useHistory();
  const [activityId, setActivityId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.activities.loading);
  const activities = useSelector((state) => state.activities.data.data);

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const handleAddItem = () => {
    history.push('activities/form');
  };

  const handleDeleteClick = (id) => {
    setActivityId(id);
    setIsDelete(true);
    setTypeStyle();
    setTitleModal('Do you want to delete this activity?');
    setBodyModal('');
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await dispatch(deleteActivities(activityId));
      setShowModal(true);
      setTitleModal('Success');
      setBodyModal(data.message);
      setTypeStyle('success');
      setIsDelete(false);
    } catch (error) {
      setShowModal(true);
      setBodyModal(error.message);
      setTitleModal('error');
      setTypeStyle('error');
      setIsDelete(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditItem = (id) => {
    history.push(`activities/form/${id}`);
  };

  return (
    <section className={styles.containerActivity}>
      <div className={styles.topContainer}>
        <h2>Activities</h2>
        <Button text={'+ Add Activity'} type={'add'} clickAction={handleAddItem} />
      </div>
      {loading ? (
        <ClipLoader />
      ) : activities ? (
        <>
          <Table
            data={activities}
            properties={['name', 'description', 'isActive']}
            columnTitles={['Name', 'Description', 'Active']}
            handleUpdateItem={handleEditItem}
            handleDeleteItem={handleDeleteClick}
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
        <h3>There are no activities</h3>
      )}
    </section>
  );
};

export default Activities;
