import Table from "../../Components/Table/Table";
import styles from "./UsersList.module.scss";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

const userList: User[] = [
  { id: 1, firstName: "Иван", lastName: "Иванов", age: 25, email: "ivanov@gmail.ru" },
  { id: 2, firstName: "Анна", lastName: "Петрова", age: 32, email: "petrova@gmail.ru" },
  { id: 3, firstName: "Петр", lastName: "Сидоров", age: 43, email: "sidorov@gmail.ru" },
  { id: 4, firstName: "Иван", lastName: "Сидоров", age: 35, email: "i.sidorov@gmail.ru" },
];

const UsersList = () => {

  const userListProps = userList.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email
    }
  });

  return (
    <main className={styles.container}>
      <Table data={userListProps} />
    </main>
  );
};

export default UsersList;
