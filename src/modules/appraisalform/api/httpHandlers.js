import axios from 'axios';

const client = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 60000 // milliseconds - increased to account for SLOW hold service
});

function handleResponse(response) {
  const { data } = response;
  return data;
}

function handleError(error) {
  // Below I have a commented example or more granular error control.
  // Our API handlers should eventually throw an error based on the type of error.

  // if (error.response) {
  //   // The request was made and the server responded with a status code
  //   // that falls out of the range of 2xx
  //   // const { data, status, headers } = error.response;
  // } else if (error.request) {
  //   // The request was made but no response was received
  //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //   // http.ClientRequest in node.js
  //   // console.log(error.request);
  // } else {
  //   // Something happened in setting up the request that triggered an Error
  //   // console.log('Error', error.message);
  // }

  // NOTE (June 28, 2019) this should be replaced with a thrown error.
  // We cannot do this yet because our `operations.js` files expect a promise.
  // We need to rework those files, and then update this.
  return Promise.reject(error.response.data);
}

async function makeRequest(config) {
  try {
    const response = await client.request(config);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

async function get(url, config) {
  return await makeRequest({
    ...config,
    url,
    method: 'get'
  });
}

async function post(url, data, config) {
  return await makeRequest({
    ...config,
    url,
    data,
    method: 'post'
  });
}

async function patch(url, data, config) {
  return await makeRequest({
    ...config,
    url,
    data,
    method: 'patch'
  });
}

async function put(url, data, config) {
  return await makeRequest({
    ...config,
    url,
    data,
    method: 'put'
  });
}

async function axiosDelete(url, data, config) {
  return await makeRequest({
    ...config,
    url,
    data,
    method: 'delete'
  });
}

function configWithAuthToken(config = {}, authToken) {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: authToken || ''
    }
  };
}

async function getWithAuthToken(url, authToken, config) {
  return await get(url, configWithAuthToken(config, authToken));
}

async function postWithAuthToken(url, authToken, data, config) {
  return await post(url, data, configWithAuthToken(config, authToken));
}

async function patchWithAuthToken(url, authToken, data, config) {
  return await patch(url, data, configWithAuthToken(config, authToken));
}

async function putWithAuthToken(url, authToken, data, config) {
  return await put(url, data, configWithAuthToken(config, authToken));
}

async function deleteWithAuthToken(url, authToken, data, config) {
  return await axiosDelete(url, data, configWithAuthToken(config, authToken));
}

export {
  // NOTE (June 28, 2019): The plan is to not export client, but things currently use it.
  // We must create functions in src/api/index.js for those places to use instead of client
  // before we can remove this export.
  client,
  makeRequest,
  put,
  get,
  patch,
  post,
  axiosDelete,
  getWithAuthToken,
  postWithAuthToken,
  patchWithAuthToken,
  putWithAuthToken,
  deleteWithAuthToken
};
