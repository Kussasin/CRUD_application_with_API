import Table from "../../Components/Table/Table";
import styles from "./UsersList.module.scss";
import api from '../../Api/Instance';
import { useState, useEffect } from 'react';

const UsersList = () => {
  const [userList, setUserList] = useState([]);
  
  useEffect(() => {
    api.getUsers()
      .then((response) => {
        setUserList(response.data.result.users);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className={styles.container}>
      <Table data={userList} />
    </main>
  );
};

export default UsersList;
