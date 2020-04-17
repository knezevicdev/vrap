#Gotchas
When adding local packages you must specify the version and add from root, eg

> yarn workspace @vroom-web/homepage add @vroom-web/banner@^0.1.0

Otherwise yarn tries to grab from the registry.

https://medium.com/rewire-to/webpack-module-resolution-within-a-monorepo-or-how-i-stopped-bundling-two-versions-of-react-7c1d8c31d5a0
