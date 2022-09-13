import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };

  refs.searchBox.addEventListener(`submit`, onSearch);

  function onSearch(e) {
    e.preventDefault();

    fetchCountry()
    .then()
    .catch(err => Notify.failure('Oops, there is no country with that name'))
  }

  function fetchCountry(name) {
    if (name.length)
    return fetch(`https://restcountries.com/v3.1/name/{name}`).then(
        response => {
            return response.json();
        },
    );
  }

  function renderCountryCard(country) {
    const markup = countryCard
  }