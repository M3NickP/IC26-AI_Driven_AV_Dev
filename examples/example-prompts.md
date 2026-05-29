# Example Prompts

Here are some example prompts for the q-sys-qwrc-example project.

In all of the examples, we used Cursor's Composer 2.5 model.

It is recommended to issue each prompt in PLAN mode first, then issue the prompt in Agent mode to execute the plan.

## Setup

1. Load the Q-SYS design to your core.
2. open the `qsys-qrwc-example` directory in cursor (or VSCode with Claude Code) 
3. Run `npm install` to install the dependencies
4. change the core IP address in the `src/lib/qrwc.ts` file to the IP address of your q-sys core
5. Also change the core IP address in the `.cursor/mcp.json` file to the IP address of your q-sys core
6. Run `npm run dev` to start the development server

## Prompts

### Video Routing Page

```
Implement the video routing page. there is a component in the q-sys design that contains the video routing controls for displays 1 and 2. Provide separate routing controls for each display. Provide feedback based on what is routed to each display. 

connected to input 1 is the logo screen
input 4 is a PC
input 5 is a Laptop
input 6 is an apple tv.

```

### Audio Page

```
Build out the audio page now. we need controls for audio source selection with the following sources:
1. Left Display Audio
2. Right Display Audio
3. Sonos
4. Pink Noise

And then provide level controls and mutes for PGM and the mic. Provide a notification when the ducker is active stating that the microphone is in use.
```

### Tests for the video routing page

```
Write tests for src/lib/pages/VideoRoutingPage.svelte

There will not be a core available to use when testing so you MUST mock the qrwc-svelte instance.
```

Then in the same Agent Thread in Agent mode (after the tests work)

```
Create a document in docs/ that describes hot to write unit tests for future files, includes notes about how to mock qrwc-svlete and not relying on a live core for testing
```

### Tests for the Audio Page

```
Write tests for src/lib/pages/AudioPage.svelte

Reference the docs/unit-testing.md file for guidance.
```
