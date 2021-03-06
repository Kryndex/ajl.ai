import * as healthCheck from './health/routes';
import * as annotations from './annotations/routes';
import * as feedback from './feedback/routes';
import * as session from './session/routes';

export default [
  healthCheck,
  annotations,
  feedback,
  session,
];
