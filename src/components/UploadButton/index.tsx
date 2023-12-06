import './index.css';

import { ReactElement } from 'react';

interface IProps {
  retrieveFiles: (files: FileList | null) => void;
  isUploading?: boolean;
  hasUploaded?: boolean;
}

const UploadButton = (props: IProps): ReactElement => {
  const { retrieveFiles, isUploading, hasUploaded } = props;

  const ctrls: {
    [key: string]: HTMLInputElement;
  } = {};

  const handleFolderUpload = () => {
    ctrls && ctrls.fileUploader && ctrls.fileUploader.click();
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        name="files[]"
        id="files"
        style={{ display: 'none' }}
        ref={(fileUploaders): void => {
          ctrls.fileUploader = fileUploaders as HTMLInputElement;
        }}
        multiple
        directory=""
        webkitdirectory=""
        onChange={(event: any) => {
          retrieveFiles(event.target.files);
        }}
      />
      <button
        className={`relative w-24 h-10 rounded-none flex flex-col items-center justify-center z-10 shadow-black shadow-[8px_10px_0_0] ${
          isUploading ? 'bg-yellow-500' : hasUploaded ? 'bg-emerald-500' : 'bg-white'
        }`}
        onClick={() => handleFolderUpload()}
      >
        {isUploading ? (
          <span className="upload-loader"></span>
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
