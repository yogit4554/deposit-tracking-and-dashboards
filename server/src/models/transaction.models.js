import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  type: { type: String, enum: ['collection', 'deposit'] },
  amount: Number,
  date: Date,
});

export const Transaction = mongoose.model('Transaction', transactionSchema);