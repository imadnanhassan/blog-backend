import bcrypt from 'bcryptjs';
import User from '../module/user/user.model';
import { USER_ROLE } from '../module/user/user.constant';

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({ role: USER_ROLE.admin });
    if (!isSuperAdminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const adminUser = {
        id: '0001',
        name: 'Adnan Hassan',
        email: 'adnanhassan@gmail.com',
        password: hashedPassword,
        role: USER_ROLE.admin,
      };

      await User.create(adminUser);
      console.log('Admin seeded successfully.');
    } else {
      console.log('Admin already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

export default seedSuperAdmin;
