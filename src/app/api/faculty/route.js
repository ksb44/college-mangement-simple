import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Faculty from '../../../models/Faculty';

export async function GET() {
    await dbConnect()
    try {
        const faculty = await Faculty.find({});
        return NextResponse.json(faculty);
    } catch (error) {
        return NextResponse.error(error.message);
    }
}

export async function POST(request) {
    await dbConnect();
    const data = await request.json();
    try {
        const facultyMember = new Faculty(data);
        await facultyMember.save();
        return NextResponse.json(facultyMember, { status: 201 });
    } catch (error) {
        return NextResponse.error(error.message);
    }
}
