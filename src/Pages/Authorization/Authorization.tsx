import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import styles from './Authorization.module.scss';
import api from '../../Api/Instance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  user_email: string;
  user_password: string;
}

interface FormErrors {
  user_email?: string;
  user_password?: string;
}

const Authorization = () => {

  const [formValues, setFormValues] = useState<FormValues>({
    user_email: '',
    user_password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { loginWithPopup, getAccessTokenSilently } = useAuth0();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const response = await api.loginUser(formValues);
        localStorage.setItem('token', response.data.result.access_token);
        api.updateAuthorizationHeader(response.data.result.access_token);

        const profileResponse = await api.getProfile();
        localStorage.setItem('me', JSON.stringify(profileResponse.data.result));
        
        window.location.href = '/';
      } catch (error) {
        console.error(error);
        toast.error('Incorrect username or password');
      }
    }
  };

  const validateForm = () => {
    let errors: FormErrors = {};

    if (!formValues.user_email) {
      errors.user_email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.user_email)) {
      errors.user_email = 'Invalid email address';
    }

    if (!formValues.user_password) {
      errors.user_password = 'Password is required';
    } else if (formValues.user_password.length < 6) {
      errors.user_password = 'Password should contain at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAuth0Click = async () => {
    try {
      await loginWithPopup();
      const token = await getAccessTokenSilently();
      localStorage.setItem('token', token);
      api.updateAuthorizationHeader(token);

      const profileResponse = await api.getProfile();
      localStorage.setItem('me', JSON.stringify(profileResponse.data.result));
      window.location.href = '/';

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="user_email">Email:</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            value={formValues.user_email}
            onChange={handleInputChange}
          />
          {formErrors.user_email && <span className={styles.error}>{formErrors.user_email}</span>}
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
          {formErrors.user_password && (
            <span className={styles.error}>{formErrors.user_password}</span>
          )}
        </div>
        <button className={styles.submitButton} type="submit">
          Login
        </button>
      </form>
      <div className={styles.or}>
        <span>or</span>
      </div>
      <button className={styles.authButton} onClick={handleAuth0Click}>
        Auth0
      </button>
      <div className={styles.signupLink}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Authorization;