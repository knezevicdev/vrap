#!/bin/ash

# Bootstrap yarn workspaces.
yarn install

# Build libraries.
yarn workspace @vroom-web/ui build

# Build the main app.
yarn workspace @vroom-web/homepage build
