import dbConnect from "@/backend/controllers/config/dbConnect";
import {  getRoomDetails, updateRoom  } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext{
    params: {
        id: string;
    };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();


router.get("/api/rooms/:id" , async (req: NextRequest, ctx: RequestContext) => {
    const { id } = ctx.params;
    return getRoomDetails(req, { params: { id } });;
});



export async function GET(request: NextRequest, ctx: RequestContext ) {
    return router.run(request,ctx);
}
