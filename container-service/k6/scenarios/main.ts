import { group } from 'k6';

import healthcheck from './health.ts';

export default function () {
  group('Healthcheck', function () {
    healthcheck();
  });
}
