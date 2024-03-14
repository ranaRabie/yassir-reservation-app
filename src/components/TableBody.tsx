import React from 'react';
import { ListItem } from '../interfaces';

interface TableBodyProps {
    rows: ListItem[];
}

const TableBody: React.FC<TableBodyProps> = ({rows}) => {
    return (
        <tbody>
        {rows.map((row, idx) => (
            <tr key={idx}>
                <td>{row.id}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.businessDate}</td>
                <td>{row.status}</td>
                <td>{row.shift}</td>
                <td>{row.area}</td>
            </tr>
        ))}    
        </tbody>
    );
};

export default TableBody;
