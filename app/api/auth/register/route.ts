import { registerUser } from "@/backend/controllers/authControllers";
import dbConnect from "@/backend/controllers/config/dbConnect";
import { register } from "module";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext{}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();


router.post(registerUser);



export async function POST(request: NextRequest, ctx: RequestContext ) {
    return router.run(request,ctx);
}
