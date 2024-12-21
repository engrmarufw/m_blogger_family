import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { User } from './user.interface';

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

const UserModel = model<User>('User', userSchema);
export default UserModel;
