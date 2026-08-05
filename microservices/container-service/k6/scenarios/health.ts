import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'http://container-service:3333/api/v1';

export default function healthcheck() {
  const result = http.get(`${BASE_URL}/health`);

  console.log(result.status);
  console.log(result.body);

  check(result, {
    'response code was 200': (result) => result.status === 200,
  });
}
