import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountry } from './js/fetchCountry';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { countryСardTemplate, countryListTemplate } from './js/markupTemplate';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
// иницилизация
// вешаем обработчика собітия сабмит
  refs.searchBox.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));

 // ф-ция коллбек при сабмите на форму находит запрос
  function onSearch(e) {
    e.preventDefault();
    // выполни санитизацию введенной строки методом trim()
    const boxValue =  refs.searchBox.value;
     const searchBoxValue = boxValue.trim();
if (searchBoxValue === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}
// вызываем фукнция при сабмите на импут и обрабатываем ошибку 
    fetchCountry(searchBoxValue)
    .then(renderCountryCard)
    .catch((err) => {
        Notify.failure('Oops, there is no country with that name')
    });
}

//ф-ция подбора значений + интерфейс
  function renderCountryCard(countrys) {
    if (countrys.length >= 1 && countrys.length < 10) {
    const markup = countrys.map(country =>  countryListTemplate(country));
    refs.countryInfo.innerHTML = markup.join('');
    refs.countryList.innerHTML = '';    
    } 
    if (countrys.length === 1) {        
    const markup = countrys.map(country =>  countryСardTemplate(country));
    refs.countryInfo.innerHTML = markup.join('');
    refs.countryList.innerHTML = '';
   }
   if (countrys.length >= 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
   }
   
}
  
  
