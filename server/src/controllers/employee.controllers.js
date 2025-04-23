import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Employee} from "../models/employee.models.js";
import {Transaction} from "../models/transaction.models.js";

export const addEmployee = asyncHandler(async (req, res) => {
  const { name, employeeId } = req.body;

  const employee = await Employee.create({ name, employeeId });

  if (!employee) {
    throw new ApiError(500, "Failed to create employee.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, employee, "Employee created successfully"));
});

export const addTransaction = asyncHandler(async (req, res) => {
  const { employeeId, type, amount, date } = req.body;

  const employee = await Employee.findOne({ employeeId });

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  const transaction = await Transaction.create({
    employee: employee._id,
    type,
    amount,
    date,
  });

  if (!transaction) {
    throw new ApiError(500, "Failed to record transaction");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, transaction, "Transaction recorded successfully"));
});

export const getOutstandingReport = asyncHandler(async (req, res) => {
  const employees = await Employee.find();

  const report = await Promise.all(
    employees.map(async (emp) => {
      const transactions = await Transaction.find({ employee: emp._id });

      let collection = 0;
      let deposit = 0;
      let recentDate = null;

      transactions.forEach((tx) => {
        if (tx.type === "collection") collection += tx.amount;
        else deposit += tx.amount;

        if (!recentDate || tx.date > recentDate) {
          recentDate = tx.date;
        }
      });

      return {
        employeeId: emp.employeeId,
        name: emp.name,
        netCollection: collection,
        totalDeposit: deposit,
        difference: collection - deposit,
        recentTransactionDate: recentDate,
      };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, report, "Outstanding report generated successfully"));
});

export const getEmployeeReport = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  console.log(employeeId);

  const employee = await Employee.findOne({ employeeId });

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  const transactions = await Transaction.find({ employee: employee._id }).sort({ date: 1 });

  let collectionQueue = [];
  let report = [];

  for (let tx of transactions) {
    if (tx.type === "collection") {
      collectionQueue.push({ ...tx._doc, remaining: tx.amount });
    } else if (tx.type === "deposit") {
      let remaining = tx.amount;
      while (remaining > 0 && collectionQueue.length > 0) {
        let current = collectionQueue[0];
        let diff = Math.min(current.remaining, remaining);

        report.push({
          employeeId: employee.employeeId,
          name: employee.name,
          collectionAmount: current.amount,
          collectionDate: current.date,
          depositAmount: diff,
          depositDate: tx.date,
          difference: current.amount - diff,
        });

        current.remaining -= diff;
        remaining -= diff;

        if (current.remaining === 0) {
          collectionQueue.shift();
        }
      }
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, report, "Employee report generated successfully"));
});
