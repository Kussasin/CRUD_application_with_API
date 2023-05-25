import { ChangePasswordProps, UpdatePasswordData } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';
import { toast } from 'react-toastify';
import api from '../../Api/Instance';
import anonimus from '../Images/anonimus.png'

export const UserChangePassword = (props: ChangePasswordProps) => {

  const {
    user,
    id,
    userData,
    setUserData,
    setEditMode,
    setChangePassword

  } = props;

  const handleChange = (key: string, value: string | File | Array<string>, index?: number): void => {
    setUserData((prevData) => {
      let newData = { ...prevData };
      if (key === 'avatarFile') {
        newData = { ...newData, avatarFile: value as File };
      } else if (index !== undefined && key === 'links') {
        const updatedLinks = [...newData.links];
        updatedLinks[index] = value as string;
        newData = { ...newData, links: updatedLinks };
      } else {
        newData = { ...newData, [key]: value };
      }
      return newData;
    });
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('newPassword', value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('confirmPassword', value);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setChangePassword(false);
    setUserData({
      firstName: user?.user_firstname || '',
      lastName: user?.user_lastname || '',
      status: user?.user_status || '',
      city: user?.user_city || '',
      phone: user?.user_phone || '',
      links: user?.user_links || [],
      newPassword: '',
      confirmPassword: '',
      avatarFile: null,
    });
  };

  const handleSavePasswordClick = async () => {
    if (!id) {
      return;
    }

    if (userData.newPassword === userData.confirmPassword) {
      const data: UpdatePasswordData = {
        user_password: userData.newPassword,
        user_password_repeat: userData.confirmPassword,
      };

      try {
        await api.updateUserPassword(id, data);
        toast.success('Password successfully changed');
        setTimeout(() => {
          setChangePassword(false);
        }, 1000);
      } catch (error) {
        toast.error('Error changing password');
        console.log('Error changing password:', error);
      }
    } else {
      toast.error('Passwords do not match');
    }
  };
  
  return (
    <div className={styles.editForm}>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={userData.avatarFile ? URL.createObjectURL(userData.avatarFile) : (user?.user_avatar || anonimus)} alt="User avatar" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.formField}>
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" value={userData.newPassword} onChange={handleNewPasswordChange} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={userData.confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSavePasswordClick}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}