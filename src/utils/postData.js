import axios from 'axios';

const instance = axios.create({
  baseURL: '/apis',
});

export function postData(url, data) {
  return instance.post(url, data)
}
