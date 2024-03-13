import React, { useState } from 'react';
import { TableHeadProps } from '../interfaces';

const TableHead: React.FC<TableHeadProps> = ({columns, onSortClick}) => {
    const [isAsc, setIsAsc] = useState(false);

    const sortClick = (sortBy: string) => {
        onSortClick(sortBy, isAsc);
        setIsAsc(!isAsc);
    }

    return (
        <thead>
            <tr>
                {columns.map((column, idx) => (
                    column.sortBy ?
                    <th scope="col" key={idx}>{column.name} <button onClick={() => sortClick(column.sortBy as string)}>sort</button></th>
                    :
                    <th scope="col" key={idx}>{column.name}</th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
