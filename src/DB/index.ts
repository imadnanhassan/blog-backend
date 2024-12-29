import bcrypt from 'bcryptjs';
import User from '../module/user/user.model';

export const seedSuperAdmin = async () => {
  const admin = await User.findOne({ email: 'adnanhassan@gmail.com' });

  if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const newAdmin = new User({
      email: 'adnanhassan@gmail.com',
      name: 'Adnan Hassan',
      password: 'admin123',
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Admin er data paisi!');
  } else {
    console.log('Super admin already exists!');
  }
};
