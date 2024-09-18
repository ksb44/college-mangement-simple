import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const students = await Student.find({});
        return NextResponse.json(students);
    } catch (error) {
  
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    const data = await request.json();
    try {
        const student = new Student(data);
        await student.save();
        return new NextResponse(JSON.stringify(student), { status: 201 });
    } catch (error) {
       
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
