import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
});

export default mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
