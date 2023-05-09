import { AuthFormValues, FormErrors } from "../Types/Types";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateForm = ({ user_email, user_password }: AuthFormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!user_email.trim()) {
    errors.user_email = 'Email is required';
  } else if (!emailRegex.test(user_email)) {
    errors.user_email = 'Invalid email address';
  }

  if (!user_password.trim()) {
    errors.user_password = 'Password is required';
  } else if (user_password.length < 6) {
    errors.user_password = 'Password should contain at least 6 characters';
  }

  return errors;
};

export default validateForm;
