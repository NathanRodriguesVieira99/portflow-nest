import http from 'k6/http';
import { check } from 'k6';

const KONG_BASE_URL = `http://kong:8000/container/api/v1`;

export default function () {
  const result = http.get(`${KONG_BASE_URL}/health`);

  console.log(result.status);
  console.log(result.body);

  check(result, {
    'response code was 200': (result) => result.status === 200,
  });
}
