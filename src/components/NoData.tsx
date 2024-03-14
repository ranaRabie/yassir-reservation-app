import React from 'react';

const NoData: React.FC = () => {

  return (
    <div className="card card-body no-data-card">
        <span className="material-icons material-symbols-outlined">block</span>
        <p className="h3">No data</p>
        <p>Please adjust your search to see some results</p>
    </div>
  );
};

export default NoData;
