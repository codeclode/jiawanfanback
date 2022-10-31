import axios from 'axios';

const instance = axios.create({
  baseURL: '/apis',
});

export function getData(url, data) {
  return instance.get(url, {
    params: data
  })
}
