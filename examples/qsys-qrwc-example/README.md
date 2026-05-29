# Q-SYS QRWC + Svelte + Vite Example

This is a basic project that implements qrwc-svelte in a Svelte 5 project for the InfoComm Course `AI Driven AV Development workflows`.

## Recommended IDE Setup - Cursor

- [Cursor](https://www.cursor.com/) is a modern, AI-powered IDE that integrates with qrwc-svelte and provides a seamless development experience.
- [Svelte MCP](https://svelte.dev/docs/ai/skills) 

> Note: Cursor will likely start in the Agents view, Switch to the editor view to see the VSCode style layout.

## Prerequisites

- [Node.js 22.x LTS or higher](https://nodejs.org/en)
- A Hardware Q-SYS Core (V10.0 or later) [with QRWC enabled](https://q-syshelp.qsc.com/Content/Networking/Interfaces_Services.htm#QRWC_Network)


## Setup Instructions

1. Load the example Q-SYS design file into your Q-SYS Core.
2. Ensure that the terminal is in the project directory (or open the qsys-qrwc-example folder in Cursor)
2. Run `npm install` to install the dependencies
3. Edit the `src/lib/qrwc.ts` file to point to your Q-SYS Core IP address.
4. Edit the `.cursor/mcp.json` file to point to your Q-SYS Core IP address.
5. Enable the qrwc-svelte MCP in Cursor by pressing f1, the typing `mcp` and selecting `qrwc-svelte`.
6. Run `npm run dev` to start the development server
7. Open the browser to `http://localhost:5173`
8. Start prompting Cursor to generate code for you!

Example prompts along with the Q-SYS design file are available in the examples folder (up one directory from this one)