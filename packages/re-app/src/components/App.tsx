import React, {
  Component,
  ReactNode,
} from 'react';

import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

setConfig({
  logLevel: 'debug',
  ignoreSFC: true,
  pureRender: true,
});

import {
  Home,
  Counter,
  Header,
  Auth,
  Account,
} from '@components';

import {
  IAppProps,
  IAppState,
  cookieGetSafeReturnType,
  IcookieThemeName,
} from '@types';

import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

import {
  cookieGetSafe,
  addThemeNameToHtmlClassList,
  cookieSet,
} from '@helpers';

import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getTheme } from '@themes';
import { MuiThemeProvider } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Helmet from 'react-helmet';
import * as styles from '@styles/components/App.scss';

const transitionTimeout: number = 550;

class App extends Component<IAppProps, IAppState> {

  public constructor(props: IAppProps) {
    super(props);

    const user: cookieGetSafeReturnType = cookieGetSafe('user');
    const userLoggedIn: boolean = !!Object.keys(user).length;

    this.state = {
      userLoggedIn,
      counterHidden: !!cookieGetSafe('counterHidden'),
      subpageLabelHidden: !!cookieGetSafe('subpageLabelHidden'),
      themeName: cookieGetSafe('themeName') as IcookieThemeName['value'],
    };

    this.changeAppState = this.changeAppState.bind(this);
  }

  /**
   * Zmień state w App
   * @see IAppState
   */
  public changeAppState(newState: Partial<IAppState>): void {
    /**
     * Możliwe, że kiedyś to trzeba będzie zmienić na "manualne"
     * ustawianie ciasteczek, wraz z rozwojem i rozrostem aplikacji
     * jednak na teraz (26.12.2018) ten sposób jest dobry i niezwykle wygodny
     *
     * Jeśli jakakolwiek nazwa klucza w obiekcie newState
     * jest taka sama jak zdefiniowana nazwa ciasteczka
     * wtedy zapisz wartość z tego klucza do cookies
     * @see cookieSet
     * @see stringIsCookieName
     */
    const newStateKeys: string[] = Object.keys(newState);

    newStateKeys.forEach((key: string) => cookieSet(key, newState[key]));

    this.setState({
      ...this.state, ...newState,
    });
  }

  public render(): ReactNode {
    const {
      userLoggedIn,
      themeName,
      counterHidden,
      subpageLabelHidden,
    } = this.state;

    const theme: Theme = getTheme(themeName);
    addThemeNameToHtmlClassList(themeName);

    return (
      <MuiThemeProvider theme={ theme }>
        <Router>
          <div className={ styles.App }>
            <header className={ styles.headerWrapper }>
              <Route
                path="/"
                render={(props: RouteComponentProps<{}>): ReactNode => (
                  <Header
                    userLoggedIn={userLoggedIn}
                    changeAppState={this.changeAppState}
                    {...props}
                  />
                )}
              />
            </header>

            <main className={ styles.mainWrapper }>
              <div className={ styles.main }>
                <Helmet>
                  <meta name="theme-color" content="#353535" />
                </Helmet>

                <Route
                  exact
                  path="/"
                  component={ Home }
                />

                <Route
                  path="/co-gralismy"
                  render={(): ReactNode => (
                    <Grow
                      in
                      appear
                      timeout={transitionTimeout}
                      style={{
                        transformOrigin: '50% 0%',
                      }}
                    >
                      <Card
                        style={{
                          borderRadius: '5px',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        <CardActionArea>
                            <CardMedia
                              component="img"
                              style={{
                                objectFit: 'cover',
                              }}
                              image={`https://freight.cargocollective.com/w/1000/i/
c4a12167133af044a29dd28527874fa1fb89dc3c332b58198bc4dae6d7a9663c/
tumblr_ofss8tVaP41vjn0soo1_1280.jpg`}
                            />
                        </CardActionArea>

                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>
                            Wyrażenie dnia
                          </Typography>
                          <Typography variant="h5" component="h2">
                            no • to • dopiero • będzie • dodane
                          </Typography>
                          <Typography color="textSecondary">
                            zdanie pojedyncze
                          </Typography>
                          <Typography component="p">
                            no trzeba zrobić nie
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Zobacz więcej</Button>
                        </CardActions>
                      </Card>
                    </Grow>
                  )}
                />

                <Route
                  exact
                  path="/konto"
                  render={(props: RouteComponentProps<{}>): ReactNode => (
                    <Account
                      userLoggedIn={userLoggedIn}
                      counterHidden={counterHidden}
                      subpageLabelHidden={subpageLabelHidden}
                      themeName={themeName}
                      changeAppState={this.changeAppState}
                      {...props}
                    />
                  )}
                />

                <Route
                  path={[
                    '/zaloguj',
                    '/zarejestruj',
                  ]}
                  render={(props: RouteComponentProps<{}>): ReactNode => (
                    <Auth
                      userLoggedIn={userLoggedIn}
                      changeAppState={this.changeAppState}
                      {...props}
                    />
                  )}
                />

              </div>

            </main>

            <footer>
              <Counter />
            </footer>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const _App: typeof App = hot(App);

export { _App as App };
