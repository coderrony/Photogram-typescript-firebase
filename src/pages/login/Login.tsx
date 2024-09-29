import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserAuth } from '@/context/userAuthContext';
import { UserLogIn } from '@/types';

import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  className?: string;
}

const initialValue: UserLogIn = {
  email: '',
  password: '',
};

const Login: FC<LoginProps> = () => {
  const [userInfo, setUserInfo] = useState<UserLogIn>(initialValue);
  const { googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('the user info is ', userInfo);
      await logIn(userInfo.email, userInfo.password);
      navigate('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleGoogleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center '>
      <div className='max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm'>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl text-center mb-4'>
                PhotoGram
              </CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid'>
                <Button variant='outline' onClick={handleGoogleSignIn}>
                  <Icons.google className='mr-2 h-4 w-4' />
                  Google
                </Button>
              </div>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                    Or
                  </span>
                </div>
              </div>
              <h2 className='text-lg text-center font-bold'>Login</h2>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email address</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='dipesh@example.com'
                  value={userInfo.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Password'
                  value={userInfo.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className='flex flex-col'>
              <Button className='w-full' type='submit'>
                Login
              </Button>
              <p className='mt-3 text-sm text-center'>
                Don't have an account ? <Link to='/signup'>Sign up</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
