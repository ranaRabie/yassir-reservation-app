import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { ListItem } from '../interfaces';

interface ListProps {
  tableData: ListItem[];
  onApplySort: (sortBy: string, isAsc: boolean) => void;
}

const tableColumns = 
[
  {
    name: '#',
    sortBy: 'id'
  },
  {
    name: 'First Name',
    sortBy: 'firstName'
  },
  {
    name: 'Last Name',
    sortBy: 'lastName'
  },
  {
    name: 'Date'
  },
  {
    name: 'Status'
  },
  {
    name: 'Shift'
  },
  {
    name: 'Area'
  }

];
const List: React.FC<ListProps> = ({tableData, onApplySort}) => {
  const applySort = (sortBy: string, isAsc: boolean) => {
    onApplySort(sortBy, isAsc);
  }

  return (
    <div className="card card-body">
      <div className="table-responsive">
        <table className="table">
          <TableHead columns={tableColumns} onSortClick={applySort} />
          <TableBody rows={tableData} />
        </table>
      </div>
    </div>
  );
};

export default List;
