import { useEffect, useState } from 'react';
import Modal from './Modals';
import styles from './activities.module.css';
import Table from './Table';
import Form from './Form';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities'}`);
      const { data } = await response.json();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteActivities = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL + '/activities/' + id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addActivities = async (activity) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      });
      if (response.ok) {
        const newActivity = await response.json();
        return newActivity.data;
      } else {
        setShowModal(true); //hacer modal error
        setActivities(activities);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const addItem = ({ name, description }) => {
    const newItem = {
      name,
      description
    };
    addActivities(newItem);
    setActivities([...activities, newItem]);
  };

  const deleteItem = (id) => {
    deleteActivities(id);
    setActivities(activities.filter((activity) => activity._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <button className={styles.addButton}> + Add new activity</button>
      <Modal
        title="The activity has been successfully deleted!"
        show={showModal}
        closeModal={closeModal}
      />
      <Table data={activities} deleteItem={deleteItem} setShowModal={setShowModal} />
      <Form addItem={addItem} addActivities={addActivities} />
    </section>
  );
};

export default Activities;
