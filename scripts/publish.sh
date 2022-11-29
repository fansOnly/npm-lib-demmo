#!/bin/sh

set -e

pnpm i --frozen-lockfile

pnpm build

npm config set registry https://registry.npmjs.org

cd dist
pnpm version patch
npm publish
cd -

npm config set registry https://registry.npm.taobao.org

echo "✅ Publish completed"

pnpm update:version
