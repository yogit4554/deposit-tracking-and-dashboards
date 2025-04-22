import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="min-w-full text-sm text-gray-700 mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th>Location</th>
          <th>Emp. ID</th>
          <th>Emp. Name</th>
          <th>Collections (MM)</th>
          <th>Date</th>
          <th>Cash Deposit</th>
          <th>Deposit Date</th>
          <th>Difference</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b">
            {Object.values(row).map((val, i) => (
              <td key={i} className="p-2">{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
