import { HydratedDocument, Model, Types } from "mongoose";

export type TFile = {
  user_id: Types.ObjectId;
  file_name: string;
  mime_type: string | null;
  size: number;
  s3_key: string | null;
  is_trashed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TFileModel = Model<TFile>;

export type TFileDocument = HydratedDocument<TFile>;
