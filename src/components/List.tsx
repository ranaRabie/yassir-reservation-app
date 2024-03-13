import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from './Filters';

interface ListItem {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  customer: {
    firstName: string;
    lastName: string;
  };
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
    console.log(filters);
    let currentData = [...data];

    currentData = currentData.filter((item) => {
      for (let key in filters) {
        if (key === 'firstName' || key === 'lastName') {
          if (filters[key] !== null && item['customer'][key as keyof typeof item.customer].toLocaleLowerCase() !== filters[key].toLocaleLowerCase()) {
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


  return (
    <div className='container'>
      <Filters onSubmitFilters={applyFilters} onClearFilters={clearFilters} />
      
      <div className="card card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Shift</th>
                <th scope="col">Area</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.customer.firstName}</td>
                  <td>{item.customer.lastName}</td>
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
