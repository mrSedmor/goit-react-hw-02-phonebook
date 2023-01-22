import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import css from './contact-form.module.css';
import sharedCss from 'shared.module.css';

const INITIAL_VALUES = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Phone number is required'),
});

export default function ContactForm({ onAddContact }) {
  function handleAddContact(values, { resetForm }) {
    onAddContact(values);
    resetForm();
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={schema}
      onSubmit={handleAddContact}
    >
      <Form>
        <label className={css.fieldWrapper}>
          <span className={css.label}>Name</span>
          <Field
            className={css.input}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Rosie Simpson"
          />
          <ErrorMessage name="name" component="p" className={css.error} />
        </label>

        <label className={css.fieldWrapper}>
          <span className={css.label}>Number</span>
          <Field
            className={css.input}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="459-12-56"
          />
          <ErrorMessage name="number" component="p" className={css.error} />
        </label>

        <button className={sharedCss.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
