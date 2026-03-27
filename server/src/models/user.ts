import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface Iuser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isMatched(password: string): Promise<boolean>;
}

const userSchema = new Schema<Iuser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isMatched = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<Iuser>("user", userSchema);
export default User;
