#!/bin/sh

set -e

pnpm i --frozen-lockfile

pnpm build
pnpm build:theme

cd dist
pnpm version patch
npm publish
cd -

echo "✅ Publish completed"
