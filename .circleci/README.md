config.yml is the file ultimately used by our CICD system, circleci.

However, DO NOT EDIT config.yml directly.
It is generated from the .circleci/src folder using the circleci cli.

Use the script, circleci-pack.sh, found at the ROOT of the project to generate this file.