import styles from './members.module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { FiCircle, FiSlash } from 'react-icons/fi';

function MembersTable({
  members,
  handleShowInfo,
  handleShowActionsClick,
  handleDelete,
  showActions,
  tableRef
}) {
  return (
    <table className={styles['members-table']} ref={tableRef}>
      <thead>
        <tr>
          <th>Name/Surname</th>
          <th>Email</th>
          <th>Membership</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(members) &&
          members.map((member, _id) => {
            return (
              <tr key={_id}>
                <td>
                  {member.firstName} {member.lastName}
                </td>
                <td>{member.email}</td>
                <td>{member.membership}</td>
                <td>
                  {member.isActive ? (
                    <FiCircle className={styles['active-icon']} />
                  ) : (
                    <FiSlash className={styles['inactive-icon']} />
                  )}
                </td>
                <td>
                  <div className="actions">
                    <i
                      className="fas fa-cog"
                      onClick={(event) => handleShowActionsClick(event, member._id)}
                    >
                      {' '}
                      <FaCog />{' '}
                    </i>
                    {showActions[member._id] && (
                      <>
                        <i className="fas fa-times" onClick={() => handleDelete(member._id)}>
                          <FaTimes />
                        </i>
                        <i className="fas fa-pencil-alt">
                          <FaEdit />
                        </i>
                        <i onClick={() => handleShowInfo(member)}>
                          <FaInfoCircle />
                        </i>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default MembersTable;
