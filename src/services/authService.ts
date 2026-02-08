import jwt from "jsonwebtoken";
import User, { IUserDocument } from "../models/user";
import { CreateUserDTO } from "../dto/userDTO.dto";

class AuthService {
  async register(data: CreateUserDTO){
    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      throw new Error("Email already in use");
    }

    return User.create(data);
  }

  async login(email: string, password: string){
    const user = (await User.findOne({ email })) as IUserDocument;
    if(!user){
      throw new Error("Invalid email or password");
    }

    const isValid = await user.comparePassword(password);
    if(!isValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { user, token };
  }

  async getProfile(email: string){
    return User.findOne({ email }).select("-password");
  }
}

export const authService = new AuthService();