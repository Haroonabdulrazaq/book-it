import { NextRequest } from "next/server";

type HandlerFunction = (req: NextRequest, params: any) => Promise<Response>;

/*
catchAsyncErrors: Is a function that wraps all our controller try block. and creates a 
global error message for all our controller, for uniformity and for code reuse;
Reference
Check Udemy -> Next Fullstack Apps with Next and TypeScript ->
      Section 7 -> Video 20 and 21
*/
export const catchAsyncErrors =
  (handler: HandlerFunction) => async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params);
    } catch (error: any) {
      return Response.json(
        {
          message: error.message,
        },
        { status: error.statusCode || 500 }
      );
    }
  };
