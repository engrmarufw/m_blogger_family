import { User } from './user.interface';
import UserModel from './user.model';

export const updateBlockStatus = async (
  id: string,
  isBlocked: boolean,
): Promise<User | null> => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    { isBlocked },
    { new: true },
  );
  return result;
};

export const userService = {
  updateBlockStatus,
};
