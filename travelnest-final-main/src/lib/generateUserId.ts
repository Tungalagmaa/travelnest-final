import User from '../app/models/User';

export async function generateUserId() {
  const lastUser = await User.findOne().sort({ createdAt: -1 });

  let next = 1;
  if (lastUser?.userId) {
    const lastNumber = parseInt(lastUser.userId.replace('TOUR', ''), 10);
    if (!isNaN(lastNumber)) next = lastNumber + 1;
  }

  const padded = next.toString().padStart(3, '0');
  return `TOUR${padded}`;
}
