import { registerHooks } from 'node:module';
import { resolve } from './loader/hooks.js';
import { FILES } from '../config.js';

registerHooks({ resolve });

const { default: formatValueRules } = await import('../../src/regulation/formatValueRules.js');
const postfixes = await import('../../src/regulation/postfixes.mjs');

const createElement = () => undefined;

export { formatValueRules, postfixes, createElement, FILES };
