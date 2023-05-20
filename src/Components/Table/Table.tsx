import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.scss";
import { TableProps } from "../../Types/Types";

const Table: React.FC<TableProps> = ({ data, table_type }) => {
  const navigate = useNavigate();

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const headers = Object.keys(data[0]);

  const renderCard = (item: Record<string, string | number>) => {
    const card = headers
      .filter((element) => element !== "is_visible" && item[element])
      .map((element) => {
        const isAvatar = element.includes("_avatar");
        const value = item[element].toString();
        return (
          <div
            key={element}
            className={isAvatar ? styles.cardImage : styles.cardData}
          >
            {isAvatar ? (
              <img src={value} alt="Avatar" />
            ) : (
              <>
                <div className={styles.cardLabel}>{element}</div>
                <div className={styles.cardValue}>{value}</div>
              </>
            )}
          </div>
        );
      });
      const id = table_type === "user" ? item.user_id : item.company_id;
    return (
      <div
        key={id}
        className={styles.card}
        onClick={() => handleCardClick(id.toString())}
      >
        {card}
      </div>
    );
  };

  const handleCardClick = (id: string) => {
    navigate(`/${table_type}/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>{data.map(renderCard)}</div>
    </div>
  );
};

export default Table;
