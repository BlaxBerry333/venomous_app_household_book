import { type NextRequest, NextResponse } from "next/server";
import type {} from "next/dist/server/web/types";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();
    const { completed } = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
