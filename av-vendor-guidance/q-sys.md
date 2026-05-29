# Using AI to develop with Q-SYS

While an AI agent cannot edit a q-sys design directly, AI can be extremely useful in developing Q-SYS Plugins and User Interfaces.

## Plugins

Using the Q-SYS PLugin Framework (https://q-syshelp.qsc.com/DeveloperHelp/Content/Code_Examples/Basic_Plugin_Framework.htm) you can use Your IDE of choice (VSCode, Cursor, etc.) to develop plugins.

As of the time of writing there is no official MCP server for Lua (or Q-SYS LUA). 

Your best bet is to provide the Q-SYS Developer resources in your AGENTS.MD file. You may consider asking your agent to distill the documentation into a set of high level documents to be consumed locally.

The Q-SYS plugin docs are available here: https://q-syshelp.qsc.com/DeveloperHelp/

It has been observed that Anthropic's (Claude family) Models are capable of differentiating qsc-lua from other lua implementation (EG: Roblox Lua).


## User Interfaces

As of Q-SYS Designer 10.0 it is possible to design a UI with standard web tooling. You can use any framework with the official Q-SYS QRWC package.

However, In this course's example we chose to use Svelte 5 and qrwc-svelte to develop the UI.
You can use any design system or framework, in the included example we chose to use TailwindCSS and DaisyUI.

The setup instructions for qrwc-svelte are here [qrwc-svelte](https://www.npmjs.com/package/qrwc-svelte)

There is also a video tutorial on how to setup qrwc-svelte here [qrwc-svelte video tutorial](https://youtu.be/Tk9L1A867KY)

You should use the Official Svelte MCP or Skill - https://svelte.dev/docs/ai/overview
The qrwc-svelte-mcp package can also provide awareness of components and controls in the q-sys design. it is available here [qrwc-svelte-mcp](https://www.npmjs.com/package/qrwc-svelte-mcp)