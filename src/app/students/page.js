"use client"
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

const StudentsPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/students');
                if (!response.ok) throw new Error('Failed to fetch students');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                toast.error('Failed to load students.');
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="p-6 bg-gradient-to-r from-gray-200 to-gray-400 min-h-screen animate-fade-in">
            <h1 className="text-3xl font-bold mb-4">Students</h1>
            <Link href="/students/new" className="border-2 p-2 rounded-xl mb-8 bg-white text-blue-800 hover:bg-gray-100 transition-transform transform hover:scale-105">Add Student</Link>
            <table className="min-w-full bg-white shadow-lg rounded-lg mt-4">
                <thead className="bg-gray-200 text-gray-800">
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Roll No</th>
                        <th className="py-2 px-4 border-b">Course</th>
                        <th className="py-2 px-4 border-b">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id} className="transition-transform transform hover:scale-105 hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{student.name}</td>
                            <td className="py-2 px-4 border-b">{student.rollNo}</td>
                            <td className="py-2 px-4 border-b">{student.course}</td>
                            <td className="py-2 px-4 border-b">{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsPage;
