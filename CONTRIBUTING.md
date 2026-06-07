# Contributing

## Add yourself

Create one JSON file at `members/<handle>.json`. The filename and `handle` must
match and use lowercase letters, numbers, and hyphens.

Required fields:

```json
{
  "handle": "your-handle",
  "name": "Your Name",
  "github": "github-username",
  "site": "https://your-site.example",
  "city": "Kochi",
  "district": "Ernakulam",
  "country": "India",
  "tags": ["webdev", "opensource"],
  "bio": "A short, factual description of what you build.",
  "joined": "2026-06-07"
}
```

Optional fields:

- `projects`: Up to five objects with `name`, `url`, and `description`.
- `stats`: Generated activity inputs. Maintainers may update these through
  automation; do not inflate them manually.

Rules:

- You must have a working personal website using HTTPS.
- Use one of Kerala's 14 official districts as your home/root district.
- Diaspora builders are welcome; use your current city and country.
- Use 1-8 lowercase, kebab-case tags.
- Keep the bio at 160 characters or fewer.
- Do not add private contact information.
- One member file per pull request keeps review and rollback simple.

Run `npm run check` before opening the pull request.

## Change the product

Open an issue for substantial experience, scoring, governance, or data-model
changes. Small accessibility fixes, bug fixes, and documentation improvements
can go directly to a pull request.

The interface should remain:

- Useful without motion and keyboard accessible.
- Static-host compatible.
- Free of accounts, feeds, reactions, and popularity mechanics.
- Fast on modest phones and connections.
- Distinctly connected to Kerala without tourism clichés.
