import React from "react";
import styles from "./Table.module.scss";

interface TableProps {
    data: Record<string, string | number>[];
}

const Table: React.FC<TableProps> = ({ data }) => {

    if (data.length === 0) {
        return <div>No data available</div>;
    }

    const headers = Object.keys(data[0]);

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {data.map((item, index) => (
                    <div key={index} className={styles.card}>
                        {headers.map((header) => {
                            if (!item[header] || header === "is_visible") {
                                return null;
                            }

                            const isAvatar = header.includes("_avatar");
                            const value = item[header].toString();

                            return (
                                <div
                                    key={header}
                                    className={isAvatar ? styles.cardImage : styles.cardData}
                                >
                                    {isAvatar ? (
                                        <img src={value} alt="Avatar" />
                                    ) : (
                                        <>
                                            <div className={styles.cardLabel}>{header}</div>
                                            <div className={styles.cardValue}>{value}</div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;
