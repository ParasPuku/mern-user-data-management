### Which of the following best describes Vite's core architecture for development?

It serves source code over native ES Modules (ESM), letting the browser take over part of the bundling job.

Correct! Vite leverages native ES Modules, allowing the browser to parse and import modules as needed, resulting in near-instant server start times.

### In a standard Vite setup, what is the primary role of esbuild compared to Rollup?

esbuild handles transpilation and dependency pre-bundling, while Rollup is used for generating optimized production builds.

Correct! esbuild is written in Go and is incredibly fast, making it ideal for dev-time transpilation and pre-bundling, whereas Rollup offers better bundling features for production.

### How does Vite’s Hot Module Replacement (HMR) function when a file is edited?

It establishes a WebSocket connection to the browser and swaps the updated module, allowing the rest of the application state to be retained.

Correct! Vite uses an HMR API over native ESM. When you edit a file, Vite accurately invalidates the module and forces the browser to fetch the new one without reloading the page.

### Which prefix must environment variables have in a Vite project to be exposed to the client-side code?

VITE_

Correct! Only variables prefixed with VITE_ are exposed to your client-side source code via import.meta.env to prevent accidentally leaking private keys.

### Why does Vite use Dependency Pre-bundling with esbuild during the initial server start?

To convert CommonJS modules to ESM and reduce the number of HTTP requests for heavily nested dependency modules.

Correct! Pre-bundling converts CommonJS to ESM and merges hundreds of nested HTTP requests into single modules, significantly improving page load performance.
