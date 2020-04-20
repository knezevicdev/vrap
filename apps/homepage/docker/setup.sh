#!/bin/ash

# Bootstrap yarn workspaces.
yarn install

# Build libraries.
yarn --cwd ./libs/ui build

# Build the main app.
yarn --cwd ./apps/homepage build
