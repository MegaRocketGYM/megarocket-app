import styles from './modalShedule.module.css';
import { BsFillPersonVcardFill, BsXLg } from 'react-icons/bs';

const Modal = (data) => {
  if (!data.show) {
    return null;
  }

  const onCloseModal = () => {
    data.closeModal();
  };

  const getMembershipStyle = (membership) => {
    switch (membership) {
      case 'Black':
        return styles.membershipBlack;
      case 'Classic':
        return styles.membershipClassic;
      default:
        return styles.membershipOnly;
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContentDefault}>
        <div className={styles.closeContainer}>
          <div className={styles.close} onClick={onCloseModal}>
            <BsXLg />
          </div>
        </div>
        <div className={styles.centerTitle}>
          Class {data.day.length > 1 ? data.day.join(' - ') : data.day} {data.hour} Hs
        </div>
        <div className={styles.activity}>{data.activity}</div>
        <div className={styles.center}>Trainer:</div>
        <div className={styles.trainer}>
          <div className={styles.trainerIcon}>
            <BsFillPersonVcardFill />
          </div>
          <span className={styles.space}></span>
          {data.trainer}
        </div>
        <div className={styles.listTitle}>Participants: </div>
        <div className={styles.listMembers}>
          {data.membersClass.map((subscription) => (
            <div key={subscription.member._id}>
              <div className={styles.member}>
                {subscription.member.firstName} {subscription.member.lastName}
                <span> </span>
                <span className={getMembershipStyle(subscription.member.membership)}>
                  {subscription.member.membership}
                </span>
              </div>
            </div>
          ))}
        </div>
        {data.slot <= data.slotCount ? (
          <div className={styles.slotsFull}>
            Slots full {data.slotCount} / {data.slot}
          </div>
        ) : (
          <div className={styles.center}>
            Slots: {data.slotCount} / {data.slot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
