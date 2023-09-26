/* eslint-disable react/prop-types */
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { cloudinaryConfig } from '../../../helpers/cloudinaryConfig';

const ImageUpload = ({ newImage, toast }) => {



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
      newImage(imageUrl); 
      toast.success('Image correctly uploaded');
    } catch (error) {
      toast.error('Error uploading the image', error);

    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className=' p-5 text-center border-dashed border-2 border-gray-600 cursor-pointer'>
        <input {...getInputProps()} />
        <p>Drag and drop an image, or click to upload</p>
      </div>
    </div>
  );
};

export default ImageUpload;
