import { QrwcSvelte } from 'qrwc-svelte';

/** Shared QRWC client — connects to the design core (QRWC must be enabled on the core). */
export const qrwcSvelte = new QrwcSvelte('172.18.1.201');
