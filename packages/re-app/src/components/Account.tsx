import React, {
  Component,
  ReactNode,
} from 'react';

import {
  IAccountProps,
  IAccountState,
} from '@types';

import {
  cookieGetSafe,
  serverAddress,
  cookieSetDefault,
} from '@helpers';

import {
  FaGift,
  FaEye,
  FaQrcode,
} from 'react-icons/fa';

import {
  TiChartBar,
  TiInfoLarge,
} from 'react-icons/ti';

import {
  IoIosContact,
} from 'react-icons/io';

import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { MdExpandMore } from 'react-icons/md';
import { IUserBaseSchema } from '@re/server/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import * as styles from '@styles/components/Account.scss';

const transitionTimeout: number = 550;
const iconSize: number = 16;

class Account extends Component<IAccountProps, IAccountState> {

  public additionalButtons: ReactNode[];
  public avatarClassName: string;

  public user: IUserBaseSchema;
  public constructor(props: IAccountProps) {
    super(props);

    if (!props.userLoggedIn) {
      props.history.push('/zaloguj?r=/konto');
    }

    const additionalButtons: ReactNode[] = [];
    this.user = cookieGetSafe('user') as IUserBaseSchema;
    this.avatarClassName = 'avatarNormal';

    if (props.userLoggedIn && typeof this.user !== 'undefined') {
      const { type } = this.user;
      const userIsNormal: boolean = type === 'Normal';
      const userIsAdmin: boolean = type === 'Admin';
      const userIsSuperAdmin: boolean = type === 'SuperAdmin';

      if (userIsAdmin) {
        this.avatarClassName = 'avatarAdmin';
      }

      if (userIsSuperAdmin) {
        this.avatarClassName = 'avatarSuperAdmin';
      }

      if (userIsAdmin || userIsSuperAdmin) {
        additionalButtons.push((
          <Button
            className={styles.buttonTextIconCenter}
            variant="text"
            color="secondary"
            size="small"
            fullWidth
          >
            <FaQrcode size={iconSize} />
            <Typography variant="inherit">Stwórz QR</Typography>
          </Button>
        ));
      }

    }

    this.additionalButtons = additionalButtons;

    this.logout = this.logout.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.changeCounter = this.changeCounter.bind(this);
  }

  /**
   * Ukryj / schowaj licznik
   */
  public changeCounter(): void {
    const {
      changeAppState,
      counterHidden,
    } = this.props;

    changeAppState({
      counterHidden: !counterHidden,
    });
  }

  /**
   * Zmień motyw aplikacji
   */
  public changeTheme(): void {
    const {
      changeAppState,
      themeName,
    } = this.props;

    changeAppState({
      themeName: themeName === 'dark' ? 'light' : 'dark',
    });
  }

  /**
   * Przenieś użytkownika do logowania jeśli nie jest zalogowany
   */
  public componentWillMount(): void {
    const {
      userLoggedIn,
      history,
    } = this.props;

    if (!userLoggedIn) {
      history.push('/zaloguj?r=/konto');
    }
  }

  /**
   * Wyloguj użytkownika i usuń jego dane z cookie 'user'
   */
  public logout(): void {
    const {
      changeAppState,
      history,
    } = this.props;

    console.dir(window);

    axios.post(`${serverAddress}/auth/logout/native`, {}, {
      withCredentials: true,
    })
      .then((res: AxiosResponse) => {
        if (res.statusText === 'OK') {
          cookieSetDefault('user', true);

          changeAppState({
            userLoggedIn: false,
          });

          history.push('/');
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }

  public render(): ReactNode {
    const {
      counterHidden,
      subpageLabelHidden,
      themeName,
    } = this.props;

    return (
      <div>
        <Grow
          in
          appear
          timeout={transitionTimeout}
          style={{
            transformOrigin: '50% 0%',
          }}
        ><div>
          <Card className={styles.card}>
            <CardContent className={styles.cardHeader}>
              <CardActionArea className={styles.avatarWrapper}>
                <CardContent className={`${styles.avatarContainer}`}>
                  <Avatar
                    className={`avatar avatarAccount ${this.avatarClassName}`}
                    src={this.user.picture ? this.user.picture.normal as string : '' }
                  >
                  </Avatar>

                  <Typography variant="h5" component="h2">
                    {this.user.name || ''}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions className={styles.cardActions}>
                <Button
                  className={styles.buttonTextIconCenter}
                  variant="text"
                  color="secondary"
                  size="small"
                  fullWidth
                >
                  <FaGift size={iconSize} />
                  <Typography variant="inherit">Dodaj punkty</Typography>
                </Button>

                { this.additionalButtons }
              </CardActions>

            </CardContent>
          </Card>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
              <div className={styles.expansionSummaryWrapper}>
                <FaEye size={iconSize} />
                <Typography>Wygląd strony</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={styles.appearanceSettings}>
              <FormControlLabel
                control={
                  <Switch
                    checked={themeName === 'dark'}
                    onChange={this.changeTheme}
                  />
                }
                label={`Motyw ${themeName === 'dark' ? 'ciemny' : 'jasny'}`}
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    checked={subpageLabelHidden}
                    onChange={this.changeTheme}
                  />
                }
                label={`${subpageLabelHidden ? 'Pokaż' : 'Ukryj'} nazwy podstron`}
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    checked={counterHidden}
                    onChange={this.changeCounter}
                  />
                }
                label={`${counterHidden ? 'Pokaż' : 'Ukryj'} licznik`}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
              <div className={styles.expansionSummaryWrapper}>
                <TiChartBar size={iconSize} />
                <Typography>Statystyki</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
              <div className={styles.expansionSummaryWrapper}>
                <IoIosContact size={iconSize} />
                <Typography>Konto</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.logout}
              >
                Wyloguj się
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
              <div className={styles.expansionSummaryWrapper}>
                <TiInfoLarge size={iconSize} />
                <Typography>Informacje</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={styles.infoDetails}>

              <Typography
                className={styles.licence}
                variant="caption"
                gutterBottom
              >
{`MIT License

Copyright (c) 2018-2019 Kacper Ochmański

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </Typography>

            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Typography
            className={styles.reDevelop}
            variant="caption"
            color="textSecondary"
          >
            Chcesz rozwijać Radiowęzeł Elektryk?
            Zobacz nasze&nbsp;
            <a
              target="_blank"
              href="https://github.com/ochmanski/radiowezel-elektryk"
            >
              repozytorium
            </a>
          </Typography>

        </div></Grow>
      </div>
    );
  }

}

export { Account };
