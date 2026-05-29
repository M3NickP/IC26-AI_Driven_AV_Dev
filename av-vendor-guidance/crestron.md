# Using AI to develop with Crestron

Crestron offers several ways to write control code and design UIs. The most AI Friendly approach is to use SIMPL# and CH5.

## Control Code

While most LLMs will exhibit some dexterity in generating SIMPL+ code, the proprietary nature of the language means that the model's training on SIMPL+ will be limited and will carry a greater risk of hallucinations.

C#, however, is an extremely common language and is well understood by most LLMs. C# is also strongly typed and has a rich set of testing and linting tools that can be used to provide direct feedback to the model.

The main issue is that Crestron does have a number of proprietary libraries for interfacing with crestron hardware that LLMs may not be aware of.

Crestron's documentation is gated behind a login, and is lacking at best. You will likely need to instruct your agent to inspect the SIMPL# SDK and generate a set of high level documents that can be consumed locally.

Fortunately, as of the 4-Series processors and VC-4, you can use the standard .net classes for most things like networking, file IO, and other common tasks.

You will not be able to directly interface with a SIMPL# program in Cursor or VSCode, but you can open the project in Visual Studio or Ryder and then also open the project in Cursor's Agents view or with the ClaudeCode CLI.


## User Interfaces

Crestron officially supports the use of web technologies on their touch panels. As of the x80 series touch panels - ALL crestron UIs use HTML/CSS/Javascript for all UIs.

Crestron officially provides a shell template framework for developing UI, however, due to the proprietary nature of the framework, it is not recommended to use it when working with AI.

Similar to Q-SYS I have provided a NPM package that allows you to use Svelte 5 with Crestron UIs.

The setup instructions for ch5-svelte are here [ch5-svelte](https://www.npmjs.com/package/ch5-svelte) there is also a video tutorial on how to setup ch5-svelte here [ch5-svelte video tutorial](https://www.youtube.com/watch?v=XJNJ1wvaF4U)

You should use the Svelte MCP or Skill - https://svelte.dev/docs/ai/overview 

If you use the Crestron Contract Editor (https://www.crestron.com/Products/Catalog/Control-and-Management/Software/Programming-Commissioning/SW-CH5CE) the *.cse2j file is a JSON file that you can add to the context of your agent to provide awareness of the contract and components.

