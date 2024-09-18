"use client"
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses');
                if (!response.ok) throw new Error('Failed to fetch courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                toast.error('Failed to load courses.');
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-6 bg-gradient-to-r from-yellow-100 to-orange-200 min-h-screen animate-fade-in">
            <h1 className="text-3xl font-bold mb-4">Courses</h1>
            <table className="min-w-full bg-white shadow-lg rounded-lg mt-4">
                <thead className="bg-gray-200 text-gray-800">
                    <tr>
                        <th className="py-2 px-4 border-b">Course Name</th>
                        <th className="py-2 px-4 border-b">Course Code</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id} className="transition-transform transform hover:scale-105 hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{course.name}</td>
                            <td className="py-2 px-4 border-b">{course.code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoursesPage;
