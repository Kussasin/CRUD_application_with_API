import { useEffect, useState, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UserDetails.module.scss';
import { RootState } from '../../Store/CounterStore';
import { ChangePasswordProps, DropdownMenuProps, EditFormProps, UpdatePasswordData, UpdateUserInfoData, UserData, UserProfile } from '../../Types/Types';
import { getUserFromList } from '../../Store/thunks';
import api from '../../Api/Instance';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const MyId = useSelector((state: RootState) => state.user.user?.user_id);
  
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
  
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    status: '',
    city: '',
    phone: '',
    links: [],
    newPassword: '',
    confirmPassword: '',
    avatarFile: null,
  });

  useEffect(() => {
    if (user) {
      setUserData(prevData => ({
        ...prevData,
        firstName: user.user_firstname || '',
        lastName: user.user_lastname || '',
        status: user.user_status || '',
        city: user.user_city || '',
        phone: user.user_phone || '',
        links: user.user_links || [],
      }));
    }
  }, [user]);

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
    setChangePassword(false);
  };

  const handleChangePasswordClick = () => {
    setChangePassword(true);
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    if (id) {
      api.deleteUser(id)
        .then(() => {
          toast.success("User successfully deleted");
          setTimeout(() => {
            navigate("/users");
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

  const handleAvatarClick = (): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleAvatarChange;
    input.click();
  };

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

  const handleAvatarChange = (event: Event): void => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      handleChange('avatarFile', file);
    }
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('firstName', value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('lastName', value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('status', value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('city', value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('phone', value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('newPassword', value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange('confirmPassword', value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    handleChange('links', value, index);
  };

  const handleSaveDataClick = async () => {
    if (!id) {
      return;
    }

    try {
      if (avatarFile) {
        await api.updateUserAvatar(id, avatarFile);
        toast.success('Avatar successfully changed');
      } else {
        const updatedData: UpdateUserInfoData = {
          user_firstname: firstName,
          user_lastname: lastName,
          user_status: status,
          user_city: city,
          user_phone: phone,
          user_links: links,
        };
        await api.updateUserInfo(id, updatedData);
        toast.success('Data successfully saved');
        const result = await api.getUserById(id);
        dispatch(getUserFromList(result.data.result));
      }
      setLoading(false);
      setTimeout(() => {
        setEditMode(false);
      }, 1000);
    } catch (error) {
      if (avatarFile) {
        toast.error('Error changing avatar');
        console.log('Error changing avatar:', error);
      } else {
        toast.error('Error saving data');
        console.log('Error saving data:', error);
      }
    }
  };

  const handleSavePasswordClick = async () => {
    if (!id) {
      return;
    }

    const { newPassword, confirmPassword } = userData;
    if (newPassword === confirmPassword) {
      const data: UpdatePasswordData = {
        user_password: newPassword,
        user_password_repeat: confirmPassword,
      };

      try {
        await api.updateUserPassword(id, data);
        toast.success('Password successfully changed');
        setTimeout(() => {
          setEditMode(false);
        }, 1000);
      } catch (error) {
        toast.error('Error changing password');
        console.log('Error changing password:', error);
      }
    } else {
      toast.error('Passwords do not match');
    }
  };

  const handleAddLink = () => {
    setUserData((prevData) => ({
      ...prevData,
      links: [...prevData.links, ''],
    }));
  };

  const handleRemoveLink = (index: number) => {
    setUserData((prevData) => {
      const updatedLinks = [...prevData.links];
      updatedLinks.splice(index, 1);
      return {
        ...prevData,
        links: updatedLinks,
      };
    });
  };

  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  if (user === null) {
    return <div className={styles.message}>Data not found</div>;
  }

  const { avatarFile, firstName, lastName, status, city, phone, links, newPassword, confirmPassword } = userData;

  return (
    <div className={styles.userProfile}>
      <div className={styles.card}>
      {id == MyId && (

        <div className={styles.options} onClick={handleOptionsClick} ref={optionsRef}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          {showOptions && (
            <DropdownMenu
              handleEditClick={handleEditClick}
              handleChangePasswordClick={handleChangePasswordClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </div>
        )}
        {editMode ? (
          <EditForm
            avatarFile={avatarFile}
            user={user}
            firstName={firstName}
            lastName={lastName}
            status={status}
            city={city}
            phone={phone}
            links={links}
            anonimus={anonimus}
            handleAvatarClick={handleAvatarClick}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleStatusChange={handleStatusChange}
            handleCityChange={handleCityChange}
            handlePhoneChange={handlePhoneChange}
            handleLinkChange={handleLinkChange}
            handleRemoveLink={handleRemoveLink}
            handleAddLink={handleAddLink}
            handleSaveDataClick={handleSaveDataClick}
            handleCancelClick={handleCancelClick}
          />
        ) : changePassword ? (
          <ChangePassword
            avatarFile={avatarFile}
            user={user}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            anonimus={anonimus}
            handleNewPasswordChange={handleNewPasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            handleSavePasswordClick={handleSavePasswordClick}
            handleCancelClick={handleCancelClick}
          />
        ) : (
          <Card
            user={user}
            anonimus={anonimus}
          />
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

const DropdownMenu = (props: DropdownMenuProps) => {
  const { handleEditClick, handleChangePasswordClick, handleDeleteClick } = props;

  return (
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
  );
}

const EditForm = (props: EditFormProps) => {

  const {
    avatarFile,
    user,
    firstName,
    lastName,
    status,
    city,
    phone,
    links,
    anonimus,
    handleAvatarClick,
    handleFirstNameChange,
    handleLastNameChange,
    handleStatusChange,
    handleCityChange,
    handlePhoneChange,
    handleLinkChange,
    handleRemoveLink,
    handleAddLink,
    handleSaveDataClick,
    handleCancelClick
  } = props;

  return (
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
        <div className={styles.formField}>
          <label htmlFor="links">Links:</label>
          {links.length > 0 && (
            <div>
              {links.map((link, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={link}
                    onChange={(event) => handleLinkChange(event, index)}
                  />
                  <button
                    className={styles.link_removeButton}
                    onClick={() => handleRemoveLink(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className={styles.link_addButton} onClick={handleAddLink}>
            Add Link
          </button>
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
  );
}

const ChangePassword = (props: ChangePasswordProps) => {
  const {
    avatarFile,
    user,
    newPassword,
    confirmPassword,
    anonimus,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSavePasswordClick,
    handleCancelClick
  } = props;

  return (
    <div className={styles.editForm}>
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
  );
}

type CardProps = {
  user: UserProfile;
  anonimus: string;
};

const Card = ({ user, anonimus }: CardProps) => {
  return (
    <div>
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
        <div className={styles.links}>
          <span className={styles.label}>Links:</span>
          {user.user_links?.map((link, _index) => (
            <a href={link} key={link}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
