"use client"
import { useState } from 'react';
import { toast } from 'react-toastify';

const NewCoursePage = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = { name, code };

        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course),
            });

            if (response.ok) {
                toast.success("Course added successfully!");
                setName('');
                setCode('');
            } else {
                toast.error('Failed to add course.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-indigo-300 to-blue-400 min-h-screen animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Add New Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Course Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Course Code</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
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

export default NewCoursePage;
