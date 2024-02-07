import { NextRequest } from "next/server";
import Room, { IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";

interface IParams {
  params: { id: string };
}

//GET all rooms /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage = 8;
  const { searchParams } = new URL(req.url);
  const queryStr: any = {};

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });
  const roomsCount: number = await Room.countDocuments();
  const apiFilters = new APIFilters(Room, queryStr).search().filter();

  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomCount = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone();

  return Response.json({
    success: true,
    filteredRoomCount,
    roomsCount,
    resPerPage,
    rooms,
  });
});

//POST Create room /api/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return Response.json({
    Success: true,
    room,
  });
});

// GET room details /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: IParams) => {
    const room = await Room.findById(params.id);
    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }
    return Response.json({ success: true, room });
  }
);

//UPDATE a room /api/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: IParams) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, { new: true });

    return Response.json({
      success: true,
      room,
    });
  }
);

//DELETE a room /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: IParams) => {
    let room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }
    //Delete Associted Images with the room
    room = await Room.findByIdAndDelete(params.id);
    console.log(room);

    return Response.json({
      success: true,
      message: "Room has been deleted successfully",
    });
  }
);
