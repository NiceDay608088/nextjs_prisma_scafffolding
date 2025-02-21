import { editUser } from "@/services/user-service";
import { getUserIdFromReq } from "@/utils/server-cookie-util";
import { resError_400, resError_500 } from "@/utils/server-response-error-util";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // validate path param
  const { id } = params;
  if (!id) {
    return resError_400("order id is missing");
  }

  // retrieve params.
  const { username, password } = await req.json();
  const userId = getUserIdFromReq(req);

  try {
    await editUser({ id: Number(userId), username, password });
    return NextResponse.json({}, { status: 200 });
  } catch (e: any) {
    return resError_500(e);
  }
}
