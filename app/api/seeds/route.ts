import { getErrorResponse } from "@/lib/helpers";
import { Seed } from "@/prisma/seeds/run-seed";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  if (process.env.NODE_ENV !== "development") {
    return getErrorResponse(`/${req.nextUrl.pathname} path not exist.`, 404);
  }
  await Seed();
  return NextResponse.json(
    {
      message: "Data seeded successfully.",
    },
    { status: 200 }
  );
}
