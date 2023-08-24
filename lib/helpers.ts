import { NextResponse } from "next/server";

export function getEnvVariable(key: string): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.log(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export function getErrorResponse(
  error: string | null = null,
  status: number = 500
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      error: error ? error : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
