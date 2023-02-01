import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  const initialValues = {
    filter: '',
  };
  const handleChange = e => {
    onChange(e.currentTarget.value);
  };

  const handleSubmit = ({ filter }, { resetForm }) => {
    onChange(filter);
    resetForm();
  };

  return (
    <>
      <p className={css.title}>Find contacts by name</p>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            className={css.input}
            type="text"
            name="filter"
            value={value}
            onChange={handleChange}
          ></Field>
        </Form>
      </Formik>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
