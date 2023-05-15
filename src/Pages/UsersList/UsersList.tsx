import Table from "../../Components/Table/Table";
import styles from "./UsersList.module.scss";
import api from '../../Api/Instance';
import { useState, useEffect } from 'react';
import { setUsers } from "../../Store/thunks";
import { useDispatch } from "react-redux";
import { UserList } from "../../Types/Types";

const UsersList = () => {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    api.getUsers()
      .then((response) => {
        setUserList(response.data.result.users);
        const users: UserList = {
          users: response.data.result.users,
          user_by_id: response.data.result.users,
        };
        dispatch(setUsers(users));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);
  
  return (
    <main className={styles.container}>
      <Table data={userList} table_type="user" />
    </main>
  );
};

export default UsersList;
