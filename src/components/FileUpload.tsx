import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (data: any) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        onFileUpload(jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="neomorph p-10 cursor-pointer text-center transition-all duration-200"
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-mint-dark" />
      {isDragActive ? (
        <p className="text-mint-dark">Drop your Spotify data here...</p>
      ) : (
        <p className="text-gray-600">
          Drag & drop your Spotify JSON file here, or click to select
        </p>
      )}
    </div>
  );
};

export default FileUpload;