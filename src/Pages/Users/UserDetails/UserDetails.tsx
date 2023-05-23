import { useEffect, useState, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UserDetails.module.scss';
import { RootState, persistor } from '../../../Store/CounterStore';
import { UpdatePasswordData, UpdateUserInfoData, UserData, UserProfile } from '../../../Types/Types';
import { getUserFromList, removeToken, removeUser } from '../../../Store/thunks';
import api from '../../../Api/Instance';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';
import { DropdownMenu, EditForm, ChangePassword, Card } from '../../../Components/UserDetailComponents/UserDetailsComponents';

const UserDetail = () => {
  const dispatch = useDispatch();
  const anonimus = 'https://play-lh.googleusercontent.com/EotxkWC4dXajaesh2iVgdIB5-o6pINoas_k-z7nVjRGSu4k9QZwMZIcRNXyUWGn3rg';
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const MyId = useSelector((state: RootState) => state.user.user?.user_id);
  const { logout } = useAuth0();

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
          logout({ logoutParams: { returnTo: window.location.origin } });
          persistor.purge()
          dispatch(removeToken());
          dispatch(removeUser());
          toast.success("User successfully deleted");
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
    <main className={styles.userProfile}>
      <div className={styles.card}>
        {Number(id) === MyId && (

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
    </main>
  );
};

export default UserDetail;
