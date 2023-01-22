import PropTypes from 'prop-types';
import css from './filter.module.css';

export default function Filter({ value, onChange }) {
  function handleChange({ currentTarget: { value } }) {
    onChange(value);
  }

  return (
    <label className={css.field}>
      <span className={css.label}>Find contacts by name</span>
      <input
        className={css.input}
        type="text"
        name="filter"
        onChange={handleChange}
        value={value}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
