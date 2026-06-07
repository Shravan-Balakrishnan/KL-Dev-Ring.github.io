# KL Dev-Ring

**Kerala's Builder Network. Ranked by what you ship. Connected by what you build.**

KL Dev-Ring is an open-source network of developers, founders, researchers,
students, hackers, creators, and maintainers with personal websites. There are
no accounts, feeds, likes, or followers. The Git repository is the database,
pull requests are the signup flow, and GitHub Pages is the infrastructure.

## Local development

Requirements: Node.js 20 or newer.

```bash
npm run dev
```

Open `http://localhost:4173`. The project has no runtime or build dependencies.

```bash
npm run validate
npm test
npm run build
```

The production site is emitted to `dist/`.

## Join the ring

1. Fork `KLDevRing/ring`.
2. Copy `members/_template.json` to `members/your-handle.json`.
3. Fill in your public builder information.
4. Run `npm run check`.
5. Open a pull request using the member template.

See [CONTRIBUTING.md](CONTRIBUTING.md) for rules and optional project/activity
fields.

## Embed the widget

```html
<iframe
  src="https://kldevring.github.io/ring/widget.html?member=your-handle"
  title="KL Dev-Ring navigation"
  width="440"
  height="170"
  loading="lazy"
  style="border:0;max-width:100%">
</iframe>
```

## Architecture

Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for product architecture,
scoring, graph generation, deployment, governance, launch strategy, and roadmap.

## License

Code is available under the MIT License. Member profile data remains owned by
the respective members and is published under CC BY 4.0.
