import connectDB from "../../../lib/mongoose";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

// Add a new student (POST)
export async function POST(request) {
  try {
    await connectDB(); // Connect to MongoDB

    // Extract data from the request body
    const { studentID, studentName, course, presentDate } = await request.json();

    // Validate required fields (return 400 if any field is missing)
    if (!studentID || !studentName || !course || !presentDate) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if student already exists (Prevent duplicate entries)
    const existingStudent = await Student.findOne({ studentID });
    if (existingStudent) {
      return NextResponse.json({ message: "Student already exists" }, { status: 409 });
    }

    // Create a new student instance
    const newStudent = new Student({
      studentID,
      studentName,
      course,
      presentDate,
    });

    await newStudent.save(); // Save student to MongoDB

    return NextResponse.json({ message: "Successful addition of student!", student: newStudent }, { status: 201 });
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json({ message: "Server error occurred", error: error.message }, { status: 500 });
  }
}

// Retrieve all student records (GET)
export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB

    const students = await Student.find(); // Fetch all student records

    console.log("Students:", students);

    return NextResponse.json({ message: "Students retrieved successfully!", students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ message: "Server error occurred", error: error.message }, { status: 500 });
  }
}

// Update a student record (PUT)
export async function PUT(request) {
  try {
    await connectDB(); // Connect to MongoDB

    const { studentID, studentName, course, presentDate } = await request.json(); // Extract JSON data from a request

    if (!studentID) {
      return NextResponse.json({ message: "Student ID is required" }, { status: 400 }); //If studentID is not found, return 400 error
    }

    // Find and update data based on studentID
    const updatedStudent = await Student.findOneAndUpdate(
      { studentID },
      { studentName, course, presentDate },
      { new: true }
    );

    // If the studentID does not exist in the database, return a 404 error.
    if (!updatedStudent) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    // Return a successful update response
    return NextResponse.json({ message: "Student updated successfully!", student: updatedStudent }, { status: 200 });
  } catch (error) {
    console.error("Error updating student:", error);

    // Return 500 response when server error occurs
    return NextResponse.json({ message: "Server error occurred", error: error.message }, { status: 500 });
  }
}

