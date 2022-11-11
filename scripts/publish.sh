#!/bin/sh

set -e

pnpm i --frozen-lockfile
pnpm version patch

pnpm build

pnpm build:theme

cd dist
npm publish
cd -

echo "✅ Publish completed"
