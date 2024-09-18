import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.json({ role: decoded.role }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
