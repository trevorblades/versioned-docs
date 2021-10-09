# Versioned Documentation

This repo is meant to accompany [my blog post](https://trevorblades.com/lab/versioned-docs) about building a multi-version docs site with Gatsby. Please read that post for more details about the techniques used in this repo.

Want to see the finished product? Check out [this hosted example](https://versioned-docs.netlify.app) to see these techniques in action.

## Overview

- Mock "library" source code lives in root-level `src` directory
- MDX-powered Gatsby site lives in the `docs` directory
- Content for the latest version lives at `docs/content`
- Older version content is hosted on [the `v1` branch](https://github.com/trevorblades/versioned-docs/tree/v1)

## Local development

You may find it easier to learn by _doing_. I know I certainly do. Fork this repo and play with the docs site locally:

```bash
cd docs
npm install
npm start
```
