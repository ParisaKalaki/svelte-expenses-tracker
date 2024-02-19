import { Schema, model, mongoose } from "mongoose";

const now = new Date().getTime();

const TransactionSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    default: now,
  },
});

// TransactionSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

export default model("Transaction", TransactionSchema);
