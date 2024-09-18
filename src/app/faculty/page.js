"use client"
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FacultyPage = () => {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await fetch('/api/faculty');
                if (!response.ok) throw new Error('Failed to fetch faculty');
                const data = await response.json();
                setFaculty(data);
            } catch (error) {
                toast.error('Failed to load faculty.');
            }
        };

        fetchFaculty();
    }, []);

    return (
        <div className="p-6 bg-gradient-to-r from-green-200 to-yellow-200 min-h-screen animate-fade-in">
            <h1 className="text-3xl font-bold mb-4">Faculty</h1>
            <table className="min-w-full bg-white shadow-lg rounded-lg mt-4">
                <thead className="bg-gray-200 text-gray-800">
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Department</th>
                        <th className="py-2 px-4 border-b">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {faculty.map((facultyMember) => (
                        <tr key={facultyMember._id} className="transition-transform transform hover:scale-105 hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{facultyMember.name}</td>
                            <td className="py-2 px-4 border-b">{facultyMember.department}</td>
                            <td className="py-2 px-4 border-b">{facultyMember.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyPage;
