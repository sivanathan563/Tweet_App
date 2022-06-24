import Mongoose from "mongoose";

const userSchema = Mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String, required: true },
  contactNo: { type: String, required: true },
  password: { type: String, require: true },
  id: { type: String },
});

export default Mongoose.model("userDetails", userSchema);
