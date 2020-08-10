## Dependencies

| Dependency    | Minimum Version |
| ------------- |:---------------:|
| Docker        | 18.09.7         |

## Getting Started

- Note that this is a monorepo. (More details below.)

- Install a stable version of [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-mac).

- Pull the lastest from this `vroom-web` repo.

- Setup and use `local.vroom.com` instead of `localhost`
  - Modify your `/etc/hosts` file to include this line: `127.0.0.1 local.vroom.com`
  - (E.g `sudo vim /etc/hosts`, add the line)
  - When developing locally, use `local.vroom.com` in place of `localhost`.
  - This provides a more consistent environment from local -> deployed environment.
  - It also gets around an long-standing issue in chrome: https://bugs.chromium.org/p/chromium/issues/detail?id=67743

- Determine which monorepo package you want to run. There are several here, so a good place to start would be one of the packages under the `/apps` folder.

- Build Your Image, Run Your Container
  - Approach #1 (Recommended)
    - Install [VSCode](https://code.visualstudio.com/)
    - Install the VSCode extension "Remote - Containers" (ms-vscode-remote.remote-containers)
    - Open the package folder in VSCode, Cmd-Shift-P, type "Remote-Containers: Open folder in Container", choose a folder.
    - Wait for Docker to build your image and run your container.
    - When VSCode shows your file directory in the explorer, you are developing inside your container.
    - To view the logs of the docker container, use the [docker dashboard.](https://docs.docker.com/desktop/dashboard/)
    - Edits to code are shared between your volume and the container's volume.
    - Saving changes to code will cause the app to hotreload.
  - Approach #2
    - Open a terminal in the project root.
    - Figure out the path from the root to the `docker-compose.yaml` file for the package you want to run. (E.g. `/apps/home/docker/docker-compose.yaml`)
    - Run `docker-compose -f <path-to-docker-compose.yaml> up --build`.
    - Wait for Docker to build your image and run your container.

- Most projects start a web service at [http://localhost:8080](http://localhost:8080), so view the docker logs or check in your browser to see the result.

## Cleanup

- Stop Running Your Container
  - Approach #1 (Recommended)
    - Cmd-Shift-P, type "Remote-Containers: Reopen Locally".
    - Wait for Docker to stop running your container.
  - Approach #2
    - Open a terminal in the project root.
    - Run `docker-compose -f <path-to-docker-compose.yaml> down`.
    - Wait for Docker to clean up your container.

## Resource Management.
You will need to periodically follow these steps to cleanup the resources allocated by Docker.
Doing the following will open up disc space from the resources allocated by Docker.
```bash
  docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
  docker rmi $(docker images -a -q)
  docker volume prune
```

## Libraries
We store our built libraries in code to expediate app container build time. As such it is your responsibilty to run the build once your work is complete. If you are working on a library and said library contains a `build.docker-compose.yaml` please be sure to run
```bash
  docker-compose -f [PATH]/docker-compose.yaml -f [PATH]/docker-compose.build.yaml up --build
```

# Context

At Vroom, we have multiple teams, all collaborating on one website. This presents an issue, as it increases the risk of developers stepping on each other's toes.

To enable teams to work on different portions of the website at the same time, we needed to adopt a highly decoupled architecture.

As a developer, you should feel confident in what effects your changes will have. This confidence comes from a healthy separation of concerns, and mindful de-coupling.

To adopt an awareness of coupling, watch this video: https://www.youtube.com/watch?v=rI8tNMsozo0
It outlines key differences between easy and simple.

You will find the concepts established in the video helpful for the rest of your development career.
In the context of this project though, it will help you make choices that will accomplish your goals without incapacitating other teams.

# Architecture

This is a monorepo.

While it may look like one monolith project, it is actually an ecosystem of smaller interdependent packages.

It's best to think of what you see here as a collection of separate NPM packages, except that instead of each getting its own repo, they're co-located under this single repo.

That's all this monorepo is - a collection of packages. If you dig into the code and find a monolith, mistakes has been made.

The reason the video above is included is that this architecture can be very powerful, but runs the risk of becoming tangled if you are not dilligent in maintaining a proper separation of concerns.

# Monolith versus Monorepo

Since we want to maintain a monorepo and avoid a monolith, you'll need to be able to tell the difference.

A monolith is one big pile of source code that is built all at once into some resulting application or library. Any file in the entire monolith _could_ import another without causing issues with the build.

A monorepo, on the other hand, is a collection of smaller packages that can be built and consumed mostly independently. Some packages will leverage others, but they only use the _built version_ of another package.

The exact line between a monolith and a monorepo is a bit of a philosophical question.
The goal is to maintain a monorepo that separates packages by concern.
By maining clear goals for an individual package, it becomes easier to maintain, because you as the developer know what you must consider (and what you don't have to worry about) when working on that package.

Here are some questions you can ask to determine if you are maintaining a healthy monorepo. (Not a monolith.)

## Question #1: What am I importing?

Two files should be considered part of the same package if both the importing and imported file are _source code_.

For example, if the _source code_ of file A imports the _source code_ of file B, they are both part of the same package.

Make sure you are only importing _source code_ if you are sure the files belong in the same package.

## Question #2: How am I importing?

Code is considered part of the same package if it uses relative imports or import aliases, rather than the built package's name.

For example, file A and file B are part of the same package if you see imports like:
- `import FileB from '../fileB';
- `import FileB from 'alias/fileB';

You know you are consuming a separate package if you see an import like:
- `import FileB from '@vroom-web/file-b' (where '@vroom-web/file-b' is the name field define in that package's package.json.)

## Question #3: Why am I importing?

A healthy monorepo maintains a good separation of concerns.
If the purpose of the package is to handle networking, it should only import things that support that goal.
Do not import something because it's easy. If you are unsure of what to import into the package you're maintaining, ask the team.

# Limitations

This monorepo is only intended to house frontend code for use on the vroom website. This limitation helps define the scope of what you should expect to find here. Code for backend services should not be included.

# Tooling

To enable this monorepo architecture, we use these key tools
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Docker](https://www.docker.com/)
- [VSCode - Optional](https://code.visualstudio.com/)
- [VSCode Remote Container Extenstion - Optional](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Yarn Workspaces

Yarn is a package manager, and an alternative to NPM. Yarn workspaces is yarn's monorepo feature that handles automatic linking and dependency hoisting for you.

### Configuring Workspaces

In the project root, you'll find a `package.json` file. Notice that there is a key in that file called `workspaces`. That key tells yarn that any folder containing a `package.json` under the `/apps` or `/libs` folders should be considered a workspace of this monorepo. You should not need to edit this key. Simply add a new folder under `/apps` or `/libs` containing a `package.json` and yarn will detect it.

### Referencing a Workspace

Workspaces can be referened using the `name` key defined in their `package.json` file.
For instance, open up `/libs/ui/package.json` and notice that the `name` field is `@vroom-web/ui`.

Note that this is the name you use to reference one package from another, or run targetted commands in a workspace.

For instance, if you wanted to add an external dependency to the `@vroom-web/some-library` library, you could run `yarn workspace @vroom-web/some-library add external-dependency`.

You could add a local dependency by running `yarn workspace @vroom-web/some-library add @vroom-web/some-other-library@^0.1.0` (Note that for local dependencies, you must include the version.)

Any command defined in a `package.json`'s `scripts` key can be run the same way.
E.g. `yarn workspace @vroom-web/some-library run start`.

You can also run a command across all workspaces by doing: `yarn workspaces run build`. This examples would run the `build` script across all packages, but it works with any script name.

Though it is good to be aware of these capabilities, you will not generally need to run scripts yourself. Leave that to Docker. (See below.)

### Installing And Hoisting All Dependencies

In the root of a yarn workspaces project, you can run `yarn install` to install dependencies for all configured workspaces. If yarn recognizes that two packages use the same dependency, it will hoist it.

You do not need to run this command yourself, because Docker will take care of it. But this is the command that Docker runs to setup all the dependencies in the monorepo.

### Building Libraries

`yarn install` will take care of pulling down external packages, but we also need to prepare our local packages for use. As with any NPM package, source code needs to be built. The different here is that instead of uploading the output `dist` folder to an NPM registry, yarn will resolve local packages based on the `main` and `module` fields of that package's `package.json` file.

Sound complicated? It's actually not too bad.

Open up the `/libs/ui` folder. If this is your first time in the repo, you will not see a `/libs/ui/dist` folder there yet.

Now open the `/libs/ui/package.json` file in a text editor.
Notice that the `main` and `module` keys of the `package.json` file point to files under the `/libs/ui/dist` directory, which does not yet exist. If you try to reference this `@vroom-web/ui` library, you will encounter an error, because it will not be able to resolve files that don't exist.

In order to create these files, we need to build the library.
For the `/libs/ui` library in particular, we have a `build` script defined in `package.json` that will generate the `dist` files.

To run this script, you can use `yarn workspace @vroom-web/ui build` as described above.
But once again, you do not need to worry about this, because Docker is configured to execute this step.
Just be aware of how it works in case you need to write your own Docker configuration.

## Docker

We use docker to orchastrate our setup and build processes. This hides complexity from developers who don't need to worry about it, and it also allows us to know that our dev environment is as similar to our deployment environments as possible.

Notice that in each package, there is a `/docker` folder which describes how to build an image and run a container. We use the `docker-compose` tool to inject environment variables and run our image for local development.

# Gotchas
When adding local packages you must specify the version and add from root, eg

> yarn workspace @vroom-web/home add @vroom-web/banner@^0.1.0

Otherwise yarn tries to grab from the registry.

https://medium.com/rewire-to/webpack-module-resolution-within-a-monorepo-or-how-i-stopped-bundling-two-versions-of-react-7c1d8c31d5a0

When using a package across multiple apps/libs, be sure the same version is installed. Packages like react, which require the same version across packages to work will only be correctly hoisted by yarn if all packages in the monorepo can resolve to the same version. Pay attention to the semver (^) used by package.json

One way to debug this is to use the `yarn why` command. For example, `yarn why react` will show what packages are using what version of react.
