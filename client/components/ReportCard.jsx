import React from 'react';

const ReportCard = ({ icon, label, value, color }) => {
  return (
    <div className="bg-white shadow p-4 rounded w-[180px] text-center border-l-4" style={{ borderColor: color }}>
      <div className="text-lg font-medium">{label}</div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
    </div>
  );
};

export default ReportCard;
