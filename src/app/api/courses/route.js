import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Course from '../../../models/Course';

export async function GET() {
    await dbConnect();
    try {
        const courses = await Course.find({});
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.error(error.message);
    }
}

export async function POST(request) {
    await dbConnect();
    const data = await request.json();
    try {
        const course = new Course(data);
        await course.save();
        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        return NextResponse.error(error.message);
    }
}
