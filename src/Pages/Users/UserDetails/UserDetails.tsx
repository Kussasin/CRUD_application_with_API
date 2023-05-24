import { useEffect, useState, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UserDetails.module.scss';
import { RootState } from '../../../Store/CounterStore';
import { UserData, UserProfile } from '../../../Types/Types';
import { getUserFromList } from '../../../Store/thunks';
import api from '../../../Api/Instance';
import { useParams } from 'react-router-dom';
import { UserCard } from '../../../Components/UserDetailComponents/UserCard';
import { UserChangePassword } from '../../../Components/UserDetailComponents/UserChangePassword';
import { UserEditForm } from '../../../Components/UserDetailComponents/UserEditForm';
import { UserDropdownMenu } from '../../../Components/UserDetailComponents/UserDropdownMenu';


const UserDetail = () => {
  const dispatch = useDispatch();
  const anonimus = 'https://play-lh.googleusercontent.com/EotxkWC4dXajaesh2iVgdIB5-o6pINoas_k-z7nVjRGSu4k9QZwMZIcRNXyUWGn3rg';
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [userExist, setUserExist] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
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
        if (error.response && error.response.status === 404) {
          setUserExist(false);
          console.log("User does not exist");
        } else {
          console.log("Error fetching company:", error);
        }
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

  if (!userExist) {
    return <div className={styles.message}>User does not exist </div>;
  }

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
              <UserDropdownMenu
                id={id as string}
                setEditMode={setEditMode}
                setChangePassword={setChangePassword}
              />
            )}
          </div>
        )}
        {editMode ? (
          <UserEditForm
            avatarFile={avatarFile}
            user={user}
            firstName={firstName}
            lastName={lastName}
            status={status}
            city={city}
            phone={phone}
            links={links}
            anonimus={anonimus}
            setUserData = {setUserData}
            setEditMode = {setEditMode}
            setChangePassword = {setChangePassword}
            id = {id as string}
            setLoading = {setLoading}
          />
        ) : changePassword ? (
          <UserChangePassword
            avatarFile={avatarFile}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            anonimus={anonimus}
            id={id as string}
            setEditMode={setEditMode}
            setChangePassword={setChangePassword}
            setUserData = {setUserData}
            userData = {userData}
            user = {user}
            
          />
        ) : (
          <UserCard
            user={user}
            anonimus={anonimus}
          />
        )}
      </div>
    </main>
  );
};

export default UserDetail;
