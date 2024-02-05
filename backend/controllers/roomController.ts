import { NextRequest } from "next/server";
import Room from "../models/room";

export const allRooms = async (req: NextRequest) => {
  const rooms = await Room.find();
  return Response.json({ sucess: true, rooms });
};

export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return Response.json({
    Success: true,
    room,
  });
};
