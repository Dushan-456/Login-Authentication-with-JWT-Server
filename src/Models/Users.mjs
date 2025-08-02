import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email address"],
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^(?:\+94|0)?7\d{8}$/, "Invalid Sri Lankan mobile number"],
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
}, {
  timestamps: true,
});

const Users = mongoose.model('RegUsers', userSchema);

export default Users;
