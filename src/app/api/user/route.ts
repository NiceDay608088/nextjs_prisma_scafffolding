import { deleteUsers, listUsers } from "@/services/userService";
import { resError_400, resError_500 } from "@/utils/server-response-error-util";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  username: z.string(),
  currentPage: z.preprocess((val) => Number(val), z.number().min(1)),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  console.log(searchParams);

  let validatedParams;
  try {
    validatedParams = querySchema.parse({
      username: searchParams.get("username"),
      currentPage: searchParams.get("currentPage"),
    });
  } catch (error: any) {
    return resError_400(JSON.stringify(error.errors));
  }

  console.log(validatedParams);

  try {
    const pagingUsers = await listUsers({ ...validatedParams });
    return NextResponse.json({ ...pagingUsers });
  } catch (error: any) {
    return resError_500("Failed to fetch user");
  }
}

export async function DELETE(req: Request) {
  const { ids, username, currentPage } = await req.json();
  console.log("delete users", { ids, username, currentPage });

  try {
    await deleteUsers({ ids, username, currentPage });
    const pagingUsers = await listUsers({ username, currentPage });
    return NextResponse.json({ ...pagingUsers });
  } catch (error: any) {
    console.log(error);
    return resError_500("Failed to fetch user");
  }
}
