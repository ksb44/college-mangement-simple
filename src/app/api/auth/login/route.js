import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request) {
    await dbConnect();
    const { username, password } = await request.json();

    try {
        const user = await User.findOne({ username });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
