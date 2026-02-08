import { Types } from "mongoose";
import User, { IUserDocument } from "../models/user";
import { CreateUserDTO, UpdateUserDTO } from "../dto/userDTO.dto";

class UserService {
  async getAll(){
    return User.find().select("-password");
  }

  async create(data: CreateUserDTO){
    return User.create(data);
  }

  async getById(id: string){
    if(!Types.ObjectId.isValid(id)){
      throw new Error("Invalid user id");
    }

    return User.findById(id).select("-password");
  }

  async update(id: string, data: UpdateUserDTO){
    if(data.password){
      // dispara hook de hash
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");

      Object.assign(user, data);
      return user.save();
    }

    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-password");
  }

  async delete(id: string){
    return User.findByIdAndDelete(id);
  }
}

export const userService = new UserService();