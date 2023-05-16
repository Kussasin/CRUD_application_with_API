import { useEffect, useState, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UserDetails.module.scss';
import { RootState } from '../../Store/CounterStore';
import { UserProfile } from '../../Types/Types';
import { getUserFromList } from '../../Store/thunks';
import api from '../../Api/Instance';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetail = () => {
  const dispatch = useDispatch();
  const anonimus = 'https://play-lh.googleusercontent.com/EotxkWC4dXajaesh2iVgdIB5-o6pINoas_k-z7nVjRGSu4k9QZwMZIcRNXyUWGn3rg';
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userId = id as string;
    setLoading(true);

    api
      .getUserById(userId)
      .then((result) => {
        dispatch(getUserFromList(result.data.result));
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching user:', error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const user: UserProfile | null = useSelector((state: RootState) => state.users.user_by_id);
  const [firstName, setFirstName] = useState(user?.user_firstname || '');
  const [lastName, setLastName] = useState(user?.user_lastname || '');
  const [status, setStatus] = useState(user?.user_status || '');
  const [city, setCity] = useState(user?.user_city || '');
  const [phone, setPhone] = useState(user?.user_phone || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleOptionsClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChangePasswordClick = () => {
    setChangePassword(true);
  };

  const handleDeleteClick = () => {
    if (id) {
      api.deleteUser(id)
        .then(() => {
          toast.success("User successfully deleted");
          setTimeout(() => {
            window.location.href = "/users";
          }, 1000);
        })
        .catch((error) => {
          toast.error("Error deleting user");
          console.log('Error deleting user:', error);
        });
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setChangePassword(false);
    setFirstName(user?.user_firstname || '');
    setLastName(user?.user_lastname || '');
    setStatus(user?.user_status || '');
    setCity(user?.user_city || '');
    setPhone(user?.user_phone || '');
    setNewPassword('');
    setConfirmPassword('');
    setAvatarFile(null);
  };

  const handleAvatarClick = (): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleAvatarChange;
    input.click();
  };
  
  const handleAvatarChange = (event: Event): void => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSavePasswordClick = () => {
    if (id) {
      if (newPassword === confirmPassword) {

        const data = {
          user_password: newPassword,
          user_password_repeat: confirmPassword,
        };

        api.updateUserPassword(id, data)
          .then(() => {
            toast.success("Password successfully changed");
            setTimeout(() => {
              window.location.href = "/users";
            }, 1000);
          })
          .catch((error) => {
            toast.error("Error changing password");
            console.log('Error changing password:', error);
          });
      } else {
        toast.error("Passwords do not match");
      }
    }
  };

  const handleSaveDataClick = () => {
    if (id) {
      if (avatarFile) {
        api
          .updateUserAvatar(id, avatarFile)
          .then(() => {
            toast.success('Avatar successfully changed');
            setTimeout(() => {
              window.location.href = '/users';
            }, 1000);
          })
          .catch((error) => {
            toast.error('Error changing avatar');
            console.log('Error changing avatar:', error);
          });
      } else {
        const updatedData = {
          user_firstname: firstName,
          user_lastname: lastName,
          user_status: status,
          user_city: city,
          user_phone: phone,
        };
  
        api
          .updateUserInfo(id, updatedData)
          .then(() => {
            toast.success('Data successfully saved');
            setTimeout(() => {
              window.location.href = '/users';
            }, 1000);
          })
          .catch((error) => {
            toast.error('Error saving data');
            console.log('Error saving data:', error);
          });
      }
    }
  };
  
  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  if (user === null) {
    return <div className={styles.message}>Data not found</div>;
  }

  return (
    <div className={styles.userProfile}>
      <div className={styles.card}>
        <div className={styles.options} onClick={handleOptionsClick} ref={optionsRef}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          {showOptions && (
            <ul className={styles.optionsList}>
              <li>
                <button className={styles.edit} onClick={handleEditClick}>
                  Edit
                </button>
              </li>
              <li>
                <button className={styles.changePassword} onClick={handleChangePasswordClick}>
                  Change password
                </button>
              </li>
              <li>
                <button className={styles.delete} onClick={handleDeleteClick}>
                  Delete
                </button>
              </li>
            </ul>
          )}
        </div>
        {editMode ? (
          <div className={styles.editForm}>
            {/* Render the edit form */}
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={avatarFile ? URL.createObjectURL(avatarFile) : (user?.user_avatar || anonimus)}
                alt="User avatar" key={avatarFile?.name}
              />
              <button className={styles.changeAvatar} onClick={handleAvatarClick}>
                Change Avatar
              </button>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formField}>
                <label htmlFor="firstname">First Name:</label>
                <input type="text" defaultValue={firstName} onChange={handleFirstNameChange} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" id="lastname" defaultValue={lastName} onChange={handleLastNameChange} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="status">Status:</label>
                <input type="text" id="status" defaultValue={status} onChange={handleStatusChange} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="city">City:</label>
                <input type="text" id="city" defaultValue={city} onChange={handleCityChange} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="phone">Phone number:</label>
                <input type="text" id="phone" defaultValue={phone} onChange={handlePhoneChange} />
              </div>
              <div className={styles.formActions}>
                <button className={styles.saveButton} onClick={handleSaveDataClick}>
                  Save
                </button>
                <button className={styles.cancelButton} onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : changePassword ? (
          <div className={styles.editForm}>
            {/* Render the change password form */}
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={avatarFile ? URL.createObjectURL(avatarFile) : (user?.user_avatar || anonimus)} alt="User avatar" />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formField}>
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
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
        ) : (
          <div>
            {/* Render the regular card */}
            <img className={styles.avatar} src={user.user_avatar || anonimus} alt="User avatar" />
            <div className={styles.cardContent}>
              <div className={styles.name}>
                <span className={styles.label}>Name:</span> {user.user_firstname} <br />
                <span className={styles.label}>Surname:</span> {user.user_lastname}
              </div>
              <div className={styles.email}>
                <span className={styles.label}>Email:</span> {user.user_email}
              </div>
              <div className={styles.status}>
                <span className={styles.label}>Status:</span> {user.user_status}
              </div>
              <div className={styles.city}>
                <span className={styles.label}>City:</span> {user.user_city}
              </div>
              <div className={styles.phone}>
                <span className={styles.label}>Phone number:</span> {user.user_phone}
              </div>
              <div className={styles.phone}>
                <span className={styles.label}>Is super user?:</span> {user.is_superuser ? 'yes' : 'no'}
              </div>
            </div>
          </div>
        )}
      </div>
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
    </div>
  );
};
export default UserDetail;
