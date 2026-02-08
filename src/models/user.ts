import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Interfaces

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidate: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findUserByEmail(email: string): Promise<IUserDocument | null>;
}

// Schema

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// Hooks

userSchema.pre<IUserDocument>("save", async function(){
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})

// Statics

userSchema.statics.findUserByEmail = function (email: string) {
  return this.findOne({ email });
}

// Methods

userSchema.methods.comparePassword = function (
  candidate: string
): Promise<boolean>{
  return bcrypt.compare(candidate, this.password);
};

// Model

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
