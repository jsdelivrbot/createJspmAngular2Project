import 'zone.js';
import 'reflect-metadata';

import { bootstrap} from 'angular2/platform/browser';

import { HTTP_PROVIDERS} from 'angular2/http';

import { Myapp} from './myapp';

bootstrap(Myapp, [HTTP_PROVIDERS]);
