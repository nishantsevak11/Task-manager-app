import { NextResponse } from "next/server";
import { connectDB } from "../../db/connection";
import Task from "../../db/models/task.js";

export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 }); // Sort by latest first
    
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching tasks", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const task = await Task.create(data);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "Error creating task", error }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id, ...data } = await req.json();
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "Error updating task", error }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting task", error }, { status: 500 });
  }
}