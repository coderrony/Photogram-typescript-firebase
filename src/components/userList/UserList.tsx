import { useUserAuth } from '@/context/userAuthContext';
import { getAllUsers } from '@/repository/user.service';
import { ProfileResponse } from '@/types';
import { FC, useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar.png';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
interface UserListProps {
  className?: string;
}

const UserList: FC<UserListProps> = () => {
  const [suggestUser, setSuggestUser] = useState<ProfileResponse[]>([]);
  const { user } = useUserAuth();

  const getSuggestedUser = async (userId: string) => {
    const res = (await getAllUsers(userId)) || [];
    setSuggestUser(res);
  };

  useEffect(() => {
    if (user) {
      getSuggestedUser(user.uid);
    }
  }, [user]);

  const renderUsers = () => {
    return suggestUser.map(item => {
      return (
        <div
          key={item.id}
          className='flex flex-row items-center mb-4 border-gray-400 justify-start'>
          <span className='mr-2'>
            <img
              src={item.photoUrl ? item.photoUrl : avatar}
              className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'
            />
          </span>
          <span className='text-xs'>
            {item.displayName ? item.displayName : 'Guest_User'}
          </span>
          <Button className='text-xs p-3 py-2 h-6 bg-slate-900 last-of-type:ml-auto'>
            Follow
          </Button>
        </div>
      );
    });
  };

  return (
    <div className='text-white py-8 px-3'>
      <Link to='/profile'>
        <div className='flex flex-row items-center border-b pb-4 mb-4 border-gray-400 cursor-pointer'>
          <span className='mr-2'>
            <img
              src={user?.photoURL ? user.photoURL : avatar}
              className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'
            />
          </span>
          <span className='text-xs'>
            {user?.displayName ? user.displayName : 'Guest_user'}
          </span>
        </div>
      </Link>
      <h3 className='text-sm text-slate-300'>Suggested Friends</h3>
      <div className='my-4'>{suggestUser.length > 0 ? renderUsers() : ''}</div>
    </div>
  );
};

export default UserList;
