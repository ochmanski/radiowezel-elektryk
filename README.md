<img alt='Radiowęzeł Elektryk' src='assets/images/promo1.png' width='220' margin='0' padding='0' />

Aplikacja internetowa do głosowania na utwory, w wybranych przedziałach czasowych

## Wprowadzenie

Instrukcje poniżej pozwalają na uruchomienie projektu na dowolnej maszynie lokalnej, w celu rozwoju i testowania. Zobacz [wskazówki](#Wdrażanie-deployment) dotyczące wdrażania (deployment) projektu na działającym systemie.

### Wymagania wstępne

* [Vagrant](https://www.vagrantup.com/downloads.html)
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - tylko jeśli domyślny provider jest inny niż "virtualbox", tzn. jeśli wszystko działa bez VirtualBoxa, nie musimy go dodatkowo instalować.
* [Node.js](https://nodejs.org/en/) - potrzebny do instalacji Yarna
* [Yarn](https://yarnpkg.com/lang/en/docs/install) - potrzebny do instalacji zależności

### Uruchamianie aplikacji

1. Stwórz plik konfiguracyjny `.env` w `./config` na podstawie pliku `.env.example`. Każda zmienna musi mieć wartość (zmienna nie może być pusta)
2. Otwórz terminal w głównym folderze projektu
3. Zainstaluj potrzebne zależności komendą `yarn install && yarn bootstrap`
4. Przejdź do `provision/vagrant/`
5. Uruchom aplikację poprzez `vagrant up`. Aplikacja będzie uruchomiona w trybie, który zależy od wartości zmiennej `IS_PRODUCTION` w `config/.env`. Jeśli `IS_PRODUCTION` jest ustawiony na false, aplikacja uruchomi się w trybie deweloperskim. Tryb deweloperski umożliwia szybki rozwój i debugowanie aplikacji. Pliki aktualizowane (budowane, lintowane, testowane) są z każdym zapisem któregokolwiek pliku. Tryb produkcyjny, `IS_PRODUCTION=true`, działa szybciej, pozwala przyjąć więcej jednoczesnych połączeń, jednak wszelkie udogodnienia związane z rozwojem aplikacji są wyłączone

### Uruchamianie aplikacji - tl;dr

Instalacja zależności i konfiguracja projektu pod swoją maszynę

```bash
yarn install &&
yarn bootstrap &&
cp config/.env.example config/.env &&
vim config/.env
```

Uruchomienie aplikacji

```bash
cd provision/vagrant/ &&
vagrant up
```

#### Jeśli wykonaliśmy powyższe kroki aplikacja działa już na localhost i wybranych portach

***

### Przydatne komendy

Ponowne uruchamianie całej aplikacji (na przykład po wprowadzonych zmianach w Vagrantfile)

```bash
vagrant reload
```

Zatrzymanie wirtualnej maszyny (Vagrant)

```bash
vagrant halt
```

Logowanie do wirtualnej maszyny (Vagrant)

```bash
vagrant ssh
```

### Po zalogowaniu się do wirtualnej maszyny Vagranta

Każda komenda `docker-compose` musi być wykonywana z folderu `provision/docker`, po zalogowaniu w wirtualnej maszynie Vagranta (po zalogowaniu się jesteśmy automatycznie przenoszeni do folderu `provision/docker`).

Logowanie do poszczególnych wirtualnych maszyn w Dockerze

```bash
docker-compose exec $NAZWA_PACZKI /bin/ash
```

Wyświetlanie logów poszczególnych paczek

```bash
docker-compose logs $NAZWA_PACZKI
```

***

### Dodatkowe komendy

Ponowne uruchamianie kontenerów dockera (przydatne jeśli zmieniliśmy coś w procesie budowania kontenerów, itp.)

```bash
./restart-docker.sh
```

## Wdrażanie (deployment)

Wystarczy zmienić wartość zmiennej `IS_PRODUCTION` w `./config/.env` na `true`. Wtedy aplikacja przechodzi w tryb produkcyjny, a my możemy wystawić ją do Internetu.

## Wnoszenie swojego wkładu do projektu

Zobacz [CONTRIBUTING](CONTRIBUTING.MD)

## TODO

Zobacz naszą tablicę Trello z zadaniami [do zrobienia](https://trello.com/b/Oxyvq01D/todo)

## Zbudowane przy pomocy

* [TypeScript](https://www.typescriptlang.org/) - Statyczne typowanie, używane w całym projekcie
* [TSLint](https://palantir.github.io/tslint/) - Linter do TypeScriptu, używany w całym projekcie
* [Node.js](https://nodejs.org/) - Serwer
* [Express](https://expressjs.com/) - Web framework dla serwera
* [GraphQL](https://graphql.org/) - Ustandaryzowanie API
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Implementacja serwera GraphQL, zgodnego ze specyfikacją
* [MongoDB](https://www.mongodb.com/) - Baza danych
* [Mongoose](https://mongoosejs.com/) - Przystępny dostęp do MongoDB, na podstawie schematów
* [Redis](https://redis.io/) - Baza danych dla cache'owania zapytań do głównej bazy danych
* [Socket.IO](https://socket.io/) - Wiadomości w czasie rzeczywistym między serwerem a aplikacją
* [Workbox](https://developers.google.com/web/tools/workbox/) - Cache'owanie zasobów i funkcjonalności do budowania [PWA](https://developers.google.com/web/progressive-web-apps/)
* [React](https://reactjs.org/) - Aplikacja
* [Scss](https://reactjs.org/) - Style aplikacji
* [Webpack](https://webpack.js.org/) - Budowanie, serwowanie aplikacji
* [Vagrant](https://www.vagrantup.com/) - Odtwarzalne środowisko deweloperskie, ustandaryzowany rozwój projektu
* [Docker](https://www.docker.com/) - Wydzielenie paczek projektu na osobne kontenery

...i inne. Zobacz `package.json` w poszczególnych paczkach projektu, dla wszystkich bibliotek używanych w projekcie.

## Wersje

[SemVer](http://semver.org/) jest używany do wersjonowania. Wyszukaj tagi tego repozytorium, aby zobaczyć dostępne wersje.

## Autorzy

* **Kacper Ochmański** - *Rozpoczęcie i rozwój projektu* - [ochmanski](https://github.com/ochmanski)

Zobacz dalszą listę [współtwórców](https://github.com/ochmanski/radiowezel-elektryk/contributors) zaangażowanych w ten projekt.

## Licencja

Ten projekt jest licencjonowany na podstawie licencji MIT - szczegóły licencji znajdują się w pliku [LICENSE](LICENSE)
