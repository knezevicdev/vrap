#Gotchas
When adding local packages you must specify the version and add from root, eg

> yarn workspace @vroom-web/homepage add @vroom-web/banner@^0.1.0

Otherwise yarn tries to grab from the registry.

https://medium.com/rewire-to/webpack-module-resolution-within-a-monorepo-or-how-i-stopped-bundling-two-versions-of-react-7c1d8c31d5a0


When using a package across multiple apps/libs, be sure the same version is installed. Packages like react, which require the same version across packages to work will only be correctly hoisted by yarn if all packages in the monorepo can resolve to the same version. Pay attention to the semver (^) used by package.json
