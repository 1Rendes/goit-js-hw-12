import axios from 'axios';
export async function fetchImages(input, page) {
  try {
    const responce = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '43920119-17be8655c7213217026175d69',
        q: input,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '200',
        page: page,
      },
    });
    return responce.data;
  } catch (error) {
    throw new Error(responce.status);
  }
}
