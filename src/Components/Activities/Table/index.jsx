import React from 'react';
import styles from './table.module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Table = ({ data, deleteItem, editItem }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  <FaTimes />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    editItem(item._id);
                  }}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
