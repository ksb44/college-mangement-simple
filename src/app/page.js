"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch('/api/auth/verify', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            const { authenticated, role } = await res.json();

            if (authenticated && role === 'admin') {
                router.push('/dashboard');
            }
        };
        
        checkAuth();
    }, [router]);

    return (
        <div className="text-center p-6 bg-gradient-to-r from-teal-300 to-blue-500 text-white min-h-screen flex flex-col justify-center items-center animate-fade-in">
            <h1 className="text-4xl font-extrabold mb-4">Welcome to the College Management System</h1>
            <p className="mb-8 text-lg">Manage students, courses, and faculty easily and efficiently.</p>
            <div className="flex space-x-4">

            </div>
        </div>
    );
};

export default HomePage;
