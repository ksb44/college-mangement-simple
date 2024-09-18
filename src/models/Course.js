import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
