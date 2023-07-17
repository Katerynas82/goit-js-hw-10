import { fetchBreeds, fetchCatByBreed } from './cat_api';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

loader.style.display = 'none';
error.style.display = 'none';
catInfo.style.display = 'none';
catInfo.style.cssText = `
font-size: 28px;
color: #16065c;`;
breedSelect.style.margin = '24px';

function populateBreeds(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');

    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  breedSelect.addEventListener('change', handleBreedSelectChange);
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch(() => {
      error.style.display = 'block';
      loader.style.display = 'none';
    });
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" height=300>
    
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>
  `;
}

loader.style.display = 'block';

fetchBreeds()
  .then(breeds => {
    populateBreeds(breeds);
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  })
  .catch(() => {
    error.style.display = 'block';
    loader.style.display = 'none';
  });
