import mongoose from "mongoose";

import fileSchema from "../schemas/file.schema";
import { TFile, TFileModel } from "../../types/file.types";
import { FILE_MODEL_NAME } from "../../constants/model.constants";

const fileModel =
  (mongoose.models[FILE_MODEL_NAME] as TFileModel | undefined) ??
  mongoose.model<TFile, TFileModel>(FILE_MODEL_NAME, fileSchema);

export default fileModel;
