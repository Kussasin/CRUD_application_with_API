import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from 'react-router-dom';
import styles from './Authorization.module.scss';
import api from '../../Api/Instance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validateForm from '../../Utils/FormValidation';
import { FormValues, FormErrors, Token, UserProfile } from '../../Types/Types';
import { setToken, setUser } from '../../Store/thunks';
import { useDispatch } from 'react-redux';

const Authorization = () => {

  const [formValues, setFormValues] = useState<FormValues>({
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: '',
    user_password_repeat: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    user_email: '',
    user_password: '',
  });
  const { loginWithPopup, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(formValues, ['user_email', 'user_password']);
    setFormErrors(errors);
    console.log(errors);
    console.log(formValues);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await api.loginUser(formValues);
        const accessToken: Token = {
          access_token: response.data.result.access_token,
        };

        dispatch(setToken(accessToken));
        const profileResponse = await api.getProfile();

        const userMe: UserProfile = {
          ...profileResponse.data.result
        };

        dispatch(setUser(userMe));

      } catch (error) {
        console.error(error);
        toast.error('Incorrect username or password');
      }
    }
  };

  const handleAuth0Click = async () => {
    try {
      await loginWithPopup();
      const token = await getAccessTokenSilently();

      const accessToken: Token = {
        access_token: token,
      };

      dispatch(setToken(accessToken));

      const profileResponse = await api.getProfile();

      const userMe: UserProfile = {
        ...profileResponse.data.result
      };

      dispatch(setUser(userMe));
      navigate('/');

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
        Don't have an account? <Link to="/registration">Sign up</Link>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Authorization;