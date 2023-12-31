import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import ConfirmModal from 'Components/Shared/Modal/ConfirmModal';
import { useHistory } from 'react-router-dom';
import { getClasses, deleteClass } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { getTrainers } from 'Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import CalendarModal from './Modal/index';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button as ButtonMui } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

const Classes = () => {
  const history = useHistory();
  const isLoadingClasses = useSelector((state) => state.classes?.loading);
  const isLoadingActivities = useSelector((state) => state.activities?.loading);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [classSelect, setClassSelect] = useState('');
  const {
    classes = [],
    activities = [],
    trainers = []
  } = useSelector((state) => ({
    classes: state.classes?.data.data,
    activities: state.activities?.data.data,
    trainers: state.trainers?.data
  }));
  const activeTrainers = trainers.filter((trainer) => trainer.isActive === true);
  const [activity, setActivity] = useState('all');
  const [trainer, setTrainer] = useState('all');
  const [calendarAlert, setCalendarAlert] = useState(false);
  const dispatch = useDispatch();
  const isLoading = isLoadingActivities && isLoadingClasses;
  useEffect(() => {
    toast.remove();
    dispatch(getClasses());
    dispatch(getActivities());
    dispatch(getTrainers());
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      showToast(toastMessage, 'success');
      localStorage.removeItem('toastMessage');
    }
  }, []);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: '#fddba1'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    } else if (type === 'error') {
      toast.error(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: 'rgba(227, 23, 10, 0.5)'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    }
  };

  const handleDeleteClass = () => {
    setCalendarAlert(false);
    setShowDeleteWarning(true);
  };

  const handleConfirmDeleteClass = async () => {
    setShowDeleteWarning(false);
    try {
      const data = await dispatch(deleteClass(classSelect._id));
      showToast(data.message, 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleAddClass = () => {
    history.push('/admins/classes/form/');
  };

  const handleUpdateClass = () => {
    history.push(`/admins/classes/form/${classSelect._id}`);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const hoursOfDay = [
    { label: '08:00', value: 8 },
    { label: '09:00', value: 9 },
    { label: '10:00', value: 10 },
    { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    { label: '13:00', value: 13 },
    { label: '14:00', value: 14 },
    { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
    { label: '17:00', value: 17 },
    { label: '18:00', value: 18 },
    { label: '19:00', value: 19 },
    { label: '20:00', value: 20 },
    { label: '21:00', value: 21 },
    { label: '22:00', value: 22 }
  ];

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleTrainerChange = (e) => {
    setTrainer(e.target.value);
  };

  const handleCloseModalCalendar = () => {
    setCalendarAlert(false);
  };

  const handleClass = (classItem) => {
    setClassSelect(classItem);
    setCalendarAlert(true);
  };

  const getClassButton = (hour, day) => {
    let classItem;

    if (activity === 'all' && trainer === 'all') {
      classItem = classes?.find((item) => item.day.includes(day) && item.hour === hour);
    } else if (trainer !== 'all' && activity === 'all') {
      if (trainer === 'notAssign') {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            (!item.trainer || !item.trainer?.isActive)
        );
      } else {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            item.trainer?.firstName + item.trainer?.lastName === trainer
        );
      }
    } else if (activity !== 'all' && trainer === 'all') {
      classItem = classes?.find(
        (item) =>
          item.day.includes(day) &&
          item.hour === hour &&
          item.activity?.name === activity &&
          (!item.trainer || item.trainer?.isActive)
      );
    } else {
      if (trainer === 'notAssign') {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            item.activity?.name === activity &&
            (!item.trainer || !item.trainer?.isActive)
        );
      } else {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            item.activity?.name === activity &&
            item.trainer?.firstName + item.trainer?.lastName === trainer
        );
      }
    }

    if (classItem) {
      if (classItem.trainer && classItem.trainer?.isActive) {
        return (
          <div
            id={`admin-button-class-${day.toLowerCase()}-${hour.split(':')[0].replace(/^0+/, '')}`}
            onClick={() => handleClass(classItem)}
            className={styles.classesButton}
          >
            <div className={styles.buttonText}>
              {classItem.activity?.name ? classItem.activity?.name : 'Not assigned activity'}
            </div>
            {classItem?.trainer?.firstName}
          </div>
        );
      } else {
        return (
          <div
            id={`admin-button-class-${day.toLowerCase()}-${hour.split(':')[0].replace(/^0+/, '')}`}
            onClick={() => handleClass(classItem)}
            className={styles.classesButton}
          >
            <div className={styles.buttonText}>
              {classItem.activity?.name ? classItem.activity?.name : 'Not assigned activity'}
            </div>
            Not assigned trainer
          </div>
        );
      }
    } else {
      return <div className={styles.emptyButton}></div>;
    }
  };

  return (
    <>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      {isLoading ? (
        <Container center={true}>
          <ClipLoader />
        </Container>
      ) : classes ? (
        <Container>
          <div className={styles.container}>
            <div className={styles.headerContainer}>
              <div>
                <h2 className={styles.title}>Scheduled Classes</h2>
              </div>
              <div className={styles.select}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="admin-label-activity">Activity</InputLabel>
                  <Select
                    value={activity}
                    onChange={handleActivityChange}
                    id={'admin-select-activity'}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {activities?.map((activityItem, index) => (
                      <MenuItem
                        id={`admin-classes-select-activity-${activityItem.name
                          .toString()
                          .toLowerCase()}`}
                        key={index}
                        value={activityItem.name}
                      >
                        {activityItem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={styles.select}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="admin-label-trainer">Select Trainer</InputLabel>
                  <Select value={trainer} onChange={handleTrainerChange} id="admin-select-trainer">
                    <MenuItem value="all">All</MenuItem>

                    {activeTrainers?.map((trainerItem, index) => (
                      <MenuItem
                        value={trainerItem.firstName + trainerItem.lastName}
                        key={index}
                        id={`admin-classes-select-trainer-${trainerItem.firstName}`}
                        sx={trainerItem.isActive ? null : { color: '#878E88' }}
                      >
                        {trainerItem.firstName + ' ' + trainerItem.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={styles.buttonContainer}>
                <Tooltip title="Add new class">
                  <ButtonMui
                    sx={{
                      borderRadius: '200px',
                      height: '50px',
                      width: '50px',
                      padding: '0',
                      minWidth: '0'
                    }}
                    id={'admin-classes-add-button'}
                    onClick={handleAddClass}
                    color="primary"
                    aria-label="add"
                    variant="contained"
                    size="small"
                  >
                    <AddIcon size="small" />
                  </ButtonMui>
                </Tooltip>
              </div>
            </div>
            <table className={styles.stylesTable}>
              <thead>
                <tr className={styles.headerTable}>
                  <th>Hours</th>
                  {daysOfWeek?.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hoursOfDay?.map((hour) => (
                  <tr key={hour.value}>
                    <td className={styles.hourColumn}>{hour.label} </td>
                    {daysOfWeek?.map((day) => (
                      <td className={styles.column} key={day}>
                        <div className={styles.buttonContainer}>
                          {getClassButton(hour.label, day)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ConfirmModal
            open={showDeleteWarning}
            onClose={() => setShowDeleteWarning(false)}
            isDelete={true}
            title={'Delete Class'}
            body={'Are you sure you want to delete this class?'}
            onConfirm={handleConfirmDeleteClass}
            id="admin-modal"
            confirmId={'admin-button-confirm-modal'}
            closeId={'admin-button-close-modal'}
          />
          <CalendarModal
            show={calendarAlert}
            onClose={handleCloseModalCalendar}
            handleUpdate={handleUpdateClass}
            handleDelete={handleDeleteClass}
            classTitle={classSelect.activity?.name}
            classDay={classSelect.day}
            classHour={classSelect.hour}
            classTrainer={`${classSelect.trainer?.firstName} ${classSelect.trainer?.lastName}`}
            classSlots={`${classSelect.subscriptions?.length}/${classSelect.slots}`}
          />
        </Container>
      ) : (
        <Container center={true}>
          <h3>There are no Classes in the database</h3>
        </Container>
      )}
    </>
  );
};

export default Classes;
