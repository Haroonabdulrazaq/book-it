import dbConnect from "@/backend/config/dbConnect";
import { newRoom } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestConntext {}

const router = createEdgeRouter<NextRequest, RequestConntext>();

dbConnect();

router.post(newRoom);
export async function POST(request: NextRequest, ctx: RequestConntext) {
  return router.run(request, ctx);
}
