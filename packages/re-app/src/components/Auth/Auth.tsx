import React, {
  Component,
  ReactNode,
} from 'react';

import {
  IAuthProps,
  IAuthState,
  ILoginFormPropsValues,
  withSnackbarReturnType,
} from '@types';

import {
  cookieSet,
  sessionMaxAgeInDays,
  serverAddress,
} from '@helpers';

import {
  Formik,
  FormikActions,
} from 'formik';

import {
  LoginForm,
  LoginFormValidationSchema,
} from '@components';

import {
  parse as queryParse,
} from 'query-string';

import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
// import CardHeader from '@material-ui/core/CardHeader';
// import Avatar from '@material-ui/core/Avatar';
import { withSnackbar } from 'notistack';
import { FaFacebook } from 'react-icons/fa';
import { GoLock } from 'react-icons/go';
import ReactFacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { IAnyUserType } from '@re/server/types';
import axios, { AxiosResponse } from 'axios';
import * as styles from '@styles/components/Auth.scss';

const FB_APP_ID: string = process.env.FB_APP_ID || '';

const transitionTimeout: number = 550;

class Auth extends Component<IAuthProps, IAuthState> {
  public initialLoginFormValues: ILoginFormPropsValues;
  public referrer: { r?: string };
  public constructor(props: IAuthProps) {
    super(props);

    this.initialLoginFormValues = {
      login: '',
      password: '',
    };

    this.referrer = queryParse(this.props.location.search);

    this.login = this.login.bind(this);
    this.changeState = this.changeState.bind(this);
    this.authFinished = this.authFinished.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
  }

  public authFinished(res: IAnyUserType): void {
    const {
      changeAppState,
      history,
      enqueueSnackbar,
    } = this.props;

    if (res.loginType === 'native') {
      if (res.picture.small) {
        res.picture.small = `data:image/png;base64,${(
          Buffer.from(res.picture.small as Buffer)
          .toString('base64')
        )}`;
      }

      if (res.picture.normal) {
        res.picture.normal = `data:image/png;base64,${(
          Buffer.from(res.picture.normal as Buffer)
          .toString('base64')
        )}`;
      }
      // @ts-ignore
    } else if (res.loginType === 'facebook' || res.accessToken) {
      // @ts-ignore
      res.picture.small = res.picture.data.url;
      // @ts-ignore
      res.picture.normal = res.picture.data.url;
      // @ts-ignore
      delete res.picture.data;
    }

    cookieSet('user', res, { expires: sessionMaxAgeInDays });
    // @ts-ignore
    enqueueSnackbar((
      <div className="snack">
        <Typography
          component="h6"
          variant="subtitle1"
          color="inherit"
        >
          Witaj {res.name}, dobrze Cię widzieć
        </Typography>

        <Typography
          variant="caption"
          color="inherit"
        >
          Zalogowano pomyślnie
        </Typography>
      </div>
    ),              {
      variant: 'success',
    });
    changeAppState({ userLoggedIn: true });
    history.push(this.referrer.r || '/');
  }

  public changeState(newState: IAuthState): void {
    const mergedState: IAuthState = {
      ...this.state,
      ...newState,
    };

    this.setState(mergedState);
  }

  public login(
    data: ILoginFormPropsValues,
    formikActions: FormikActions<ILoginFormPropsValues>,
  ): void {
    const {
      login,
      password,
    } = data;

    const { setSubmitting } = formikActions;

    axios.post(`${serverAddress}/auth/login/native`, {
      login, password,
    }, {
      withCredentials: true,
    })
      .then((res: AxiosResponse<IAnyUserType>) => {
        console.log(res);
        this.authFinished(res.data);
      })
      .catch((err: string) => {
        setSubmitting(false);
      });
  }

  public loginFacebook(data: IAnyUserType): void {
    console.log(data);
    this.authFinished(data);
  }

  public render(): ReactNode {
    console.log(this.props.location);

    return (
      <div className={ styles.Auth }>
        <Grow
          in
          appear
          timeout={transitionTimeout}
          style={{
            transformOrigin: '50% 0%',
          }}
        >
          <Card
            className={ styles.card }
            style={{ borderRadius: '5px' }}
          >
            <CardContent className={ styles.infoText }>
              <Typography
                component="h5"
                variant="title"
              >
                <GoLock />
                Logowanie
              </Typography>

              <Typography
                className={ styles.infoTextSub }
                color="textSecondary"
                variant="subtitle2"
                gutterBottom
              >
                Zaloguj się do Radiowęzeł Elektryk i zacznij korzystać z serwisu
              </Typography>
            </CardContent>

            <CardContent className={ styles.formWrapper }>
              <Formik
                onSubmit={this.login}
                component={LoginForm}
                initialValues={this.initialLoginFormValues}
                validationSchema={LoginFormValidationSchema}
                validateOnChange
              />
            </CardContent>

            <CardContent
              className={ styles.or }
            >
              <Typography color="textSecondary">
                lub
              </Typography>
            </CardContent>

            <CardActions>
              <FacebookLogin
                appId={ FB_APP_ID }
                cookie
                autoLoad={false}
                fields="name,picture"
                callback={this.loginFacebook}
                language="pl_PL"
                icon={ <FaFacebook /> }
                render={(renderProps: ReactFacebookLogin): ReactNode => (
                  <Button
                    className={ styles.loginFacebookButton }
                    variant="text"
                    fullWidth
                    { ...renderProps }
                  >
                    <FaFacebook />
                    Zaloguj się Facebookiem
                  </Button>
                )}
              />
            </CardActions>
          </Card>
        </Grow>
      </div>
    );
  }
}

const _Auth: withSnackbarReturnType<IAuthProps> = withSnackbar(Auth);

export { _Auth as Auth };
