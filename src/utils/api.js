import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "8698c90a16d489fe805eb624540fb232";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk4YzkwYTE2ZDQ4OWZlODA1ZWI2MjQ1NDBmYjIzMiIsInN1YiI6IjYwZWQ1ZTRkMzk3ZGYwMDA3ZTI2NWFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qqNw3VAZ4EY-vxUkanHJmCARbrl-QwwFpsqvaUqysT8";

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

export default class CallApi {
  static get(url, options = {}) {
    const { params } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        }
      }
    );
  }

  static post(url, options = {}) {
    const { params, body } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }

  static delete(url, options = {}) {
    const { params, body } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }
}
