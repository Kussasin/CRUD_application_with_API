import React from "react";
import styles from "./Table.module.scss";
import { TableProps } from "../../Types/Types";

const Table: React.FC<TableProps> = ({ data }) => {
    if (!data.length) {
        return <div>No data available</div>;
    }

    const headers = Object.keys(data[0]);

    const renderCard = (item: Record<string, string | number>, index: number) => {
        const card = headers.filter(element => item[element] && element !== "is_visible").map(element => {
            const isAvatar = element.includes("_avatar");
            const value = item[element].toString();
            return (
                <div key={element} className={isAvatar ? styles.cardImage : styles.cardData}>
                    {isAvatar
                        ? <img src={value} alt="Avatar" />
                        : (
                            <>
                                <div className={styles.cardLabel}>{element}</div>
                                <div className={styles.cardValue}>{value}</div>
                            </>
                        )
                    }
                </div>
            )
        });
        return <div key={index} className={styles.card}>{card}</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {data.map(renderCard)}
            </div>
        </div>
    );
};

export default Table;
