### 1. What is Micro-Frontend Application?

Micro-frontends is an architectural style where the traditionally monolithic frontend codebase is split into smaller, more manageable pieces. These pieces, or "micro-frontends," can be developed, tested, and deployed independently, enabling teams to work more efficiently and scale their projects more effectively. This approach mirrors the microservices architecture in the backend, aiming to achieve the same benefits of modularity and scalability.

In simple terms, a micro frontend in React is an architectural style where a large web application is broken down into smaller, independent mini-apps. Instead of building one massive React project (a monolith), different teams build separate parts of the website—like the shopping cart, the product list, or the user profile—and piece them together at runtime.

The Amazon Analogy<br/>
Think of a website like Amazon. Instead of one single team writing code for the entire website, it is divided into separate zones:
- Team A builds and manages the Search Bar.
- Team B builds and manages the Shopping Cart.
- Team C builds and manages the Product Reviews.

Each zone is a completely autonomous mini React app.

How It Works in React<br/>
A standard React micro frontend setup usually relies on two main parts:
- The Shell (Host): The main container application. It handles the common layout, global header, user authentication, and decides when to load each mini-app.
- The Micro Apps (Remotes): The independent pieces. For example, a "Cart" app that only exposes its main Cart component to the Shell.

Tools like Webpack Module Federation or frameworks like Nx are commonly used to seamlessly glue these separate React apps together inside the browser.

Why Companies Use It
- Independent Deployments: Team B can update and deploy the Shopping Cart at 2:00 PM without needing to rebuild or redeploy the rest of the website.
- No Code Merging Nightmares: Because teams work in completely separate code repositories, they don't step on each other's toes or deal with massive Git merge conflicts.
- Smaller Codebases: Developers only work on a small, hyper-focused piece of the application, making the code much easier to understand and maintain.

Benefits of Micro-Frontends<br/>
- 1. Independent Development: Teams can work on different parts of the application simultaneously without interfering with each other.
- 2. Scalability: Different parts of the frontend can be scaled independently based on need.
- 3. Technology Agnostic: Different micro-frontends can be built using different technologies or frameworks, allowing teams to choose the best tools for their specific needs.
- 4. Improved Maintainability: Smaller, well-defined codebases are easier to maintain and understand.
- 5. Faster Releases: Independent deployment means that changes in one part of the application can be released without requiring a full deployment of the entire frontend.

Challenges of Micro-Frontends<br/>
- 1. Increased Complexity: Coordinating multiple micro-frontends can be complex, especially when ensuring consistent styling and shared state.
- 2. Performance Overheads: Loading multiple micro-frontends can introduce performance overheads, such as increased initial load times.
- 3. Integration: Ensuring seamless integration and communication between micro-frontends can be challenging.

### 2. What is a micro frontend, and how is it different from just splitting a monolith into components?

A micro frontend is when you split a big frontend application into smaller pieces that are built, tested, and deployed independently by different teams — and then stitched together into one app that the user experiences as a single website.

The key difference from "just splitting into components"<br/>

This is the part people mix up, so here's the simple distinction:

Splitting into components = organizing code within one project.

- Still one codebase
- Still one build
- Still one deployment — if you change a Button component, the whole app gets rebuilt and redeployed together
- One team (or many teams sharing one repo) has to coordinate every release

Micro frontends = splitting into separate, independently deployable apps.

- Multiple codebases (often separate repos)
- Multiple builds
- Multiple deployments — the Checkout team can ship a change on Tuesday without touching or redeploying anything the Products team owns
- Each team can pick their own release schedule, and in some setups even their own tech stack

A simple analogy

Think of a shopping mall.

- Components in a monolith = one big store with different aisles (electronics, clothes, groceries). It's one business — one lease, one manager, one set of hours. Reorganizing the shoe aisle still means dealing with the whole store's system.
- Micro frontends = a mall with separate stores (Nike, Starbucks, a bookstore). Each store manages its own staff, stock, and hours. Nike can renovate without asking Starbucks. But from the outside, a shopper just sees "the mall" — one building, one experience.

Splitting into components organizes your code. Micro frontends split your deployment and ownership — that's the actual difference. Components can live inside a micro frontend too; the two ideas aren't opposites, they're at different levels (code organization vs. how the app ships).

### 3. What problem are micro frontends actually solving? (Hint: it's mostly organizational — team autonomy — not a purely technical win.)

The real problem micro frontends solve

It's not primarily a technical problem — it's an organizational scaling problem.

The problem, concretely

Imagine one big frontend monolith, and now your company has grown to 5 different teams — Products, Checkout, Account, Search, Recommendations — all working in that same codebase.

Here's what starts going wrong, purely from having many teams share one codebase:

- Every team blocks every other team. If Checkout wants to ship a fix today, but Products broke the build yesterday, Checkout can't deploy either — everyone ships together, or nobody ships.
- Release coordination becomes a full-time job. "Can we merge? Is the build green? Whose turn is it to deploy?" — this overhead grows with team count, not linearly, but almost combinatorially.
- One team's mistake breaks everyone. A memory leak or bad dependency bump from the Search team can take down Checkout, even though Checkout's code didn't change at all.
- Ownership gets blurry. In one shared codebase, it's unclear who's responsible for a shared utils.js file that six teams touch. Nobody wants to refactor it because "what if I break someone else's part."
- Teams can't move at their own pace. A team that wants to ship 10 times a day is stuck waiting on a team that ships once a week, because they share one release train.

What micro frontends actually buy you

Micro frontends solve this by giving each team:

- Their own codebase
- Their own build
- Their own deploy pipeline
- Their own release schedule

So Checkout can ship 5 times today, and Products doesn't even need to know it happened. Nobody's blocked, nobody's coordinating a shared release, and a bug in one MFE (ideally) doesn't take down the others.

The line that matters in an interview

"Micro frontends exist to let independent teams ship independently. The 'many frameworks, many repos, module federation' stuff — that's implementation detail. The actual problem being solved is: as an org grows past a certain number of frontend teams, coordinating one shared codebase and one shared release process becomes the bottleneck, not the code itself."

Why this framing matters

This is also why the earlier answer — "when would you not use micro frontends" — makes sense: if you don't have that multi-team coordination problem (e.g., it's one small team), you're adopting a solution to a problem you don't have, and you just inherit the technical complexity (multiple builds, shared dependency management, cross-app communication) without the organizational payoff.

This is essentially Conway's Law in action: "organizations design systems that mirror their own communication structure." Micro frontends are a deliberate application of that law — you shape the architecture to match how your teams are actually organized, instead of fighting against it inside one shared codebase.

### 4. What are the main ways to compose micro frontends together (build-time, run-time, server-side, iframe)?

Here's each composition approach broken down simply — what it is, how it works, and when it makes sense.

1. Build-Time Composition<br/>
What it is: Each MFE is published as an npm package. The shell app installs them like any other dependency and bundles everything together at build time.

```js
// Shell's package.json
"dependencies": {
  "products-mfe": "^2.1.0",
  "checkout-mfe": "^1.4.0"
}
```

How it works: npm install, then import and use like normal components. One single build produces one final bundle.

Trade-off: This is the least "independently deployable" option — if Checkout ships a change, the shell still has to bump the version and rebuild + redeploy the whole shell app. You get code ownership separation, but not true independent deployment. Some people argue this barely counts as "real" micro frontends for that reason.

When to use it: Small number of teams, infrequent releases, or when true runtime independence isn't worth the added complexity.

2. Run-Time Composition (most common today)

What it is: Each MFE is deployed separately (its own URL/CDN), and the shell loads them dynamically in the browser at runtime — nobody's code is bundled together ahead of time.

The most popular way to do this now is Webpack Module Federation:

```js
// Shell dynamically loads a remote at runtime
const ProductsApp = React.lazy(() => import('productsApp/App'));
```

How it works: The shell fetches a small manifest/entry file from the remote's own deployed URL, and pulls in its code live, in the browser, when that route is visited.

Trade-off: True independent deployment — Checkout can deploy Tuesday, shell doesn't rebuild. But now you deal with runtime dependency-version mismatches (does the remote's React version match the shell's?), and if a remote is down, that piece of the page can literally break at runtime.

When to use it: This is the default choice for most modern MFE setups — real independent deploys, reasonably good dev experience.

3. Server-Side Composition

What it is: Instead of the browser assembling the page, the server stitches together HTML fragments from different MFEs before sending the final page to the user. Techniques: Edge Side Includes (ESI), or frameworks like Podium, Ara Framework, or a custom Node.js composition layer.

```js
Server receives request for /
  → fetches HTML fragment from Products service
  → fetches HTML fragment from Header service
  → glues them into one HTML page
  → sends complete page to browser
```
Trade-off: Great for SEO and fast initial load (browser gets one complete HTML page, no client-side stitching delay). But it's more infrastructure to run and maintain (an actual composition server/edge layer), and interactivity (JS) still has to be wired up client-side afterward.

When to use it: Content-heavy sites where SEO and first-paint speed really matter — e.g., e-commerce product pages, news sites.

4. iframe Composition

What it is: Each MFE runs inside its own <iframe>. This is the oldest, bluntest way to compose independently-built apps.

```js
<iframe src="https://checkout.example.com"></iframe>
```

Trade-off:

✅ Extremely strong isolation — a crash, memory leak, or bad CSS in one MFE literally cannot leak into another. Different frameworks, different everything, zero risk of collision.<br/>
❌ Bad for UX: no shared routing/history by default, awkward to resize dynamically, hard to share state, worse for SEO, and cross-iframe communication requires postMessage (clunky).

When to use it: When isolation matters more than a seamless UX — embedding a third-party widget, wrapping a legacy system you don't want to touch, or strict security/compliance boundaries (e.g., embedding a payment provider's own hosted UI).

### 5. What's the difference between a "shell/host" app and a "remote" app?

Shell/Host vs. Remote — in simple terms

The Shell (Host)

The shell is the outer "container" app. It's the one thing that loads first when a user visits your site, and it's responsible for:

- Owning the overall page layout — header, nav, footer
- Owning the URL/routing (as we covered earlier — only the shell touches window.history)
- Deciding which remote to load based on the current route
- Holding shared, app-wide stuff — auth session, global navigation, maybe a design system provider

Think of it as the frame of a picture, or the TV from our earlier analogy — it doesn't have much content of its own, its job is to decide what gets shown and where.

The Remote

A remote is one of the independent MFEs that gets plugged into the shell. It:

- Owns one feature area (Products, Checkout, Account, etc.)
- Is built and deployed separately, by its own team, on its own schedule
- Doesn't know or care about the other remotes
- Gets told what to render (which route it's on) by the shell — it doesn't control navigation itself

Think of it as a channel on the TV, or a store in the mall — self-contained, but only "on" when the shell decides to show it.

The relationship, simply

```js
Shell (host)
 ├─ owns the URL
 ├─ owns the layout
 └─ loads → Products (remote)
          → Checkout (remote)
          → Account (remote)
```

The shell says: "the user is on /products, so load the Products remote and render it here."

The remote says: "okay, here's my UI for that." It has no idea the shell or other remotes even exist.

One important nuance

A remote can also be a host to something else. E.g., the Products MFE might itself load a smaller "Reviews" remote inside it. So "shell" and "remote" aren't fixed identities — they're roles. Whoever is doing the loading is acting as the host; whoever gets loaded is acting as the remote, at that level.

Interview-ready line

"The shell is the composition root — it owns routing, layout, and decides which MFEs to mount. Remotes are the independently built, independently deployed feature modules that get loaded into the shell. The shell controls when and where a remote renders; the remote just renders its own UI when asked — it never controls navigation or knows about its siblings."

### 6. How does routing work across micro frontends? Who owns the browser URL?

Who owns the browser URL?

Only one app — the shell (host) owns the browser URL. Every remote MFE just reads the current URL and reacts to it; none of them are allowed to change it directly.

How it actually works

- The shell has the one and only router instance (e.g., one <BrowserRouter> in React).
- The shell looks at the current path and decides which remote to mount:

```js
<Routes>
  <Route path="/products/*" element={<ProductsMFE />} />
  <Route path="/checkout/*" element={<CheckoutMFE />} />
</Routes>
```

- It hands each remote only its slice of the URL — e.g., Products only gets told about the part after /products.
- Inside the remote, it can do its own nested routing (/products/2, /products/2/reviews) — but it does this with a plain <Routes>, not a second <BrowserRouter>.

Why only one app can own the URL

window.history (the actual browser API behind routing) is a single, global, shared resource — like a single whiteboard. If two different router instances both try to write to it independently, they conflict: back/forward buttons break, URLs get overwritten unexpectedly, deep links stop working correctly.

So the rule is simple: one router controls history, everyone else just reads from it.

What if a remote needs to navigate somewhere outside its own section?

E.g., Checkout wants to send the user to /products/5 after checkout. It can't just do this itself if it doesn't own the router. Instead, the shell exposes a shared navigate function (via Module Federation's shared scope, a prop, or a small shared package) that remotes call into:

```js
// Remote calls the shell's navigate function — doesn't touch history directly
navigate('/products/5');
```

For non-React or fully independent MFEs (no shared router at all)

If MFEs are built in different frameworks (React + Vue + Angular) and can't share a React Router instance, routing is coordinated differently:

- single-spa style: a framework-agnostic orchestrator watches the URL and mounts/unmounts each MFE based on a path-matching function (activeWhen)
- Edge/server routing: a reverse proxy (nginx, etc.) maps different URL prefixes to entirely different deployed apps — no shared JS router at all, each "section" is a fully separate app boundary

Interview-ready line

"Only the shell owns the browser's URL and history — it's the single router instance for the whole app. Remotes get handed their slice of the path and can do nested routing internally, but they never touch window.history directly. If a remote needs to navigate outside its own section, it calls a shared navigate function the shell exposes, rather than manipulating history itself. For non-React or fully decoupled setups, this same idea gets implemented via a framework-agnostic orchestrator like single-spa, or handled entirely at the edge with a reverse proxy."

### 7. Can different MFEs use different frameworks (React, Vue, Angular) in the same page? What are the trade-offs of doing that?

Can you mix frameworks? Yes — but should you?

Technically, yes. This is actually one of the headline selling points of micro frontends — since each MFE is its own independently built app, nothing stops the Products team from using React while the Checkout team uses Vue and the Account team uses Angular. Each one just gets mounted into a DOM node the shell hands it, and from the browser's perspective, it's just JavaScript rendering into a <div>.

```js
<div id="products-mfe-root"></div>   <!-- React renders here -->
<div id="checkout-mfe-root"></div>   <!-- Vue renders here -->
```

Tools like single-spa exist specifically to orchestrate this — mounting/unmounting different framework apps based on the current route, regardless of what each one is built in.

The trade-offs<br/>
The upside (why people actually do this)<br/>
- True team autonomy — a team isn't forced onto a tech stack decision made years ago by a different team.
- Gradual migration — this is the big real-world use case. You can rewrite a legacy Angular app into React one section at a time, running both side-by-side during the transition, instead of a risky big-bang rewrite.
- Hiring flexibility — teams can pick tools that suit their specific problem (e.g., a data-viz-heavy team choosing something with better charting support).

The downside (why most teams don't do this on purpose)
- Bundle bloat. If Products ships React and Checkout ships Vue, the user's browser now has to download both frameworks' runtimes — even though neither MFE needs the other's framework. This directly hurts load time and Core Web Vitals.
- No shared component library across frameworks. Your design system button built in React can't be reused as-is in the Vue MFE. You either rebuild it per-framework, or use framework-agnostic Web Components (which adds its own complexity).
- Inconsistent UX patterns. Different frameworks tend to nudge developers toward slightly different interaction patterns, state timing, animation approaches — small inconsistencies add up to a less cohesive product feel.
- Harder debugging & hiring. Now your team needs devs who can work across multiple frameworks, and a bug that spans two MFEs means debugging two different mental models at once.
- More complex tooling. Testing, linting, CI, and dev tooling now need to support multiple ecosystems instead of one.
The honest, senior answer

Most companies that adopt micro frontends standardize on one framework across all MFEs anyway — they use MFEs for deployment/team independence, not framework diversity. Mixing frameworks is usually a temporary, deliberate choice during a migration, not a permanent architecture goal.

Interview-ready line

"Technically yes — since each MFE is independently built, nothing stops teams from using different frameworks, and tools like single-spa exist specifically to orchestrate that. But in practice, most orgs pick one framework across all MFEs and just use micro frontends for independent deployment — not framework diversity. Mixing frameworks is usually a deliberate, temporary choice during a legacy migration, because the cost — duplicated framework bundles, inconsistent UX, harder hiring and debugging — usually isn't worth paying permanently."

### 8. What is Webpack Module Federation, and how is it different from just publishing an npm package?

What Webpack Module Federation is

Module Federation is a Webpack feature (Webpack 5+) that lets separately built and separately deployed JavaScript applications load code from each other at runtime, in the browser — without any of them being compiled together at build time.

```js
// Checkout's webpack config exposes a module
new ModuleFederationPlugin({
  name: 'checkoutApp',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: ['react', 'react-dom'],
});
```

```js
// Shell's webpack config consumes it
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    checkoutApp: 'checkoutApp@https://checkout.example.com/remoteEntry.js',
  },
});
```

```js
// Shell code — this import is fetched live, from a completely different deployment
const CheckoutApp = React.lazy(() => import('checkoutApp/App'));
```

That last line is the important part: checkoutApp/App isn't sitting in the shell's own codebase or node_modules — it's fetched over the network, at runtime, from wherever Checkout's team most recently deployed it.

How this is different from just publishing an npm package

This is the question that trips people up, because on the surface both are "sharing code between teams." The difference is when and how the code gets combined.

npm package = build-time sharing

```js
1. Checkout team publishes checkout-ui@2.1.0 to npm
2. Shell team runs `npm install checkout-ui@2.1.0`
3. Shell's build BUNDLES that code in, right now, at build time
4. Shell rebuilds & redeploys → the final bundle contains both shell + checkout code together
```

If Checkout ships a fix, the shell has to bump the version, rebuild, and redeploy to pick it up. Nothing changes for the shell until it explicitly reinstalls and re-ships.

Module Federation = run-time sharing

```js
1. Checkout team builds and deploys their app independently, to their own URL
2. Shell's build does NOT contain Checkout's code at all — it just knows the URL to fetch it from
3. At the moment a real user visits /checkout, the BROWSER fetches Checkout's code live
4. If Checkout deploys a new version tomorrow, users get it immediately — shell was never touched
```

Why this matters so much for MFEs specifically

The whole point of micro frontends is independent deployment (as covered earlier — it's an organizational problem, not a code-organization one). An npm package gives you code reuse and separation of ownership, but it doesn't give you independent deployment — the consuming app still has to rebuild. Module Federation is what actually delivers on that promise: Checkout can ship five times today and the shell never even knows a deploy happened, because nothing was rebuilt on the shell's side — it just fetches whatever's live at that URL the next time a user visits.

The trade-off Module Federation introduces

You gain runtime independence, but you also now have to deal with problems that don't exist at build time:

- Version mismatches discovered at runtime, not build time — if Checkout's remote was built against React 18 and the shell is on React 17, you find out when a real user hits an error, not when a CI build fails (this is why shared singleton config and contract testing, covered earlier, matter so much more here).
- A remote can literally be down or slow at runtime, since it's a live network fetch, not a bundled artifact (covered in the "what if a remote fails to load" answer).
Interview-ready line

"An npm package is build-time sharing — the consuming app installs it into its own build, so it has to rebuild and redeploy to pick up a new version. Module Federation is run-time sharing — the shell's build never contains the remote's code at all, just a reference to where to fetch it; the browser pulls in the actual code live, when a user visits that route. That's the difference that actually delivers independent deployability, which is the whole point of micro frontends — Checkout can ship a new version and the shell picks it up automatically on the next page load, with zero rebuild on the shell's side. The trade-off is that failure modes move from build time to run time — a version mismatch or a down remote is now something you discover in production, not in CI, which is why things like shared singleton config, contract testing, and runtime error boundaries matter so much more in this model."

### 9. What's the difference between eager and lazy-loaded shared dependencies?

### 10. If two MFEs need to talk to each other (e.g., "add to cart" updates a header cart icon), how do you do that without tightly coupling them?

The core principle

The two MFEs should never import each other's code directly. If Checkout's cart icon imports something straight from Products' internal files, you've recreated a monolith with extra deployment steps — now you can't deploy one without knowing about the other's internals, which defeats the whole point of independence. Communication has to happen through a shared, neutral contract that neither MFE owns exclusively.

1. Custom Events (the simplest, most common approach)

Use the browser's native event system as a shared bus. Any MFE can dispatch an event; any MFE can listen, without either knowing who's on the other end.

```js
// Products MFE — dispatches an event, doesn't know or care who's listening
window.dispatchEvent(new CustomEvent('cart:item-added', {
  detail: { productId: 42, name: 'Wireless Mouse', price: 29.99 }
}));
```

```js
// Header MFE — listens, doesn't know or care who dispatched it
window.addEventListener('cart:item-added', (e) => {
  updateCartIcon(e.detail);
});
```

Neither MFE imports the other. Neither needs to know the other exists — just the shape of the event (the contract).

2. A shared, minimal event bus / pub-sub library

Same idea as custom events, but wrapped in a small shared package (versioned like the design system) instead of raw DOM events — gives you typed events, easier debugging, and a documented contract:

```js
import { eventBus } from '@yourco/mfe-events';

// Products MFE
eventBus.emit('cart:item-added', { productId: 42 });

// Header MFE
eventBus.on('cart:item-added', (payload) => updateCartIcon(payload));
```

The key discipline: this shared package should define events and their payload shapes, not business logic — it stays a thin communication layer, not a place where coupling creeps back in.

3. A small shared state slice (used carefully)

For state genuinely shared across the whole app — like "is the user logged in" or "how many items are in the cart" — a tiny, app-wide store (not a giant shared Redux store with all business logic) can work:

```js
// Shell owns this, exposes read/write to it
sharedStore.set('cartCount', 3);
sharedStore.subscribe('cartCount', (count) => updateCartIcon(count));
```

The trap to avoid: this should hold a handful of genuinely cross-cutting values (auth, cart count, current locale) — not become a dumping ground where every MFE starts putting its own internal state "just in case someone else needs it." That's how you slowly rebuild one big coupled store.

4. URL/query params for navigation-related state

If the "communication" is really about navigation (e.g., "go to checkout with this item pre-selected"), the URL itself is often the cleanest shared channel — no event system needed:

```js
/checkout?highlight=42
```

Both MFEs read from the same URL; nobody has to explicitly notify anyone.

5. What to explicitly avoid
- Direct imports between MFE source code (breaks independent deployability entirely)
- A shared global Redux/state store holding everyone's business logic — becomes a hidden coupling point that's hard to trace and version
- Reaching into another MFE's DOM directly to read/manipulate its state — extremely fragile, breaks the moment that MFE's internal markup changes

The underlying discipline

Whatever mechanism you pick, the important part is: define event/data contracts explicitly, version them, and treat changes to that contract like a breaking API change — because that's exactly what it is. If Products changes the shape of cart:item-added's payload without warning, Header silently breaks, even though neither team touched the other's code. This is exactly where contract testing (covered earlier) earns its keep.

Interview-ready line

"I'd never let MFEs import each other directly — that recreates monolith-style coupling with extra deployment steps. Instead, I'd use a neutral shared channel: custom browser events or a thin shared event-bus package for one-off notifications like 'item added to cart,' and a small, deliberately minimal shared state slice — owned by the shell — for genuinely cross-cutting values like cart count or auth state. The discipline that matters is treating the event/data shape as a versioned contract between teams, the same way you'd treat a public API, so a payload change doesn't silently break a sibling MFE that never touched the code that changed."

### 11. Should MFEs share a global state store (like one big Redux store)? Why or why not?

Short answer: No — not as a rule, and it's one of the most common MFE anti-patterns

A single, giant shared Redux store containing everyone's state is basically re-building a monolith's internals, just spread across independently deployed codebases. You get all the coupling of a shared store, with none of the safety a monolith normally has (like the compiler catching a breaking change across the whole codebase at build time).

Why it seems tempting at first

It genuinely feels convenient early on: "we already need to share cart count and auth state — let's just have one big store everyone reads and writes to." It solves the immediate problem quickly. The trouble shows up later, as more teams start relying on it.

Why it breaks down in practice

1. It silently recouples independently deployed teams.
The whole point of MFEs is that Checkout can deploy without coordinating with Products. But if both read/write to the same store, a shape change Products makes to their slice of state can break Checkout at runtime — with no compiler, no shared repo, and no code review to catch it. You've reintroduced tight coupling, just invisibly.

2. Ownership gets blurry.
Whose job is it to maintain the user slice, or the notifications slice? In a monolith this is annoying but visible — everyone's in one repo. Across MFEs, it becomes genuinely unclear who's allowed to change what, and teams start being afraid to touch shared state for fear of breaking someone else.

3. Version mismatches get worse, not better.
If the store library itself (e.g., Redux, or a specific version of it) is shared as a singleton across MFEs built independently, you're now also managing a shared-library version problem for your most central piece of state — the worst possible place for that kind of fragility.

4. It becomes a dumping ground.
Once one shared store exists, the path of least resistance for any new cross-cutting need is "just add it to the shared store" — even for things that shouldn't be shared. Over time the store balloons into holding business logic that really belongs inside one MFE, and the boundary between MFEs erodes back toward a monolith.

What to do instead
- Keep state local to each MFE by default. Most state a team needs is genuinely internal to their feature and shouldn't leave their app at all.
- Share only a small, deliberately minimal slice of truly cross-cutting values — cart count, auth/session, current locale — ideally owned by the shell, not any single feature team.
- Communicate changes via events, not shared mutable state (as covered in the previous question) — Products announces "an item was added," Header reacts and updates its own local state, rather than both reading/writing the same object.
- Treat the shape of anything shared as a versioned contract, same discipline as an API — because that's functionally what it is once multiple independently-deployed teams depend on it.
The distinction that matters

Shared events (announcements) are loosely coupled — a sender doesn't need to know who's listening, or even if anyone is.
Shared mutable state (a store) is tightly coupled — every reader now implicitly depends on every writer's internal shape, forever, across teams that don't share a deploy cycle.

Interview-ready line

"No — a single shared store re-creates monolith-style coupling across teams that are supposed to be independently deployable, except now there's no compiler or shared repo to catch a breaking change when one team alters the shape of their slice. I'd keep state local to each MFE by default, and only share a small, deliberately minimal set of truly cross-cutting values — like cart count or auth — ideally owned by the shell. For everything else, I'd favor events over shared mutable state: a sender announces something happened, and each MFE updates its own local state in response, instead of every team reading and writing the same object."


### 12. How do you handle authentication/session across MFEs owned by different teams?

The core principle

Authentication should be handled once, in one place — never duplicated across MFEs. If every team builds their own login flow or independently manages tokens, you get inconsistent session handling, security gaps, and a broken experience (e.g., a user logged out of Checkout but still "logged in" in Products). Auth is exactly the kind of genuinely cross-cutting concern that belongs to the shell, not any individual remote.

1. The shell owns authentication

The shell handles login, logout, token storage, and session refresh. Remotes never implement their own auth flow — they just consume the session the shell already established.

```js
// Shell — owns the auth lifecycle
function Shell() {
  const { user, token, login, logout } = useAuth(); // shell's own auth logic

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      <ProductsMFE />
      <CheckoutMFE />
    </AuthContext.Provider>
  );
}
```

If a user isn't authenticated, the shell redirects to login before any remote even mounts — remotes can generally assume "if I'm rendering, the user is authenticated."

2. Sharing the session with remotes

A few common ways remotes get access to the current session:

Shared cookie (simplest, works across separately-hosted MFEs on the same domain)

```js
Set-Cookie: session=abc123; Domain=.example.com; HttpOnly; Secure
```

If all MFEs live under the same parent domain (shell.example.com, checkout.example.com), a cookie scoped to .example.com is automatically sent with every request from any of them — no extra wiring needed. This is often the cleanest option because the browser does the work for you.

Shared auth context/props (when remotes are mounted directly into the shell's React tree)

```js
// Remote reads auth via context the shell provided — never fetches its own token
const { user, token } = useContext(AuthContext);
```

A small shared auth SDK/package

```js
import { getToken, getCurrentUser } from '@yourco/auth-sdk';
```

Useful when remotes need to call this from non-React code, or when MFEs are more loosely composed (not all mounted in one React tree) — gives every team the same interface without needing direct context access.

3. Token refresh — also centralized

If access tokens expire, refresh logic should live in one place (the shell or the shared auth SDK), not be reimplemented per remote:

```js
// Shared SDK — every remote calls this, none of them implement refresh logic themselves
const token = await authSDK.getValidToken(); // handles refresh internally if expired
```

If every MFE independently tried to detect expiry and refresh, you'd get race conditions — multiple simultaneous refresh calls, or one MFE using a stale token another already refreshed.

4. Logout has to propagate everywhere

When a user logs out, every MFE needs to reflect that immediately — an MFE that doesn't know the session ended could keep showing stale personalized data or let a request go out with a dead token.

```js
// Shell broadcasts logout; every MFE listening reacts
window.dispatchEvent(new CustomEvent('auth:logout'));
```

```js
// Each remote — clears its own local state on logout, doesn't manage the session itself
window.addEventListener('auth:logout', () => resetLocalState());
```

5. What to avoid
- Each MFE independently calling the login API or managing its own token storage — duplicated logic, inconsistent expiry handling, and a real security surface-area problem (more places tokens can be mishandled).
- Passing tokens through URLs — leaks into browser history, logs, and referrer headers.
- Assuming client-side auth checks are sufficient — every MFE's backend calls still need server-side token validation; the shell owning the frontend session doesn't replace real API-level auth.

Interview-ready line

"Auth is a cross-cutting concern, so I'd centralize it in the shell — one login flow, one place tokens are stored and refreshed — and have remotes simply consume the session rather than manage their own. Depending on the setup, that's either a cookie scoped to the parent domain so the browser handles propagation automatically, or a shared auth context/SDK if remotes need programmatic access. Logout gets broadcast as an event so every MFE reacts and clears its own state immediately, rather than each one independently polling or guessing session status. The thing I'd actively avoid is any remote implementing its own login or token-refresh logic — that's exactly the kind of duplicated, inconsistent behavior that centralizing auth is meant to prevent."

### 13. What happens if a remote MFE fails to load or is slow — how do you prevent it from breaking the whole page?

Why this matters more in MFEs than a normal app

In a monolith, if one part of the bundle fails to load, usually the whole build fails together and you catch it before deploy. In a micro frontend setup, remotes are fetched live, over the network, at runtime — so a remote can fail for reasons totally outside your control at that exact moment: their CDN is down, their deploy just broke, the network is slow, a version mismatch causes a runtime error. The shell has to defend itself against that, because it doesn't control when or how a remote fails.

1. Error boundaries around every remote

The most basic defense: wrap each remote in a React error boundary so a crash inside one MFE doesn't take down the whole React tree.

```js
<ErrorBoundary fallback={<CheckoutUnavailable />}>
  <Suspense fallback={<Loading />}>
    <CheckoutMFE />
  </Suspense>
</ErrorBoundary>
```

If Checkout throws an error while rendering, the user sees a contained fallback message in that section — Products, the header, and navigation keep working normally.

2. Timeout the remote fetch — don't wait forever

If a remote's remoteEntry.js is slow or hanging, you don't want the user staring at a blank loading spinner indefinitely. Wrap the dynamic import with a timeout that fails fast and falls back:

```js
function loadWithTimeout(importFn, ms = 5000) {
  return Promise.race([
    importFn(),
    new Promise((_, reject) => setTimeout(() => reject(new Error('MFE load timeout')), ms))
  ]);
}
```

A fast, clear failure ("Checkout is temporarily unavailable, try again") is a much better experience than an indefinite spinner.

3. Retry logic for transient failures

Not every failure means the remote is truly down — sometimes it's a flaky network blip. A short retry (with backoff) before giving up avoids unnecessarily showing an error for a one-off glitch:

```js
async function loadRemoteWithRetry(importFn, retries = 2) {
  try { return await importFn(); }
  catch (err) {
    if (retries > 0) return loadRemoteWithRetry(importFn, retries - 1);
    throw err;
  }
}
```

4. Meaningful fallback UI, not a broken hole in the page

The fallback shouldn't just be blank space — that's confusing and looks broken. Show something intentional: "This section is temporarily unavailable," a retry button, or (where sensible) a simplified static version of that section.

5. Circuit breaker for a remote that's consistently failing

If a remote has failed repeatedly in a short window, stop hammering it with more requests (which wastes time and can worsen the problem on their end) and go straight to the fallback for a cooldown period:

```js
3 failures in 60s → skip trying to load this remote for the next 2 minutes
→ show fallback immediately instead of retrying every time
```

6. Don't let one remote's version mismatch break the shared runtime

If a remote was built against a different (incompatible) version of a shared singleton dependency — e.g., React — that mismatch can cause subtle or hard crashes, not just a clean "failed to load." This is why shared dependency version ranges (requiredVersion in Module Federation) and pre-deploy contract testing (covered earlier) matter: they catch the incompatibility before it reaches a real user, rather than relying on runtime defenses alone.

7. Monitor and alert on remote load failures specifically

Track remote load failures as their own metric (not lumped into generic JS errors), so you know immediately "Checkout MFE failed to load for 8% of users in the last 10 minutes" — this is what lets you catch and roll back a bad deploy fast, tying back to the rollback strategy covered earlier.

Interview-ready line

"I treat every remote as something that can fail independently, at runtime, for reasons outside my control — so the shell needs to defend against that at multiple layers: an error boundary around each remote so a crash stays contained, a timeout on the load itself so a slow remote doesn't hang the page indefinitely, a short retry for transient network blips, and a meaningful fallback UI rather than blank space. For a remote that's failing repeatedly, I'd add a circuit breaker to stop retrying and just show the fallback for a cooldown period. And I'd back all of that with monitoring specifically on remote-load failures, so a bad deploy gets caught and rolled back fast instead of silently degrading the experience for users."


### 14. How do you test a system made of independently deployed MFEs?

The core challenge

You can't just run one big E2E test suite across "the whole app" the way you would for a monolith — the pieces are built, versioned, and deployed independently, often by different teams on different schedules. If your only safety net is "spin up everything together and click through it," you've basically recreated the monolith's coordination problem, just with extra steps. So the strategy has to work at multiple levels.

1. Unit tests — inside each MFE, same as normal

Nothing special here — each MFE is tested in isolation for its own logic, same as any standalone app. This is the cheapest, fastest layer, and should catch the vast majority of bugs before anything cross-MFE is even considered.

2. Component/integration tests — still isolated

Test how components within one MFE work together (forms, state updates, API calls) — still without needing the shell or any other MFE running. Tools like Testing Library, Cypress Component Testing, or Storybook interaction tests fit here.

3. Contract testing — the layer that's actually MFE-specific

This is the piece that doesn't exist in a normal monolith and matters a lot here: how do you know a remote still works correctly with the shell, without spinning up the whole system?

- Define a contract: what props/API does the shell expect a remote to expose? What shape does shared state or an event payload have?
- Tools like Pact let the shell define its expectations as a contract, and the remote's CI verifies it still satisfies that contract — independently, without the shell literally running.

```js
Shell says: "I expect Checkout to expose a `mount(el, props)` function
             and emit a `cart:updated` event with { itemCount: number }"
Checkout's CI: runs against that contract before every deploy
```

This catches breaking changes before they hit production, without needing a full integrated environment.

4. Visual regression testing per MFE

Catch unintended UI/style changes within one MFE (Percy, Chromatic, etc.) — again, isolated, no need for the full composed app.

5. Integration/E2E — but targeted, not exhaustive

Full end-to-end tests across multiple MFEs together are still valuable — but sparingly, for critical user journeys only (e.g., "browse product → add to cart → checkout"), not for every possible interaction. Running exhaustive E2E across every MFE combination for every deploy gets slow and brittle fast, and partly defeats the purpose of independent deploys if every team's release is gated on a giant shared E2E suite.

A common pattern: run these against a staging environment where all MFEs' latest versions are composed together, on a schedule or before major releases — not on every single commit from every team.

6. Synthetic monitoring in production

Because you can't realistically test every combination pre-deploy, many teams lean on production monitoring as a safety net: synthetic tests that continuously run key user flows against the live site, catching integration issues that slipped through (e.g., a remote's contract silently drifted) shortly after they happen, rather than relying purely on pre-release testing to catch everything.

7. Feature flags for safer exposure

Combine with gradual rollout (as covered in the rollback question) — ship a new remote version behind a flag, verify it against real traffic at low percentage, then ramp up. This effectively turns "testing" into an ongoing, low-risk production process rather than a one-time pre-release gate.

Interview-ready line

"I'd layer it: unit and component tests inside each MFE in isolation, like any normal app — that catches most bugs cheaply. Then contract testing between shell and remotes, so a breaking change to the interface gets caught in a team's own CI without needing the whole system running together. Full cross-MFE E2E tests I'd keep narrow — just the critical user journeys — run against a staging environment where everything's composed, not gating every single team's deploy. And I'd back all of that with production synthetic monitoring and gradual/canary rollouts, since you genuinely can't pre-test every possible combination of independently-shipped versions — some of that risk has to be caught by fast detection in production instead of prevented entirely upfront."

### 15. How do you roll back just ONE MFE without redeploying everything else?

Why this is possible at all

This only works cleanly if you're using run-time composition (Module Federation or similar) — where each MFE is deployed to its own separate location and the shell loads it dynamically at runtime. If you're on build-time composition (MFE code gets bundled into the shell at build time), rolling back one MFE means rebuilding and redeploying the shell too — which defeats a big part of the point. So the setup below assumes run-time composition.

1. Deploy each MFE version to an immutable, versioned location

Never deploy a remote to the same URL every time (e.g., checkout.example.com/remoteEntry.js getting overwritten on every release). Instead, version the deployment path itself:

```js
checkout.example.com/v1.4.0/remoteEntry.js
checkout.example.com/v1.4.1/remoteEntry.js   ← bad release
checkout.example.com/v1.4.2/remoteEntry.js   ← rollback target
```

Because old versions are never deleted or overwritten, "rolling back" is just a matter of pointing somewhere that already works — nothing needs to be rebuilt.

2. Keep the "which version is live" decision outside the code

The shell shouldn't have a hardcoded remote URL baked into its own build — otherwise, changing it means redeploying the shell, which is exactly what you're trying to avoid. Instead, the shell reads the current remote URL from something it can update independently:

- A small manifest/config service (a JSON file or lightweight API) the shell fetches at runtime: { "checkout": "https://checkout.example.com/v1.4.0/remoteEntry.js" }
- Or a feature flag / config platform (LaunchDarkly, a homegrown config service, etc.)

Rolling back = updating that one config value to point at the previous version's URL. No shell rebuild, no other MFE touched.

3. Roll out gradually, not all-at-once, so rollback is rarely even needed

Before a new version goes to 100% of users, ship it to a small percentage first (canary release) or behind a feature flag:

```js
v1.4.1 → 5% of traffic → watch error rates/CWV → 50% → 100%
```

If something's wrong, you catch it at 5% and flip back, instead of finding out after every user already has the broken version.

4. Make sure the previous version still works with everything else it talks to

This is the part that's easy to overlook: rolling back Checkout to v1.4.0 only works safely if v1.4.0 is still compatible with whatever contract the shell and other MFEs expect right now — shared component library version, shared state shape, exposed module API. This is why contract testing between host and remotes matters — it catches the case where an old remote version silently breaks against a newer shell.

5. Have monitoring that tells you which MFE to roll back

Per-MFE error tracking and performance monitoring (as covered in the performance question) is what makes rollback fast and targeted, instead of a guessing game — you want an alert that says "Checkout MFE v1.4.1 is throwing errors" rather than a vague "the site broke" report that takes an hour to trace to one team's deploy.

Interview-ready line

"This only works with run-time composition — each MFE deployed to its own versioned, immutable URL, never overwritten in place. The shell reads which version to load from an external config or manifest, not a hardcoded value in its own build, so 'rolling back' is just updating that config to point at the last known-good version — no shell rebuild, no other MFE touched. I'd pair that with gradual/canary rollouts so most bad releases get caught before they're at 100%, contract testing so an old remote version doesn't silently break against a newer shell, and per-MFE monitoring so you know exactly which team's deploy to roll back instead of guessing."



### 16. How do you keep performance (bundle size, load time) under control when every team ships independently?

The core tension

Micro frontends give teams independence — but independence is exactly what causes performance problems: five teams shipping separately means five separate opportunities to bloat bundles, duplicate dependencies, or ship something slow, with no single person watching the whole page's total weight. Here's how you keep that in check.

1. Share common dependencies instead of duplicating them

If Products, Checkout, and Account all use React, you don't want the user downloading React three times. With Module Federation, mark shared libraries as singletons:

```js
shared: {
  react: { singleton: true, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true },
  '@yourco/design-system': { singleton: true }
}
```

This means the framework and design system get fetched once, and every MFE reuses that same instance instead of bundling its own copy.

2. Lazy-load remotes — don't load what isn't visible

Just like route-based code splitting in a normal SPA, MFEs should only load when their route is actually visited:

```js
const CheckoutMFE = React.lazy(() => import('checkoutApp/App'));
```

A user browsing Products shouldn't pay the download cost of Checkout's JS at all until they navigate there.

3. Set and enforce a performance budget per MFE

Give every team a bundle size ceiling (e.g., "your MFE's JS must stay under 150KB gzipped") and fail CI if they exceed it:

```js
webpack-bundle-analyzer / bundlesize in CI
→ PR fails if bundle exceeds threshold
```

This is what prevents the "death by a thousand cuts" problem — no single team's addition seems catastrophic, but 5 teams each adding 200KB "just this once" adds up fast, with nobody accountable for the total.

4. Monitor Core Web Vitals per MFE, not just the whole page

Track LCP, CLS, INP broken down by which MFE was active/loading, so when performance regresses, you know exactly which team's deploy caused it — instead of a vague "the site got slower" ticket nobody can trace.

5. Prefetch intelligently, not eagerly

For MFEs the user is likely to visit next (e.g., prefetch Checkout once they've added something to cart), use <link rel="prefetch"> or Webpack's prefetch comments — but only for high-probability next steps, not everything, or you lose the benefit of lazy loading in the first place.

```js
const CheckoutMFE = React.lazy(() => import(/* webpackPrefetch: true */ 'checkoutApp/App'));
```

6. Watch out for CSS and asset duplication too

It's not just JS — if every MFE ships its own copy of the same font files, icon sets, or global CSS reset, that duplicates too. Shared static assets should be centralized (CDN-hosted, versioned) rather than bundled per MFE.

7. Governance: someone has to own "the whole page"

Even with all the tooling above, someone — often a platform/architecture team — needs to own page-level performance as a metric, not just per-MFE metrics. Without a person/team responsible for the aggregate, it's easy for every individual team to hit their own budget while the total experience still degrades.

Interview-ready line

"The main risk is that independence means no one owns total page weight by default. I'd mitigate that with shared singleton dependencies so frameworks aren't duplicated, lazy-loading remotes so users only pay for what they visit, and a hard bundle-size budget enforced in each MFE's CI so regressions get caught before merge, not in production. On top of that, I'd monitor Core Web Vitals broken down per MFE so a regression is traceable to a specific team's deploy, and make sure a platform team owns the aggregate page performance number — because per-team budgets alone don't guarantee the whole page stays fast."


### 17. How do we implement Micro-Frontend Architecture in React?

Micro-frontend architecture means splitting a frontend application into smaller independently owned and independently deployable frontend apps.

Simple meaning:

```text
Microservices split backend by business domain.
Micro-frontends split frontend by business domain.
```

Example domains:

- Auth app
- Dashboard app
- User management app
- Billing app
- Reports app

Each micro-frontend can be owned by a different team and can be built/deployed independently.

#### Common implementation approaches

| Approach | Meaning |
|---|---|
| Build-time integration | Apps are imported during build |
| Runtime integration | Apps are loaded dynamically in browser |
| Module Federation | Webpack/Vite plugin exposes and consumes remote modules |
| iframe-based | Each app runs inside iframe |
| Web Components | Micro-apps expose custom elements |
| Multiple React roots | Different roots mounted into different DOM nodes |

#### Basic shell/container architecture

```text
Shell App
  -> handles routing/layout/auth
  -> loads Auth micro-frontend
  -> loads Dashboard micro-frontend
  -> loads Billing micro-frontend
```

Shell example:

```tsx
function AppShell() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardApp />} />
        <Route path="/billing/*" element={<BillingApp />} />
        <Route path="/users/*" element={<UserManagementApp />} />
      </Routes>
    </Layout>
  );
}
```

#### Multiple roots approach

For simple micro-frontend/widget scenarios, each micro-app can mount itself into its own DOM node:

```tsx
import { createRoot } from 'react-dom/client';
import BillingWidget from './BillingWidget';

const container = document.getElementById('billing-widget');

if (container) {
  createRoot(container).render(<BillingWidget />);
}
```

#### Communication between micro-frontends

Micro-frontends should avoid tight coupling.

Common communication options:

- URL state for route-level communication
- shared backend APIs
- shared auth token/session
- custom browser events
- external state store if apps run in the same page
- message bus/event bus

Example with custom event:

```tsx
window.dispatchEvent(
  new CustomEvent('user:changed', {
    detail: { userId: 'U101' },
  })
);
```

#### Shared concerns

Micro-frontends need clear standards for:

- authentication
- routing
- design system
- shared dependencies
- error handling
- logging/monitoring
- deployment/versioning
- performance budgets

#### Benefits

- independent team ownership
- independent deployment
- easier scaling for large organizations
- isolated business domains
- gradual migration from legacy frontend

#### Challenges

- more architecture complexity
- shared dependency/version conflicts
- duplicated bundle size
- routing coordination
- cross-app communication
- consistent design system
- testing and monitoring across apps

When to use:

```text
Use micro-frontends for large products with multiple teams and independent release needs.
Do not use micro-frontends for small or medium apps where normal modular React architecture is enough.
```

Interview answer:

```text
Micro-frontend architecture splits a large frontend into smaller independently owned and deployable applications. A shell/container app usually handles layout, routing, authentication, and loads domain-specific micro-apps like dashboard, billing, or users. Communication should happen through URL state, browser events, shared APIs, or external stores. It is useful for large teams and large products, but it adds complexity, so I would not use it for small apps.
```

### 18. Will have separate code base for each micro frontend apps?
Not necessarily. While each micro frontend app will have logical isolation, they do not require entirely separate code repositories. You can organize your codebases using two main strategies depending on your team's workflow and DevOps preferences:

1. Monorepo (Single Repository) <br/>
All micro frontend apps live inside a single code repository but are divided into distinct folders.
- How it works: You use tools like Turborepo, Nx, or Lerna to manage them.
- Best for: Small to medium teams that want easy code sharing, unified version control, and simplified dependency management.

2. Polyrepo (Separate Repositories)<br/>
Each micro frontend app lives in its own completely separate code repository.

- How it works: Every application has its own independent source control, build setup, and CI/CD pipeline.
- Best for: Large, cross-functional enterprise teams requiring strict boundaries, total autonomy, and isolated deployment cycles.

Core Architecture Requirements
Regardless of whether you choose a single or separate repository, every micro frontend app must maintain:
- Independent build and deployment cycles
- Autonomous business logic boundaries
- Isolated testing pipelines
- Individual deployment endpoints at runtime


### 19. How to set up Webpack Module Federation for a React app?
To set up Webpack Module Federation for a React app, you need a Host (the main shell app) and a Remote (the mini-app being shared).

Here is the simplest step-by-step setup using Webpack 5.

1. Configure the Remote App (The Shared Mini-App)<br/>
This app creates a component and exposes it to the world.

Step A: Create the component<br/>
Create a simple component you want to share, for example, Button.jsx.

```js
// src/Button.jsx
import React from 'react';

const Button = () => <button style={{ background: 'blue', color: 'white' }}>Shared Button</button>;

export default Button;
```

Step B: Update webpack.config.js<br/>
Configure the Module Federation plugin to expose this button.

```js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  // ... standard webpack configuration (entry, output, devServer port: 3001)
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button.jsx',
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
      },
    }),
  ],
};
```

- name: The unique identifier for this remote app.
- filename: The entry file name that the Host will look for.
- exposes: The map of components you want to share and their file paths.
- shared: Forces the apps to share a single instance of React so it doesn't load twice.

2. Configure the Host App (The Main Shell)
This app pulls in the component from the Remote app.

Step A: Update webpack.config.js<br/>
Point the Host to the Remote app's URL (running on port 3001).

```js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  // ... standard webpack configuration (entry, output, devServer port: 3000)
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
      },
    }),
  ],
};
```
- remotes: Defines the nickname (remoteApp) and the exact URL location of the remote entry file.

Step B: Use the remote component with Lazy Loading<br/>
Because the component is loaded over the network, you must load it asynchronously using React.lazy.

```js
// src/App.jsx
import React, { Suspense } from 'react';

// Import from '[remote name]/[exposed path]'
const RemoteButton = React.lazy(() => import('remoteApp/Button'));

const App = () => (
  <div>
    <h1>Main Host Application</h1>
    <Suspense fallback={<div>Loading Shared Button...</div>}>
      <RemoteButton />
    </Suspense>
  </div>
);

export default App;
```

3. Run the Apps<br/>
- Start the Remote app (npm start on port 3001).
- Start the Host app (npm start on port 3000).
- Open http://localhost:3000. You will see your host app running with the button served dynamically from the remote app.

### 20. What strategies do you use for cross-micro-frontend communication? How do you prevent tight coupling?
To maintain loose coupling, avoid direct imports or sharing a single global state (like a massive Redux store) across different micro-frontends. Instead, use these decoupled patterns:

- Custom Browser Events (Pub/Sub): Use standard DOM CustomEvent dispatched on the window object. This keeps apps completely framework-agnostic.
- Custom Event Bus: A tiny, isolated utility layer (RxJS or a simple emitter) shared at runtime.
- Route/URL Parameters: The cleanest state passing mechanism for navigation. If Micro-frontend A needs to tell Micro-frontend B which user is active, pass userId via the URL query string.
- Web Storage (SessionStorage/LocalStorage): Ideal for persistent, non-reactive data like authentication tokens or user profile baselines.

### 21. Explain Webpack Module Federation. How does it handle shared dependencies and version mismatches (e.g., Host uses React 17, Remote uses React 18)?

- Mechanism: Module Federation allows a JavaScript application to dynamically load code from another application at runtime. It distinguishes between a Host (consumes remotes) and a Remote (exposes modules).
- Dependency Sharing: You configure a shared object in the Webpack configuration.
- Version Mismatches:<br/>
- Semantic Versioning (Styles): Webpack automatically determines the highest compatible version available based on semver rules.
- Singleton Requirement: For libraries maintaining global state (like React or Vue), you must explicitly set singleton: true.
- Resolution: If Host has React 17 and Remote requires React 18 with singleton: true, Webpack will throw a runtime warning/error or fallback depending on configuration (strictVersion: true). As an architect, you must enforce a unified baseline for singleton core libraries across teams or use standard Web Component wrappers to isolate the frameworks entirely.

### 22. How do you choose between Build-time (npm packages) and Run-time (Module Federation) integration? What are the architectural trade-offs?

1. Build-time Integration: Micro-frontends are published as npm packages and compiled into a single monolith package at build time.
- Pros: Highly predictable, easy dependency resolution, strict version control, and strong type safety across boundaries.
- Cons: Release coupling. If Micro-frontend A updates, the host container must re-compile and re-deploy. It defeats the core purpose of independent deployment.

2. Run-time Integration: Micro-frontends are loaded dynamically in the browser (e.g., via Webpack Module Federation, Native ESM, or SystemJS).
- Pros: Complete deployment independence. Teams can push updates instantly without touching the host app.
- Cons: Harder to manage version conflicts, risk of runtime crashes if an API contract breaks, and trickier local debugging.

Verdict for 9+ YoE: For true micro-frontend autonomy, Run-time integration via Module Federation or Native ESM is the industry standard. Build-time is generally reserved for shared, highly stable design system component libraries.

### 23. How Routing works in Micro Frontend app in React?
Routing in a React micro frontend (MFE) setup works differently depending on your architecture, but the core idea is: one app owns the browser URL, and everyone else reacts to it. Here's how it plays out in practice.

The Core Concept: Shell/Host Owns the Router

In most MFE setups, you have a shell (host) app and multiple remote MFEs. The shell owns the top-level routing; remotes either get mounted based on the route, or own routing only within their own "slice" of the URL.

```js
/                    → Shell shows Home MFE
/products            → Shell mounts Products MFE
/products/:id        → Products MFE owns internal sub-routing
/checkout            → Shell mounts Checkout MFE
/account/*           → Account MFE owns everything under /account
```

Pattern 1: Route-Based Mounting (most common with Module Federation)

The shell has a single react-router instance. Each route lazily loads a remote MFE as a component.

```js
// Shell App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const ProductsApp = lazy(() => import('productsApp/App'));
const CheckoutApp = lazy(() => import('checkoutApp/App'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<ProductsApp />} />
          <Route path="/checkout/*" element={<CheckoutApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

Note the /* — this hands off everything under /products to the remote.

Inside the remote MFE, it uses its own nested <Routes> for sub-paths:

```js
// Products MFE - exposed App.jsx
import { Routes, Route } from 'react-router-dom';

function ProductsApp() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/:id" element={<ProductDetail />} />
    </Routes>
  );
}
```

Critical gotcha: the remote MFE does NOT wrap itself in its own <BrowserRouter>. There can only be one router instance controlling window.history — if each MFE has its own BrowserRouter, they'll fight over history state and break navigation. The remote just uses <Routes>/<Route>, inheriting the router context from the shell.

Pattern 2: Each MFE is a Fully Independent App (no shared router)

Used when MFEs are truly standalone (e.g., iframe-based, or separate deployments not using Module Federation at the component level). Here, routing is done via full or soft page navigation between apps, often coordinated by:

- A thin application shell that just does <a href> links or window.location changes between differently-deployed apps
- A reverse proxy / edge router (nginx, edge-side includes) that maps URL prefixes to different deployed apps entirely — e.g., /products/* is literally served by a different server/build than /checkout/*

This avoids any shared React Router instance entirely, at the cost of full page reloads (or careful use of the History API to fake soft navigation).

Pattern 3: Custom Event-Driven Routing (framework-agnostic MFEs)<br/>
If MFEs aren't all React (some Vue, some vanilla), you can't share react-router context. Instead:

- Use the native browser History API (pushState, popstate) as the shared contract
- Each MFE listens to popstate / a custom event bus and decides whether to render based on the current path
- A root orchestrator (sometimes single-spa) tells each MFE to mount/unmount based on path matching

This is essentially what single-spa does — it's not React-specific, and it manages the "activity function" (a path-matching function) per MFE to decide who should be active.

```js
registerApplication({
  name: 'products',
  app: () => System.import('productsApp'),
  activeWhen: (location) => location.pathname.startsWith('/products'),
});
```

Noteeeeeeeee - let's simplify this a lot. Forget Module Federation, single-spa, edge routing for a second. Just focus on the one idea that matters.

The One Rule

Only ONE app is allowed to control the browser's address bar. Everyone else just reacts to it.

That "one app" is usually called the shell (or host). Every other MFE is a guest that gets told "hey, render yourself now" — it never touches the URL directly.

Think of it Like a TV and Channels

- The shell = the TV. It has the remote control (the URL).
- Each MFE = a channel (Products, Checkout, Account).
- When you press "channel 5", the TV switches to Channel 5's content.
- Channel 5 doesn't control the TV — it just displays when it's selected.

So in React terms:
```js
// SHELL — this is the only place with <BrowserRouter>
<BrowserRouter>
  <Routes>
    <Route path="/products/*" element={<ProductsMFE />} />
    <Route path="/checkout/*" element={<CheckoutMFE />} />
  </Routes>
</BrowserRouter>
```

```js
// PRODUCTS MFE — just decides what to show WITHIN /products
// NO <BrowserRouter> here!
<Routes>
  <Route path="/" element={<ProductList />} />
  <Route path="/:id" element={<ProductDetail />} />
</Routes>
```

Why no second <BrowserRouter>?

Because BrowserRouter is the thing that actually watches and changes the URL. If two apps both try to do that, they step on each other — like two remote controls trying to control one TV at the same time. Chaos.

So the rule is:

- Shell → has BrowserRouter (controls the URL)
- MFEs → only have Routes/Route (just read the current URL and decide what to show)

### 24. When would you not use micro frontends?
It's one of the best signals of seniority in an interview. Here's when micro frontends are the wrong call:

1. Small team, single codebase,<br/>
If one team (or a handful of devs) owns the whole frontend, MFEs add coordination overhead — multiple builds, deployment pipelines, shared-dependency versioning — with no corresponding benefit, since there's no team-autonomy problem to solve in the first place. A modular monolith gets you code organization without the operational tax.

2. Tight deadlines / early-stage product<br/>
MFEs pay off over the long run (independent releases, isolated failures, team scaling). Early on, when the product itself is still being figured out, that overhead slows you down without a payoff yet. Premature MFE adoption is a common regret.

3. Heavy UI/state interdependency<br/>
If most screens deeply share state, form data, or a continuous user flow (e.g., a multi-step wizard where every step depends on the previous one's data), splitting it into independently deployed MFEs creates artificial seams. You end up building complex cross-MFE communication just to simulate what would've been simple local state in one app.

4. No DevOps/platform maturity<br/>
MFEs assume you can support multiple independent CI/CD pipelines, versioned deployments, monitoring per MFE, and contract testing between host/remotes. If the org doesn't have that infrastructure maturity, you get all the complexity of MFEs with none of the reliability benefits — more like N monoliths breaking independently.

5. Strong need for a fully consistent, tightly polished UI<br/>
Products where pixel-perfect consistency and a single cohesive interaction model matter a lot (e.g., a design-forward consumer app) are harder to keep consistent across independently-shipped MFEs, since design system drift across teams is a real, constant problem.

6. When Conway's Law doesn't apply<br/>
MFEs are fundamentally an org-structure pattern mapped onto architecture. If you don't actually have multiple autonomous teams that need to ship independently, you're adopting a distributed-systems-style architecture for a problem you don't have.

"Micro frontends solve an organizational scaling problem — multiple teams needing independent release cycles — more than a technical one. If you don't have that organizational problem, you're just adding distributed-systems complexity to your frontend for no reason. I'd default to a well-structured modular monolith until team-autonomy pain actually shows up, then peel off MFEs incrementally."

### 25. Suppose we have catalogue, localization, payments, orders, auth, coupons and promotions, inventory and so on. How can we have a codebase structure or architecture when we try to setup micro frontend for these features in react?

Good interview topic — this tests whether you understand not just "put React apps together" but domain-driven decomposition, shared contracts, and deployment independence. Here's how I'd structure the explanation.

1. Start with why, not how

In an interview, first justify the boundary. Micro-frontends make sense when:

Teams own domains end-to-end (catalogue team, payments team, orders team) and need independent deploy cycles.
Different domains have different release cadences (coupons/promotions changes weekly, payments changes rarely and needs stricter review).
You want to isolate blast radius — a bug in "promotions" shouldn't be able to crash checkout.

If none of that is true, say you'd just use a modular monolith with good folder boundaries — shows maturity, not just tool-chasing.

2. High-level architecture

Shell (host) app + remotes, using Webpack Module Federation (or Vite's @originjs/vite-plugin-federation / the newer @module-federation/vite) as the mechanism.

```js
shell-app (host)
 ├── auth-mfe        (remote)
 ├── catalogue-mfe    (remote)
 ├── inventory-mfe    (remote)
 ├── orders-mfe       (remote)
 ├── payments-mfe     (remote)
 ├── coupons-promotions-mfe (remote)
 └── localization-mfe (shared lib, not routed — see below)
```

The shell owns: top-level routing, global layout (header/footer/nav), auth session bootstrap, and loading remotes.

3. Mapping their specific domains to MFE boundaries

This is the part that shows real thinking — not every "feature" should be its own MFE.

Routed MFEs (own a URL, own a page): catalogue, orders, payments (checkout), coupons/promotions (if it has its own admin/landing surface).
Shared libraries, not MFEs: auth, localization, inventory (usually), design system. These are cross-cutting — nearly everyone consumes them, but they don't own a screen.
Inventory is a judgment call: if it's purely backend/API-driven data shown inside catalogue/orders, it's not a separate frontend at all — just a data layer. Only make it a separate MFE if there's an actual standalone inventory-management UI (e.g., an internal ops dashboard).

Mention this distinction explicitly in the interview — it shows you're not cargo-culting "one MFE per noun."

4. Repo structure

Two valid answers, know the tradeoff of each:

Monorepo (Nx / Turborepo) — most common in practice:

```js
/apps
  /shell
  /catalogue
  /orders
  /payments
  /coupons-promotions
/packages
  /design-system
  /auth-client        (token storage, refresh, guards)
  /i18n-client         (localization utilities)
  /api-client          (typed fetch/graphql clients)
  /event-bus           (cross-mfe pub/sub)
  /shared-types
```

Pros: shared tooling, atomic cross-cutting changes, easy CI caching (Nx affected graph). Cons: can quietly become a monolith again if you don't enforce boundaries.

Polyrepo — each MFE is its own repo/pipeline, published as versioned packages (design-system, auth-client as npm packages). Pros: true team independence. Cons: dependency drift, harder cross-cutting refactors.

Say: "I'd lean monorepo with Nx module boundaries (enforce-module-boundaries lint rule) to get independent deploys and shared tooling, unless the org already has strong per-team infra."

5. Module Federation config sketch<br/>

```js
// shell webpack.config.js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    catalogue: 'catalogue@https://cdn.site.com/catalogue/remoteEntry.js',
    orders: 'orders@https://cdn.site.com/orders/remoteEntry.js',
    payments: 'payments@https://cdn.site.com/payments/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

```js
// catalogue-mfe webpack.config.js
new ModuleFederationPlugin({
  name: 'catalogue',
  filename: 'remoteEntry.js',
  exposes: { './CatalogueApp': './src/bootstrap' },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

Key point to say out loud: singleton: true on React/ReactDOM is critical — otherwise you get duplicate React instances and broken hooks. This is a classic interview gotcha to mention proactively.

6. Cross-cutting concerns<br/>
- Auth: token/session lives in the shell (or a shared auth-client with its own storage), exposed via context or a tiny global store (e.g., a shared Zustand/Redux slice, or just window.__authClient). Each MFE reads from it, none of them own login state.
- Localization: single i18n instance loaded by the shell, locale + translation bundles passed down via context or shared package, so "$" vs "₹" formatting is consistent everywhere — not reimplemented per MFE.
- Design system: shared component library package (buttons, inputs, price display) so catalogue, orders, and payments don't visually diverge.
- Styling isolation: CSS Modules or CSS-in-JS scoped per MFE, or Shadow DOM if you want hard isolation — mention this to preempt "what if two teams both use a class called .button."

7. Communication between MFEs

Three patterns, pick based on need:

- Props/callbacks when shell mounts a remote directly (simplest, tightest coupling).
- Custom events / event bus (window.dispatchEvent or a shared pub-sub package) for loose coupling — e.g., coupons-promotions MFE broadcasts "coupon applied" and orders/payments listen.
- URL/query params for state that should survive reload/deep-link (cart id, selected coupon code).

Avoid direct imports between MFEs (e.g., orders importing from payments' internals) — that defeats the purpose; only import from the shared packages/.

8. Independent deployment

Each MFE builds and deploys to its own CDN path/bucket independently; shell just points at remoteEntry.js URLs (often via a runtime manifest, not hardcoded, so you can do canary/version pinning without redeploying the shell).

9. Tradeoffs to volunteer (shows seniority)
- Bundle duplication risk if shared deps aren't configured right.
- Runtime integration means bugs surface late (in browser, not build) — need contract tests between shell and remotes.
- Versioning/coordination overhead for shared packages (auth-client, design-system) — someone has to own semver discipline.
- Not every team needs this complexity — a well-organized monolith with domain folders + code owners often gets 80% of the benefit with 20% of the ops overhead.

That last point is worth ending on — interviewers like candidates who can argue against over-engineering their own proposed architecture.

### 26. will we have different codebase for each MFE's or One can handle every MFE's?
Both models exist in practice — the right answer depends on team size and org structure. Let me lay out the options.

Option A: Separate codebase (repo) per MFE — "true" microfrontend<br/>
Each domain team owns its own repo, its own CI/CD pipeline, its own deploy schedule.

```js
catalogue-mfe/       (own repo, own pipeline)
orders-mfe/          (own repo, own pipeline)
payments-mfe/        (own repo, own pipeline)
coupons-promotions-mfe/  (own repo, own pipeline)
shell-app/           (own repo, own pipeline)
```

Shared code (design system, auth-client, i18n-client) gets published as versioned npm packages from separate small repos, and each MFE repo installs them like any other dependency.

When this makes sense: multiple independent teams (5-10+ engineers each), teams want to choose their own release cadence, org is large enough to tolerate the coordination overhead. This is the "each team ships independently, doesn't block on others" model — the actual reason microfrontends exist.

Cost: dependency drift (catalogue is on design-system v3, payments hasn't upgraded from v2), harder to do atomic cross-cutting refactors, more CI/CD infra to maintain, and you need real governance (someone has to enforce version upgrades don't rot).

Option B: One monorepo, multiple MFE apps inside it — much more common in practice<br/>
```js
/apps
  /shell
  /catalogue
  /orders
  /payments
  /coupons-promotions
/packages
  /design-system
  /auth-client
  /i18n-client
```

One repo, one git clone, but still built and deployed as separate bundles — each app in /apps still has its own remoteEntry.js, still deploys independently to its own CDN path. The "micro" in microfrontend is about runtime/
deployment independence, not about literally living in different git repos.

Tools like Nx or Turborepo give you:

- nx affected — only rebuild/redeploy the apps that actually changed, not everything.
- Enforced module boundaries (lint rules that block orders from importing payments/src/internal directly, forcing it through packages/).
- Shared TypeScript configs, ESLint, shared CI pipeline definitions, one PR review flow.
- Atomic commits — if you rename a prop in the design system, you can fix all consuming MFEs in the same PR instead of chasing five repos.

When this makes sense: most mid-size orgs, especially early on. You get independent deploys and clear ownership boundaries (via CODEOWNERS + Nx project boundaries) without the operational tax of N repos and N package-publish pipelines.

What I'd say in the interview

"I'd default to a monorepo with Nx, where each domain — catalogue, orders, payments, coupons/promotions — is a separate app with its own build and its own Module Federation remoteEntry.js, deployed independently. That gives you deployment independence, which is the actual point of microfrontends, without the versioning/coordination overhead of fully separate repos. I'd only split into separate repos once teams are large and autonomous enough that even sharing a monorepo's CI and PR queue becomes a bottleneck — which usually means the org has grown past a certain size, not before."

### 28. In separate MFE's codebases how can we communicate with each domain or services?
Good follow-up — this is where interviewers separate people who've actually built these from people who just know the buzzword. There are really two different communication problems: MFE-to-MFE (frontend-to-frontend) and MFE-to-backend (frontend-to-services). Let me cover both.

1. Frontend-to-frontend communication (the tricky one)

Since each MFE is a separate codebase/deploy, you can't just import from each other — you need runtime mechanisms.

a) Custom Events / Browser Event Bus — most common, framework-agnostic

```js
// coupons-mfe: broadcasts when a coupon is applied
window.dispatchEvent(new CustomEvent('coupon:applied', {
  detail: { code: 'SAVE20', discount: 20 }
}));

// orders-mfe: listens
window.addEventListener('coupon:applied', (e) => {
  updateOrderSummary(e.detail);
});
```

Decoupled — publisher doesn't know who's listening. Good for cross-domain notifications (cart updated, login state changed, locale switched).

b) Shared pub-sub package — same idea, nicer API, published as a versioned package (@org/event-bus) that every MFE installs. Wraps CustomEvent or a tiny in-memory emitter so teams aren't hand-rolling event names and risk typos/collisions. Worth defining a shared event contract (TypeScript types for event names + payloads) in a shared packages/shared-types so producers and consumers stay in sync — this is a good thing to mention, it shows you've thought about the "stringly-typed events break silently" problem.

c) Exposed callback props via Module Federation — when the shell mounts a remote directly and needs tighter coupling:

```js
// shell mounts payments remote, passes a callback
<PaymentsApp onPaymentSuccess={(orderId) => navigate(`/orders/${orderId}`)} />
```

Good for shell-orchestrated flows (checkout stepper: catalogue → cart → payments → confirmation), not great for many-to-many domain chatter.

d) Shared global store (sparingly) — a minimal shared state container (e.g., a single Zustand/Redux store instantiated once by the shell, exposed as a federated module) for things that are genuinely cross-cutting: current user, auth token, locale, currency. Don't use this for domain data (order state, cart contents) — that recreates a monolith's shared mutable state problem across team boundaries, which defeats the isolation you wanted in the first place.

e) URL / query params — for state that should survive a full page reload or be deep-linkable: ?couponCode=SAVE20, ?orderId=123. Simple, framework-agnostic, and doubles as a contract every MFE can read without any JS coordination.

f) postMessage — only relevant if an MFE is sandboxed in an <iframe> (rare with Module Federation, more common with legacy/high-isolation setups). Same idea as custom events but crosses origin boundaries.

### 29. In separate codebase MFE-to-MFE communication and one codebase with monorepo MFE to MFE, still both case can be done with customEvents, shared global stores using Redux, Shared pub-sub package right? there will be no difference right?

Yes — you've got the core insight right. The communication mechanisms themselves (CustomEvents, shared store, pub-sub) are runtime patterns, not repo-structure patterns, so they work identically whether the code lives in one repo or ten. Module Federation loads remotes at runtime via remoteEntry.js regardless of where the source was built from — the browser doesn't know or care if your repos were separate.

But there are real differences, and mentioning them is what makes this answer sound experienced rather than surface-level:

What's genuinely different

1. How the shared package is distributed

2. Type safety on the event/store contract

- Monorepo: TypeScript types for events (CouponAppliedEvent) live in packages/shared-types and are consumed directly — if someone changes a payload shape, TS breaks the build for every consumer in the same PR, caught before merge.
- Separate repos: types are also published as a versioned package, but nothing forces orders-mfe's repo to upgrade it. It'll happily keep building against the old type until someone manually bumps the dependency — so contract drift is only caught at runtime (or via separately maintained contract tests, e.g. Pact).

3. Refactoring cost

- Monorepo: rename an event or change a store shape → fix all consumers atomically in one PR, one CI run.
- Separate repos: same change requires opening PRs across N repos, each on its own review/release cycle — coordination overhead, temporary inconsistency is normal and expected.

4. Testing the integration

- Monorepo: you can spin up shell + all MFEs together in CI relatively easily (same repo, same commit) and run integration tests against real event flows.
- Separate repos: you're testing against whatever version of each MFE is currently deployed to a shared environment (staging), or you rely on contract tests (Pact) since you can't easily run "all repos at their current HEAD" together.

What to say in the interview

"The communication mechanism — events, shared store, pub-sub — is identical in both cases, because it's a runtime concept, not a source-control concept. The real difference is contract safety: in a monorepo, the shared event types and store live in a workspace package, so a breaking change is caught at compile time across every consumer in the same PR. In separate repos, that same package has to be versioned and published, so drift is possible — team A can be on an older contract than team B without anyone noticing until it breaks at runtime. That's exactly why contract testing (e.g. Pact) matters more as you move toward fully separate repos — you're trading compile-time safety for team autonomy, and you need process to fill that gap."


