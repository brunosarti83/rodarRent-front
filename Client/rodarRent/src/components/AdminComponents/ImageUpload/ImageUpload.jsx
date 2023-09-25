import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { cloudinaryConfig } from '../../../helpers/cloudinaryConfig';

const ImageUpload = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'rodarRent');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      setUploadedImageUrl(imageUrl); 
      alert('Imagen subida a Cloudinary:', imageUrl);
    } catch (error) {
      alert('Error al subir la imagen a Cloudinary:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag and drop an image, or click to upload</p>
      </div>
      {uploadedImageUrl && (
        <div className=' flex'>
          <p>New Image:</p>
          <div className=' w-1/6 h-52 '>
            <img src={uploadedImageUrl} alt="Uploaded" style={{ Width: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
