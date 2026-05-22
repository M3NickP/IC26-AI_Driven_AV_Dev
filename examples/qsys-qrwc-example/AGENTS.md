# QRWCSvelte Example

## Tech Stack

- Svelte 5
- qrwc-svelte (https://m3-technology-group.github.io/qrwc-svelte/llms.md)
- tailwindcss
- daisyui

## QRWC
- QRWC client is already setup in `src/lib/qrwc.ts`

## Commands
- `npm run dev` to start the development server
- `npm run build` to build the production version
- `npm run check` to check the code for errors

## MCPs
- Svelte MCP - ALWAYS call the svelte autofixer after you generate any code.
- svelte-qrwc-mcp - A list of components and controls in each component in the q-sys design.

## Workflow
- ALWAYS check component and control names with svelte-qrwc-mcp when working with components and controls.
- ALWAYS run the svelte autofixer after you generate any code.
- ALWAYS run `npm run check` to check the code for errors once you are finished and fix any errors.