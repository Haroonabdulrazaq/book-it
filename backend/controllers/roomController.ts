import { NextRequest } from "next/server";
import Room from "../models/room";
import { Source_Sans_3 } from "next/font/google";

export const allRooms = async (req: NextRequest) => {
  return Response.json({ message: "Ghulam is trying!" });
};

export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return Response.json({
    Success: true,
    room,
  });
};
