import { FC } from 'react';

interface ErrorProps {
  className?: string;
}

const Error: FC<ErrorProps> = () => {
  return (
    <div>
      <h1> Error </h1>
    </div>
  );
};

export default Error;
