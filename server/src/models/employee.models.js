import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
});

export const Employee = mongoose.model('Employee', employeeSchema);