import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [employeeData, setEmployeeData] = useState([]);
  const [summary, setSummary] = useState({ total: 0, deposit: 0, difference: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/v1/report/employee", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeData(res.data.data.records);
        setSummary(res.data.data.summary);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Employee Payment Report</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <p>Total Collection (MM)</p>
          <h2 className="text-xl font-semibold text-gray-700">₹{summary.total}</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p>Total Deposit Amount</p>
          <h2 className="text-xl font-semibold text-green-600">₹{summary.deposit}</h2>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p>Difference Amount</p>
          <h2 className="text-xl font-semibold text-red-600">₹{summary.difference}</h2>
        </div>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Location</th>
            <th className="p-2">Emp. ID</th>
            <th className="p-2">Emp. Name</th>
            <th className="p-2">Collections (MM)</th>
            <th className="p-2">Date</th>
            <th className="p-2">Cash Deposit</th>
            <th className="p-2">Deposit Date</th>
            <th className="p-2">Difference</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((emp, i) => (
            <tr key={i} className="text-center">
              <td className="p-2">{emp.location}</td>
              <td className="p-2">{emp.empId}</td>
              <td className="p-2">{emp.empName}</td>
              <td className="p-2">{emp.collection}</td>
              <td className="p-2">{emp.date}</td>
              <td className="p-2">{emp.deposit}</td>
              <td className="p-2">{emp.depositDate}</td>
              <td className="p-2">{emp.difference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
