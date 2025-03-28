import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentID: { type: String, required: true, praimary: true },
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  presentDate: { type: String, required: true },
});

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;