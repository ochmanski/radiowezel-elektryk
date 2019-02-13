#!/bin/ash
# Uruchom re-server lub re-app w trybie deweloperskim lub produkcyjnym

SERVICE_DIRECTORY=$1
YARN_MODE="dev"

# https://stackoverflow.com/questions/2953646/how-to-declare-and-use-boolean-variables-in-shell-script/21210966#21210966
if [ "$IS_PRODUCTION" = true ] ; then
  YARN_MODE="prod"
fi

# YARN_COMMAND="yarn $YARN_MODE:${PWD:4}"
YARN_COMMAND="yarn $YARN_MODE"

cd /serviceRoot
cd $SERVICE_DIRECTORY
eval $YARN_COMMAND
