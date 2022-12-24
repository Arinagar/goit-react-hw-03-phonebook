import PropTypes from 'prop-types';
import css from './Filter.module.css';
export const Filter = ({ onFilterInput }) => {
  return (
    <div className={css.contacts}>
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        onChange={event => onFilterInput(event.target.value)}
        placeholder="Search contacts"
      />
    </div>
  );
};

Filter.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
};
