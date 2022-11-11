#!/bin/sh

set -e

pnpm i --frozen-lockfile

cd packages/vitamin-cc
pnpm version patch
cd -

pnpm build
pnpm build:theme

cd dist
npm publish
cd -

echo "✅ Publish completed"
