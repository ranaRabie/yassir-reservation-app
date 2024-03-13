import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from './Filters';
import TableHead from './TableHead';

interface ListItem {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  firstName: string;
  lastName: string;
  area: string;
  guestNotes: string;
}

// enum status {
//   CONFIRMED = "CONFIRMED",
//   SEATED = "SEATED",
//   CHECKED_OUT = "CHECKED OUT", 
//   NOT_CONFIRMED = "NOT CONFIRMED"
// }

// enum shift {
//   DINNER = "DINNER",
//   LUNCH = "LUNCH", 
//   BREAKFAST = "BREAKFAST"
// }
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
const List: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([]);
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3030/reservations')
      .then(function (response) {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(function (error) {
        alert('some error occured');
      })
      .finally(function () {
      });
  }, []);

  const applyFilters = (filters: any) => {
    let currentData = [...data];

    currentData = currentData.filter((item) => {
      for (let key in filters) {
        if (key === 'firstName' || key === 'lastName') {
          // @ts-ignore: Unreachable code error
          if (filters[key] !== null && item[key as keyof typeof item].toLocaleLowerCase() !== filters[key].toLocaleLowerCase()) {
            return false;
          }
        } else if (filters[key] !== null && item[key as keyof typeof item] !== filters[key]) {
          return false;
        }
      }
      return true;
    });

    setFilteredData(currentData);
  }

  const clearFilters = () => {
    setFilteredData(data);
  }

  const applySort = (sortBy: string, isAsc: boolean) => {
    if (sortBy) {
      let sorted = [...filteredData]
      
      sorted = sorted.sort((a, b) => {
          // @ts-ignore: Unreachable code error
          if (a[sortBy] === null) return 1;
          // @ts-ignore: Unreachable code error
          if (b[sortBy] === null) return -1;
          // @ts-ignore: Unreachable code error
          if (a[sortBy] === null && b[sortBy] === null) return 0;
          return (
            // @ts-ignore: Unreachable code error
            a[sortBy].toString().localeCompare(b[sortBy].toString(), "en", {
            numeric: true,
            }) * (isAsc ? 1 : -1)
          );
      });

      setFilteredData(sorted);
    }
  }


  return (
    <div className='container'>
      <Filters onSubmitFilters={applyFilters} onClearFilters={clearFilters} />
      
      <div className="card card-body">
        <div className="table-responsive">
          <table className="table">
            <TableHead columns={tableColumns} onSortClick={applySort} />
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.start}</td>
                  <td>{item.status}</td>
                  <td>{item.shift}</td>
                  <td>{item.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
