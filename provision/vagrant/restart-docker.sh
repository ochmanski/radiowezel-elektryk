#!/bin/bash

exitfn () {
  trap SIGINT
  printf "\n\e[91mRestartowanie kontenerów nie powiodło się\e[0m\n"
  exit 1
}

trap "exitfn" INT

FIRST_MSG="Restartowanie wszystkich kontenerów dockera...\n"

# Przekazano dane kontenery do zrestartowania
if [[ $# -gt 0 ]] ; then
  FIRST_MSG="Restartowanie wybrane kontenery dockera: $@...\n"
fi

printf "%s\e[1;34m$FIRST_MSG"

vagrant ssh -c "cd /radiowezel-elektryk/provision/docker && docker-compose restart $@"

printf "\n\e[1;32mPomyślnie zrestartowano kontenery"
printf "\nKontenery uruchamiają się ponownie, może to trochę zająć\e[0m\n"

trap SIGINT
