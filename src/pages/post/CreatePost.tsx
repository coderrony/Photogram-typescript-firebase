import FileUploader from '@/components/fileUploader/FileUploader';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserAuth } from '@/context/userAuthContext';
import { createPost } from '@/repository/post.service';
import { PhotoMeta, Post } from '@/types';
import { FC, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CreatePostProps {
  className?: string;
}

const CreatePost: FC<CreatePostProps> = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [fileEntry, setFileEntry] = useState<PhotoMeta[]>([]);
  const [post, setPost] = useState<Post>({
    caption: '',
    photos: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date(),
  });

  // console.log(user);

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user !== null) {
      const newPost: Post = {
        ...post,
        photos: fileEntry,
        userId: user?.uid,
        username: user.displayName!,
        photoUrl: user.photoURL!,
      };
      await createPost(newPost);
      console.log('new Post', newPost);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='border max-w-3xl w-full'>
          <h3 className='bg-slate-800 text-white text-center text-lg p-2'>
            Create Post
          </h3>

          <div className='p-8'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='caption'>
                  Photo Caption
                </Label>
                <Textarea
                  className='mb-8'
                  id='caption'
                  placeholder='What is in your photo'
                  value={post.caption}
                  onChange={e => setPost({ ...post, caption: e.target.value })}
                />
                <div className='flex flex-col'>
                  <Label className='mb-4' htmlFor='photo'>
                    Photos
                  </Label>
                  <FileUploader
                    fileEntry={fileEntry}
                    setFileEntry={setFileEntry}
                    preview={true}
                  />
                </div>
                <Button className='mt-8 w-32' type='submit'>
                  Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
