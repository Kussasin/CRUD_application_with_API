import { useState, FormEvent } from 'react';
import api from '../../../Api/Instance';
import { toast } from 'react-toastify';
import styles from './CreateCompany.module.scss';
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (companyName.trim() === '') {
            alert('Please fill in all required fields');
            return;
        }

        const companyData = {
            company_name: companyName,
            is_visible: true,
        };

        setIsSubmitting(true);
        api.createCompany(companyData)
            .then((response) => {
                console.log('Company created:', response.data);
                setCompanyName('');
                toast.success('Company created successfully');
                setTimeout(() => {
                    navigate(`/company/${response.data.result.company_id}`);
                }, 500);
            })
            .catch((error) => {
                console.error('Error creating company:', error);
                toast.error('An error occurred while creating the company');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name:</label>
                <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Company'}
                </button>
            </div>
        </form>
    );
};

export default CreateCompany;
