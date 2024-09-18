"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role })
            });
            const data = await res.json();
            
            if (res.ok) {
                router.push('/login');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="text-center p-6 bg-gradient-to-r from-teal-300 to-blue-500 text-white min-h-screen flex flex-col justify-center items-center animate-fade-in">
            <h1 className="text-4xl font-extrabold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full p-2 mb-4 rounded-lg bg-white text-black"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 mb-4 rounded-lg bg-white text-black"
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full p-2 mb-4 rounded-lg bg-white text-black"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-green-800 p-4 rounded-lg shadow-lg text-white hover:bg-green-900 transition-transform transform hover:scale-105">Sign Up</button>
            </form>
            <p className="mt-4">
                Already have an account? <a href="/login" className="underline">Login</a>
            </p>
        </div>
    );
}
