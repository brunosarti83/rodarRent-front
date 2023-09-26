import axios from 'axios';

const loadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'brunoprueba1983');     
    const response = await axios.post(
    `https://api.cloudinary.com/v1_1/daiztctac/upload`,
    formData,
    {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    }
    );
    return response.data.secure_url;
}

export default loadImage;