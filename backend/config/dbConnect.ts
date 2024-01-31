import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  let DB_URI = "";

  switch (process.env.NODE_ENV) {
    case "development":
      DB_URI = process.env.DB_LOCAL_URI!;
      break;
    case "production":
      DB_URI = process.env.DB_URI!; // the ! bang sign tell typeScript is not going to be null/undefined
      break;
    default:
      DB_URI = process.env.DB_LOCAL_URI!;
      break;
  }

  await mongoose
    .connect(DB_URI)
    .then(() => console.log("DB connected successfully"));
};

export default dbConnect;
