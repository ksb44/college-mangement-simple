"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="text-center p-6 bg-gradient-to-r from-teal-300 to-blue-500 text-white min-h-screen flex flex-col justify-center items-center animate-fade-in">
            <h1 className="text-4xl font-extrabold mb-4">Login</h1>
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
                <button type="submit" className="bg-blue-800 p-4 rounded-lg shadow-lg text-white hover:bg-blue-900 transition-transform transform hover:scale-105">Login</button>
            </form>
            <p className="mt-4">
                Don't have an account? <a href="/signup" className="underline">Sign Up</a>
            </p>
        </div>
    );
}
