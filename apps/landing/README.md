## Dependencies

| Dependency    | Minimum Version |
| ------------- |:---------------:|
| Docker        | 18.09.7         |

## Getting Started

- Install a stable version of [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-mac).

- Pull the lastest from this `vroom-web` repo.

- Build Your Image, Run Your Container
  - Approach #1 (Recommended)
    - Install [VSCode](https://code.visualstudio.com/)
    - Install the VSCode extension "Remote - Containers" (ms-vscode-remote.remote-containers)
    - Open the project folder in VSCode, Cmd-Shift-P, type "Remote-Containers: Reopen in Container"
    - Wait for Docker to build your image and run your container.
    - When VSCode shows your file directory in the explorer, you are developing inside your container.
    - Edits to code are shared between your volume and the container's volume.
    - Saving changes to code will cause the app to hotreload.
  - Approach #2
    - Open a terminal in the project root.
    - Run `docker-compose up --build`.
    - Wait for Docker to build your image and run your container.

- Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

## Cleanup

- Stop Running Your Container
  - Approach #1 (Recommended)
    - Cmd-Shift-P, type "Remote-Containers: Reopen Locally".
    - Wait for Docker to stop running your container.
  - Approach #2
    - Open a terminal in the project root.
    - Run `docker-compose down`.
    - Wait for Docker to clean up your container.

## Resource Management.
You will need to periodically follow these steps to cleanup the resources allocated by Docker.
Doing the following will open up disc space from the resources allocated by Docker.
```bash
  docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
  docker rmi $(docker images -a -q)
  docker volume prune
```

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Environment Variables and Secrets

Some values in this application vary depending on the environment.
As a standard practice, these values are managed with environment variables.

Environment variables that hold sensitive information are called secrets.
It is important to recognize that distinction.
All secrets are environment variables, but not all environment variables are secrets.

In a deployment context, devops infrastructure manages environment variables.
These values get injected at some point during deployment.

For local development, we manage (non-secret) environment variables in docker-compose.yaml. Open that file and you'll see some plaintext values.
These are the values that are injected into your container's environment for local development. These keys are set to other values in a deployment context.

Secrets for local development are to be kept in a .env file.
If you do not see a file named ".env" in your project root, you need to create one,
and fill it in. Reach out to another developer and they can help you set this up.

Secrets are set in a .env file to prevent them from being committed as plaintext to our code repository. However, they are still consumed by docker-compose.yaml and injected into our container's environment. docker-compose will automatically detect your .env file and perform the injection step.

By way of example, suppose you wanted to add a new (non-secret) environment variable called "MY_ENV_VAR" for local development. Simply add a line in docker-compose.yaml under the "environment" key as follows:

- MY_ENV_VAR=whatever-value-you-need

If you need to add a secret, e.g. called "MY_SECRET", add a line to your .env file as follows:

MY_SECRET=super-secret-information

Then, add a line to the docker-compose.yaml file like this:

- MY_SECRET=${MY_SECRET}

By performing these steps, docker will define your environment variables, when it starts up the container.

This prepares the environment in which the application runs, but now how do we access these values from within our application?

Because we want our built images to be environment-agnostic (meaning the same image can run in multiple environments), we do not bake any env vars into our images. This requires runtime environment variable injection. Thankfully, NextJS provides a solution for this: https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

Please view the link above for details on how to setup and access runtime-injected env variables.
