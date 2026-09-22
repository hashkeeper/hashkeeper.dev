#!/bin/bash
rsync -uav --exclude={".git",".vscode","rsync_cloud.sh",".prettierrc",".gitignore","package.json"} ./ keepercloud:/home/hash/podman/websites/hashkeeper.dev/base/