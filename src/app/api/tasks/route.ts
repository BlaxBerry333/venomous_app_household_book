import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error creating tasks" },
      { status: 500 }
    );
  }
}
