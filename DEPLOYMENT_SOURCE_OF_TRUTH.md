# FluidRWA deployment source of truth

The only production website source is this `FluidRWA-Next-Website` repository on the `main` branch.

## Content changes

1. Edit source content in this repository.
2. When generated pages need refreshing, run `npm run generate:content` locally.
3. Review the generated changes and commit them.
4. Push the commit to `origin/main`.

## Production deployment

Use `npm run deploy:production`. It refuses to deploy when:

- the current branch is not `main`;
- local files are uncommitted;
- local `main` differs from `origin/main`;
- the canonical header or required site files are missing;
- the production build tries to regenerate source pages.

After deployment it checks the homepage, directory, priority vendor pages, membership page, contact page and policy pages for the canonical navigation.

Never deploy from the sibling archive folders (`FluidRWA Homepage`, `FluidRWA May 25th Full website`, or `FluidRWA Service Pages`). They are historical references only.
