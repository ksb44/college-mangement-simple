import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    course: { type: String, required: true },
    email: { type: String, required: true },
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
