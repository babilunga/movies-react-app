export const API_URL = 'https://api.themoviedb.org/3';

export const API_KEY_3 = '8698c90a16d489fe805eb624540fb232';

export const API_KEY_4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk4YzkwYTE2ZDQ4OWZlODA1ZWI2MjQ1NDBmYjIzMiIsInN1YiI6IjYwZWQ1ZTRkMzk3ZGYwMDA3ZTI2NWFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qqNw3VAZ4EY-vxUkanHJmCARbrl-QwwFpsqvaUqysT8';

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((response) => response.json())
      .then((error) => reject(error));
  });
};
