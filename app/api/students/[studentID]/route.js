import connectDB from "../../../../lib/mongoose";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const studentID = params.studentID;

    if (!studentID) {
      return NextResponse.json({ message: "Student ID is required" }, { status: 400 });
    }

    const deletedStudent = await Student.findOneAndDelete({ studentID });

    if (!deletedStudent) {
      return NextResponse.json({ message: "Student not exists" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json({ message: "Server error occurred", error: error.message }, { status: 500 });
  }
}
