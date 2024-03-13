import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from './Filters';
import List from './List';
import { ListItem } from '../interfaces';

const ReservationsView: React.FC = () => {
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
        } if (key === 'businessDate') { 
            // @ts-ignore: Unreachable code error
            if (filters[key] !== null && item[key as keyof typeof item] !== filters[key]) {
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
      <List tableData={filteredData} onApplySort={applySort} />
    </div>
  );
};

export default ReservationsView;
