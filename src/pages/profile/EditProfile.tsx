import FileUploader from '@/components/fileUploader/FileUploader';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PhotoMeta, ProfileInfo, UserProfile } from '@/types';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import avatar from '@/assets/images/avatar.png';
import { useUserAuth } from '@/context/userAuthContext';
import {
  createUserProfile,
  updateUserProfile,
} from '@/repository/user.service';
import { updateUserInfoOnPost } from '@/repository/post.service';
interface EditProfileProps {
  className?: string;
}

const EditProfile: FC<EditProfileProps> = () => {
  const [fileEntry, setFileEntry] = useState<PhotoMeta[]>([]);
  const { user, updateProfileInfo } = useUserAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const { id, userId, userBio, displayName, photoUrl } = location.state;
  const [data, setData] = useState<UserProfile>({
    userId,
    userBio,
    displayName,
    photoUrl,
  });

  console.log(id);

  const updateProfile = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUserProfile(id, data);
      } else {
        await createUserProfile(data);
      }
      const profileInfo: ProfileInfo = {
        user: user!,
        displayName: data.displayName,
        photoUrl: data.photoUrl,
      };
      updateProfileInfo(profileInfo);

      updateUserInfoOnPost(profileInfo);

      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (fileEntry.length > 0) {
      setData({ ...data, photoUrl: fileEntry[0].cdnUrl || '' });
    }
  }, [fileEntry]);

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='border max-w-3xl w-full'>
          <h3 className='bg-slate-800 text-white text-center text-lg p-2'>
            Edit Profile
          </h3>
          <div className='p-8'>
            <form onSubmit={updateProfile}>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='caption'>
                  Profile Picture
                </Label>

                <div className='flex flex-col space-y-4 '>
                  {fileEntry.length > 0 ? (
                    <img
                      src={fileEntry[0].cdnUrl}
                      alt='avatar'
                      className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover'
                      onError={e => {
                        e.currentTarget.src = avatar; // Use a default avatar if the image fails to load
                      }}
                    />
                  ) : (
                    <img
                      src={photoUrl}
                      alt='avatar'
                      className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover'
                      onError={e => {
                        e.currentTarget.src = avatar; // Use a default avatar if the image fails to load
                      }}
                    />
                  )}

                  <FileUploader
                    fileEntry={fileEntry}
                    setFileEntry={setFileEntry}
                    preview={false}
                  />
                </div>
              </div>
              <div className='flex flex-col mt-4'>
                <Label className='mb-4' htmlFor='displayName'>
                  Display Name
                </Label>
                <Input
                  className='mb-8'
                  id='displayName'
                  placeholder='Enter your username'
                  value={data.displayName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, displayName: e.target.value })
                  }
                />
              </div>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='userBio'>
                  Profile Bio
                </Label>
                <Textarea
                  className='mb-8'
                  id='userBio'
                  placeholder="what's in your mind!"
                  value={data.userBio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData({ ...data, userBio: e.target.value })
                  }
                />
              </div>

              <Button className='mt-4 w-32 mr-8' type='submit'>
                Update
              </Button>
              <Button
                variant='destructive'
                className='mt-4 w-32 mr-8'
                onClick={() => navigate('/profile')}>
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
