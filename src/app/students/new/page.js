"use client"
import { useState } from 'react';
import { toast } from 'react-toastify';

const NewStudentPage = () => {
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const student = { name, rollNo, course, email };

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (response.ok) {
                toast.success("Student added successfully!");
                setName('');
                setRollNo('');
                setCourse('');
                setEmail('');
            } else {
                toast.error('Failed to add student.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-300 to-teal-300 min-h-screen animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Add New Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Roll No</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Course</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewStudentPage;
