const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_KEY = '8243868a73ce0b3c69a6';
const API_SECRET = '8314e946fe8551b1053c3af4147da5bc720cc94ba27a783ba05f0d045797fbcb';
const PINATA_BASE_URL = 'https://api.pinata.cloud';

async function uploadImageToPinata() {
    const imagePath = './GoldDog.webp'; // 确保图片路径正确
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    try {
        const response = await axios.post(`${PINATA_BASE_URL}/pinning/pinFileToIPFS`, formData, {
            headers: {
                'pinata_api_key': API_KEY,
                'pinata_secret_api_key': API_SECRET,
                ...formData.getHeaders()
            }
        });

        console.log('File uploaded:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
}

uploadImageToPinata();
