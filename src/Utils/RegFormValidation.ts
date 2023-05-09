import { FormValues, Errors } from "../Types/Types";

const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const validateForm = (formValues: FormValues): Errors => {
    const errors: Errors = {};

    if (!formValues.user_firstname.trim()) {
        errors.user_firstname = 'First name is required';
    } else if (!nameRegex.test(formValues.user_firstname)) {
        errors.user_firstname = 'First name is invalid';
    }

    if (!formValues.user_lastname.trim()) {
        errors.user_lastname = 'Last name is required';
    } else if (!nameRegex.test(formValues.user_lastname)) {
        errors.user_lastname = 'Last name is invalid';
    }

    if (!formValues.user_email.trim()) {
        errors.user_email = 'Email is required';
    } else if (!emailRegex.test(formValues.user_email)) {
        errors.user_email = 'Email is invalid';
    }

    if (!formValues.user_password.trim()) {
        errors.user_password = 'Password is required';
    } else if (!passwordRegex.test(formValues.user_password)) {
        errors.user_password = 'Password is invalid';
    }

    if (!formValues.user_password_repeat.trim()) {
        errors.user_password_repeat = 'Password repeat is required';
    } else if (formValues.user_password !== formValues.user_password_repeat) {
        errors.user_password_repeat = 'Passwords do not match';
    }

    return errors;
};


export default validateForm;
