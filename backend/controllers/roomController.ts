import { NextRequest } from "next/server";
import Room from "../models/room";

interface IParams {
  params: { id: string };
}

//GET all rooms /api/rooms
export const allRooms = async (req: NextRequest) => {
  const rooms = await Room.find();
  return Response.json({ sucess: true, rooms });
};

//POST Create room /api/rooms
export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return Response.json({
    Success: true,
    room,
  });
};

// GET room details /api/rooms/:id
export const getRoomDetails = async (req: NextRequest, { params }: IParams) => {
  const room = await Room.findById(params.id);
  if (!room) {
    return Response.json({ message: "Room not found" }, { status: 404 });
  }
  return Response.json({ success: true, room });
};

//UPDATE a room /api/rooms/:id

export const updateRoom = async (req: NextRequest, { params }: IParams) => {
  let room = await Room.findById(params.id);
  const body = await req.json();

  if (!room) {
    return Response.json(
      {
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  room = await Room.findByIdAndUpdate(params.id, body, { new: true });

  return Response.json({
    success: true,
    room,
  });
};

export const deleteRoom = async (req: NextRequest, { params }: IParams) => {
  let room = await Room.findById(params.id);
  // const body = await req.json();

  if (!room) {
    return Response.json(
      {
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  room = await Room.findByIdAndDelete(params.id);
  console.log(room);

  return Response.json({
    success: true,
    room,
  });
};
