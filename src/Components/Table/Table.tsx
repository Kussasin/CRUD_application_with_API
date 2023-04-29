import React from "react";
import styles from "./Table.module.scss";

interface TableProps {
    data: { [key: string]: string | number }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    const headers = Object.keys(data[0]);

    return (
        <div className={styles.container}>
            <table >
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header) => (
                                <td key={header}>{item[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
