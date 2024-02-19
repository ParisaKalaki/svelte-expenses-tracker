import Router from "express";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions) {
      throw new Error("No transactions");
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  const { value, date } = req.body;
  const newTransaction = new Transaction({ value, date });
  try {
    const transaction = await newTransaction.save();
    if (!transaction) {
      throw new Error("There was an error saving the transaction");
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    const transaction = Transaction.findById(id);

    if (!transaction) {
      throw new Error("No transaction was found");
    }
    const removed = await transaction.deleteOne(
      new mongoose.Types.ObjectId(id)
    );
    console.log(removed);
    if (!removed) {
      throw new Error("There was a problem deleting the transaction");
    }
    res.status(200).json({ id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
