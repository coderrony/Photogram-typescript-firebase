import { FC, Dispatch, SetStateAction } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { PhotoMeta } from '@/types';

interface FileUploaderProps {
  className?: string;
  fileEntry: PhotoMeta[];
  setFileEntry: Dispatch<SetStateAction<PhotoMeta[]>>; // Update the type for state setter
  preview: boolean;
}
interface FileType {
  isSuccess: boolean;
  successEntries: { cdnUrl: string; uuid: string }[];
}
const FileUploader: FC<FileUploaderProps> = ({
  fileEntry,
  setFileEntry,
  preview,
}) => {
  const handleFileChange = (file: FileType | undefined) => {
    if (file && file.isSuccess) {
      const selectedPhoto = file?.successEntries?.map(item => {
        return {
          cdnUrl: `${item.cdnUrl}-/format/webp/-/quality/smart/-/stretch/fill/`,
          uuid: item.uuid,
        };
      });
      setFileEntry([...selectedPhoto]);
    }
  };

  return (
    <div>
      <div className='bg-zinc-700 w-[120px] p-2 rounded'>
        <FileUploaderRegular
          sourceList='local, url, camera, dropbox'
          pubkey='5fc4c6ebc93a22872094'
          onChange={handleFileChange} // Adding onChange handler
        />
      </div>

      {fileEntry?.length > 0 && preview && (
        <div className=' max-w-2xl  grid grid-cols-3 gap-2 items-center justify-center  mt-4 '>
          {fileEntry?.map(file => (
            <div key={file.uuid} className='border p-2 '>
              <img src={file.cdnUrl} alt='image' className='w-52 h-52' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
