#!/bin/bash

# Zainstaluj node i npm
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm
# ln -s /usr/bin/nodejs /usr/bin/node

# Zainstaluj yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn

# Przejdź do folderu aplikacji i zainstaluj zależności
cd /radiowezel-elektryk
yarn install --no-bin-links
