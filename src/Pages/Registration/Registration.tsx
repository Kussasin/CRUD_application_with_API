import React, { useState } from 'react';
import styles from './Registration.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Api/Instance';
import validateForm from '../../Utils/FormValidation';
import { Errors, FormValues } from '../../Types/Types';

const Registration = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: '',
    user_password_repeat: '',
  });

  const [formErrors, setFormErrors] = useState<Errors>({
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: '',
    user_password_repeat: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await api.createUser(formValues);
        console.log(response);
        toast.success('User created successfully');
        setTimeout(() => {
          navigate("/authorization");
        }, 1000);

      } catch (error) {
        console.error(error);
        toast.error('Failed to create user');
      }
    }
  };

  return (
    <main className={styles.container}>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="user_firstname">Name:</label>
          <input
            type="text"
            name="user_firstname"
            id="user_firstname"
            value={formValues.user_firstname}
            onChange={handleInputChange}
          />
          {formErrors.user_firstname && <span className={styles.error}>{formErrors.user_firstname}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="user_lastname">Surname:</label>
          <input
            type="text"
            name="user_lastname"
            id="user_lastname"
            value={formValues.user_lastname}
            onChange={handleInputChange}
          />
          {formErrors.user_lastname && <span className={styles.error}>{formErrors.user_lastname}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="user_email">Email:</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            value={formValues.user_email}
            onChange={handleInputChange}
          />
          {
            formErrors.user_email && <span
              className={styles.error}>{formErrors.user_email}</span>
          }
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="user_password">Password:</label>
          <input
            type="password"
            name="user_password"
            id="user_password"
            value={formValues.user_password}
            onChange={handleInputChange}
          />
          {
            formErrors.user_password && <span className={styles.error}>{formErrors.user_password}</span>
          }
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="user_password_repeat">Repeat user_password:</label>
          <input
            type="password"
            name="user_password_repeat"
            id="user_password_repeat"
            value={formValues.user_password_repeat}
            onChange={handleInputChange}
          />
          {
            formErrors.user_password_repeat && <span className={styles.error}>{formErrors.user_password_repeat}</span>
          }
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <Link className={styles.link} to="/authorization">Back to Authorization</Link>

    </main>
  );
};
export default Registration;

