#!/usr/bin/env bash

command -v circleci >/dev/null 2>&1 || { echo >&2 "circleci cli is required but it's not installed. Exiting."; exit 1; }

circleci config pack ./.circleci/src > ./.circleci/config.yml

circleci config validate