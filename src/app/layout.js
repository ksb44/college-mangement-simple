"use client";
import { ToastContainer } from 'react-toastify';
import './globals.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('/api/auth/verify', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await response.json();
                    if (data.role === 'admin') {
                        setIsAuthenticated(true);
                        setIsAdmin(true);
                    } else {
                        setIsAuthenticated(true);
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
        router.push('/login');
    };

    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                <header className="bg-blue-600 text-white p-4 shadow-md">
                    <nav className="container mx-auto flex justify-between items-center">
                        <h1 className="text-xl font-bold">College Management System</h1>
                        <ul className="flex space-x-4">
                            {isAuthenticated ? (
                                <>
                                    {isAdmin ? (
                                        <>
                                            <li><Link href="/students" className="hover:underline">Students</Link></li>
                                            <li><Link href="/students/new" className="hover:underline">Add Student</Link></li>
                                            <li><Link href="/courses" className="hover:underline">Courses</Link></li>
                                            <li><Link href="/courses/new" className="hover:underline">Add Course</Link></li>
                                            <li><Link href="/faculty" className="hover:underline">Faculty</Link></li>
                                            <li><Link href="/faculty/new" className="hover:underline">Add Faculty</Link></li>
                                            <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link href="/students" className="hover:underline">View Students</Link></li>
                                            <li><Link href="/courses" className="hover:underline">View Courses</Link></li>
                                            <li><Link href="/faculty" className="hover:underline">View Faculty</Link></li>
                                            <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <li><Link href="/login" className="hover:underline">Login</Link></li>
                                    <li><Link href="/signup" className="hover:underline">Sign Up</Link></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </header>
                <main className="flex-grow container mx-auto p-6">
                    {children}
                    <ToastContainer />
                </main>
                <footer className="bg-gray-200 text-black p-4 text-center shadow-md">
                    <p>&copy; 2024 College Management System</p>
                </footer>
            </body>
        </html>
    );
}
