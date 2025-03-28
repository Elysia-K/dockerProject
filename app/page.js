'use client';

import React, { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    studentID: '',
    studentName: '',
    course: '',
    presentDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(formData.presentDate)) {
      alert('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to add student');
      alert('Student added successfully!');
      setFormData({ studentID: '', studentName: '', course: '', presentDate: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="studentID"
          value={formData.studentID}
          onChange={handleChange}
          placeholder="Student ID"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="presentDate"
          value={formData.presentDate}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Add Student
        </button>
      </form>
    </div>
  );
}