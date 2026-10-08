import mongoose from "mongoose";

import { TFile, TFileModel } from "../../types/file.types";
import { USER_MODEL_NAME } from "../../constants/model.constants";

const fileSchema = new mongoose.Schema<TFile, TFileModel>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
    file_name: {
      type: String,
      required: true,
      trim: true,
    },
    mime_type: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 0,
      min: 0,
    },
    s3_key: {
      type: String,
      default: null,
    },
    is_trashed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Listing a folder's contents is the hot query: user + parent folder.
fileSchema.index({ user_id: 1, parent_id: 1, is_trashed: 1 });

export default fileSchema;
