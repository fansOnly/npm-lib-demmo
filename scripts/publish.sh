#!/bin/sh

set -e

pnpm i --frozen-lockfile

pnpm build

npm config set registry https://registry.npmjs.org

cd dist
npm publish
pnpm version patch
pnpm update:version
cd -

npm config set registry https://registry.npm.taobao.org

echo "✅ Publish completed"
