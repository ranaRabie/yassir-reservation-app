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
                <th>{row.id}</th>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.start}</td>
                <td>{row.status}</td>
                <td>{row.shift}</td>
                <td>{row.area}</td>
            </tr>
        ))}    
        </tbody>
    );
};

export default TableBody;
