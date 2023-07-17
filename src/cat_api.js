import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Zawg3GHpFbUHsOlas3mlqgyb1964UvelA6iPiYUAjMpwG8SAL7kScEiJ8X1NVW8Q';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw error;
    });
}
