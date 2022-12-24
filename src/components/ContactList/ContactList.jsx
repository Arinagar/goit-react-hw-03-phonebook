import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactsList = ({ filteredContacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {filteredContacts.map(el => {
        return (
          <li key={el.id} className={css.list_item}>
            {el.name}: {el.number}
            <button
              type="button"
              onClick={() => deleteContact(el.id)}
              className={css.list_button}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactsList.propType = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
