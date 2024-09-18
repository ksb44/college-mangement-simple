"use client"
import { useState } from 'react';
import { toast } from 'react-toastify';

const NewFacultyPage = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const faculty = { name, department, email };

        try {
            const response = await fetch('/api/faculty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(faculty),
            });

            if (response.ok) {
                toast.success("Faculty added successfully!");
                setName('');
                setDepartment('');
                setEmail('');
            } else {
                toast.error('Failed to add faculty.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-purple-300 to-indigo-300 min-h-screen animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Add New Faculty</h1>
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
                    <label className="block text-gray-700">Department</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
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

export default NewFacultyPage;
