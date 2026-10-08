import mongoose from "mongoose";

import userSchema from "../schemas/user.schema";
import { TUser, TUserModel } from "../../types/user.types";
import { USER_MODEL_NAME } from "../../constants/model.constants";

const userModel =
  (mongoose.models[USER_MODEL_NAME] as TUserModel | undefined) ??
  mongoose.model<TUser, TUserModel>(USER_MODEL_NAME, userSchema);

export default userModel;
