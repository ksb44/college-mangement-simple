"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch('/api/auth/verify', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                setIsAdmin(data.role === 'admin');

                await fetchStats();
                setLoading(false);
            } catch (error) {
                console.error('Error verifying user or fetching data:', error);
                router.push('/login');
            }
        };

        fetchData();
    }, [router]);

    const fetchStats = async () => {
        try {
            const [studentsRes, coursesRes, facultyRes] = await Promise.all([
                fetch('/api/students'),
                fetch('/api/courses'),
                fetch('/api/faculty')
            ]);
            const [students, courses, faculty] = await Promise.all([
                studentsRes.json(),
                coursesRes.json(),
                facultyRes.json()
            ]);

            setStats({
                students: students.length,
                courses: courses.length,
                faculty: faculty.length
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (loading) {
        return <div className="text-center p-6 bg-gradient-to-r from-teal-300 to-blue-500 text-white min-h-screen flex flex-col justify-center items-center animate-fade-in">Loading...</div>;
    }

    return (
        <div className="text-center p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen flex flex-col justify-center items-center animate-fade-in">
            <h1 className="text-4xl font-extrabold mb-4">Dashboard</h1>
            <p className="mb-8 text-lg">Manage the College Management System efficiently.</p>
            
            <div className="mb-8">
                <p className="text-lg font-semibold">System Overview:</p>
                <ul className="list-disc list-inside mt-4">
                    <li>Total Students: {stats.students || 'N/A'}</li>
                    <li>Total Courses: {stats.courses || 'N/A'}</li>
                    <li>Total Faculty: {stats.faculty || 'N/A'}</li>
                </ul>
            </div>

            {isAdmin && (
                <div className="flex space-x-4 mb-8">
                    <Link href="/students" className="bg-blue-800 p-4 rounded-lg shadow-lg hover:bg-blue-900 transition-transform transform hover:scale-105 text-white">Manage Students</Link>
                    <Link href="/courses" className="bg-green-800 p-4 rounded-lg shadow-lg hover:bg-green-900 transition-transform transform hover:scale-105 text-white">Manage Courses</Link>
                    <Link href="/faculty" className="bg-purple-800 p-4 rounded-lg shadow-lg hover:bg-purple-900 transition-transform transform hover:scale-105 text-white">Manage Faculty</Link>
                </div>
            )}

            <button onClick={handleLogout} className="bg-red-600 p-4 rounded-lg shadow-lg text-white hover:bg-red-700 transition-transform transform hover:scale-105">Logout</button>
        </div>
    );
}
