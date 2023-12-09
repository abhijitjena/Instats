import './index.css';

import { ReactElement, useEffect, useRef } from 'react';

import bongoCat from '../../resources/cats/bongo.gif';

interface IProps {
  retrieveFiles: (files: FileList | null) => void;
  isUploading?: boolean;
  hasUploaded?: boolean;
}

const UploadButton = (props: IProps): ReactElement => {
  const { retrieveFiles, isUploading, hasUploaded } = props;

  const handleFolderUpload = () => {
    ref && ref.current && ref.current.click();
  };

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', '');
      ref.current.setAttribute('webkitdirectory', '');
    }
  }, [ref]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        name="files[]"
        id="files"
        style={{ display: 'none' }}
        ref={ref}
        multiple
        onChange={(event: any) => {
          retrieveFiles(event.target.files);
          event.target.value = '';
        }}
      />
      <button
        className={`relative w-24 h-10 rounded-none flex flex-col items-center justify-center z-10 shadow-black shadow-[8px_10px_0_0] ${
          isUploading ? 'bg-yellow-500' : hasUploaded ? 'bg-emerald-500' : 'bg-white'
        }`}
        onClick={() => handleFolderUpload()}
      >
        {isUploading ? (
          <img
            src={bongoCat}
            width={200}
            height={200}
            alt="bongo cat"
            // className="relative -top-[3.3rem] left-[65%]"
          />
        ) : hasUploaded ? (
          <p className="text-base font-medium leading-none text-white">Done</p>
        ) : (
          <p className="text-base font-medium leading-none text-slate-900">Upload</p>
        )}
      </button>
    </div>
  );
};

export default UploadButton;
