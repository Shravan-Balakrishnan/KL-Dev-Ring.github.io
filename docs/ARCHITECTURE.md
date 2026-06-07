# KL Dev-Ring Architecture

## 1. Product architecture

KL Dev-Ring has four product surfaces:

1. **Universe:** The primary discovery surface. Builders are stars, weighted by
   shipping activity and linked by shared tags, district, and location.
2. **Geography:** A Kerala district layer that exposes density without turning
   the experience into a conventional directory.
3. **Trails:** Curated paths through shared craft such as AI, open source,
   systems, web, students, and diaspora.
4. **Identity:** Builder profiles, passports, rankings, badges, and the
   embeddable webring widget.

The product rejects follower graphs, reactions, feeds, and paid ranking.

## 2. Technical architecture

```text
members/*.json
      |
      v
validate.js ---> CI review gate
      |
      v
 build.js
      |
      +-- data/network.json
      +-- builders/<handle>/index.html
      +-- static frontend + widget
      |
      v
 GitHub Pages
```

Node's standard library is the only build dependency. This keeps contributor
setup small and makes long-term maintenance independent of framework churn.

## 3. Repository structure

```text
ring/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE/
│   └── workflows/
├── docs/
├── members/
├── public/
├── scripts/
├── tests/
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

## 4. GitHub organization structure

Recommended repositories in the `KLDevRing` organization:

- `ring`: Product, member registry, generator, and GitHub Pages site.
- `.github`: Organization profile, governance, and community health files.
- `proposals`: Larger RFCs once governance volume warrants separation.

Start with `ring` only. Split repositories when maintenance ownership exists,
not in anticipation of it.

Recommended teams:

- `maintainers`: Merge rights and release responsibility.
- `member-reviewers`: Profile validation and community review.
- `design-stewards`: Visual, motion, and accessibility quality.

## 5. Member ingestion

`members/<handle>.json` is canonical. Required fields are intentionally small.
The build enriches records with score, rank, badges, graph coordinates, links,
district density, and trail membership.

Optional GitHub enrichment can later run on a weekly schedule and commit a
generated `activity/<handle>.json` cache. Keeping fetched activity separate from
human-authored identity prevents merge conflicts and makes provenance clear.

## 6. Pull request validation

CI checks:

- Parse every JSON member file.
- Validate required fields and filename/handle agreement.
- Enforce HTTPS personal sites.
- Validate district, tag, date, and bio formats.
- Reject duplicate handles.
- Run deterministic network and score tests.
- Build all generated artifacts.

Future checks should verify site reachability and GitHub identity, but those
must tolerate outages and rate limits before becoming hard merge gates.

## 7. Graph generation

Each pair of builders receives relationship strength:

- Shared tag: `+2` each.
- Shared district: `+2`.
- Shared current country: `+0.4`.

Each node keeps its three strongest outward relationships. Coordinates are
seeded from the handle, so layouts remain stable across builds. The browser adds
small sinusoidal drift without changing topology.

At 500+ members, replace pairwise comparison with inverted tag/district indexes.
At 2,000+ members, emit cluster tiles and progressively load nearby nodes.

## 8. Builder score

The score rewards sustained output, not audience size:

```text
log2(contributions + 1) * 18
+ min(merged PRs, 75) * 1.8
+ min(projects, 20) * 5
+ min(posts, 40) * 2.2
+ min(streak weeks, 52) * 1.5
```

Caps stop one metric from dominating. There are no stars, followers, likes,
page views, or social reactions. The formula is public and versioned. Material
changes require an RFC and score-version migration.

Weekly badge rules:

- `Record`: Current rank one.
- `Hot`: Top active cohort.
- `Streak`: 30+ active weeks.
- `Writer`: 15+ indexed posts.
- `Diaspora`: Current country outside India.
- `New`: Joined within 60 days.

## 9. Widget architecture

`widget.html?member=<handle>` is a dependency-free iframe:

- Loads the generated network dataset.
- Resolves previous, next, and random navigation.
- Uses the same rank, score, and streak as the main site.
- Works from any personal website without script permissions.

A later web-component package can offer deeper theming, but the iframe remains
the stable and secure baseline.

## 10. Deployment

`deploy.yml` runs validation and tests, creates `dist/`, uploads a Pages
artifact, and deploys it. In repository settings:

1. Set Pages source to **GitHub Actions**.
2. Allow Actions read/write permissions.
3. Protect `main` with the `validate` status check.
4. Require one maintainer approval for member changes.

The site works at `https://kldevring.github.io/ring/` because all asset paths
are relative.

## 11. Local workflow

```bash
npm run dev       # build and serve at localhost:4173
npm run validate  # member contract
npm test          # graph and score behavior
npm run build     # production artifact
npm run check     # complete local CI
```

## 12. Accessibility and performance

- Canvas discovery has equivalent search, district, trail, and profile controls.
- Motion honors `prefers-reduced-motion`.
- The intro can be skipped and is shown only once per browser.
- The frontend ships no framework runtime.
- Graph rendering uses one canvas and caps device pixel ratio.

Before public launch, add a generated HTML builder index for screen-reader and
no-script discovery.

## 13. Launch strategy

**Seed:** Invite 25-40 builders across districts, disciplines, career stages,
and diaspora locations before public release.

**Reveal:** Publish screenshots of the actual constellation, not a generic
launch graphic. Every founding member embeds the widget during launch week.

**Ritual:** Post one weekly trail and one transparent network changelog. Avoid
engagement bait and leaderboards as social competition.

**Community:** Run monthly "ship logs" where builders update projects through
PRs and pair first-time contributors with maintainers.

Success is measured by profile-to-site discovery, district coverage, returning
explorers, merged member PRs, and widget adoption, not raw page views.

## 14. MVP roadmap

### Phase 0: Foundation

- Member schema, validation, static generation, Pages deployment.
- Universe, district layer, trails, profiles, passports, widget.
- Contribution and governance documentation.

### Phase 1: Real activity

- Scheduled GitHub enrichment cache.
- RSS/Atom post indexing.
- Verifiable project ownership.
- Weekly badge snapshots and score versioning.

### Phase 2: Network depth

- Shared repository and contribution links.
- Diaspora globe layer.
- Maintainer-authored trails stored as JSON.
- Accessible generated builder index.

### Phase 3: Community scale

- RFC governance.
- Regional maintainers.
- Event and hackathon constellations.
- Signed widget and profile verification.

## 15. Easter eggs

The initial release includes a keyboard-only alternate signal mode. Additional
discoveries should reveal network information or celebrate builder culture;
they should never block core navigation or become an insider access gate.
