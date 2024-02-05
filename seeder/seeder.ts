import Room from "../backend/models/room";
import { rooms } from "./data";
import mongoose from "mongoose";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/book-it");
    await Room.deleteMany();
    console.log("Rooms has been deleted");

    await Room.insertMany(rooms);
    console.log("New rooms has been inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
