import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { cloudinaryConfig } from '../../../helpers/cloudinaryConfig';

const ImageUpload = () => {
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'TU_UPLOAD_PRESET'); // Define un preset de Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      );

      console.log('Imagen subida a Cloudinary:', response.data);
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una.</p>
    </div>
  );
};

export default ImageUpload;
