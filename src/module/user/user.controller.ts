import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

export const toggleBlockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const action = req.params.action; // "block" or "unblock"

  const isBlocked = action === 'block'; // Determine the block status based on action
  const result = await userService.updateBlockStatus(userId, isBlocked);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: `User ${action}ed successfully`,
    data: result,
  });
});

export const userController = {
  toggleBlockUser,
};
