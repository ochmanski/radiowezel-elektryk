import React, { SFC } from 'react';

import {
  ILoginFormProps,
  sfcReturnType,
  // onChangeLoginFormFn,
  // IonChangeLoginFormFn,
} from '@types';

import {
  object as yupObject,
  string as yupString,
  ObjectSchema,
} from 'yup';

import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import * as styles from '@styles/components/Auth.scss';
import { CircularProgress } from '@material-ui/core';

const LoginForm: SFC<ILoginFormProps> = (
  props: ILoginFormProps,
): sfcReturnType => {
  const {
    values: { login, password },
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    // setFieldTouched,
  } = props;

  // const onChangeFn: onChangeLoginFormFn = (
  //   name: IonChangeLoginFormFn['name'],
  //   e: IonChangeLoginFormFn['e'],
  // ): void => {
  //   e.persist();
  //   handleChange(e);
  //   setFieldTouched(name, true, false);
  // };

  return (
    <form
      className={ styles.form }
      onSubmit={handleSubmit}
    >
      <div className={styles.formMainInput}>
        <TextField
          id="login"
          name="login"
          label="Nazwa użytkownika"
          margin="dense"
          variant="standard"
          placeholder="np. cotozaszkoła511"
          helperText={touched.login ? errors.login : ''}
          error={touched.login && !!errors.login}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
          value={login}
          // onChange={onChangeFn.bind(undefined, 'login')}
        />

        <TextField
          id="password"
          name="password"
          label="Hasło"
          margin="dense"
          variant="standard"
          type="password"
          helperText={touched.password ? errors.password : ''}
          error={touched.password && !!errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
          value={password}
          // onChange={onChangeFn.bind(undefined, 'password')}
        />

        <Typography
          className={ styles.register }
          color="textSecondary"
        >
          Nie masz jeszcze konta?&nbsp;
          <Link to="/zarejestruj">Załóż konto</Link>
        </Typography>
      </div>

      <CardActions className={ styles.loginSubmit }>
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          disabled={!isValid}
        >
          Zaloguj się
        </Button>
      </CardActions>

      <div className={`loadingEl themedBackground ${isSubmitting ? 'show' : '' }`}>
        {isSubmitting ? (
          <CircularProgress />
        ) : '' }
      </div>
    </form>
  );
};

const LoginFormValidationSchema: ObjectSchema<{}> = yupObject({
  login: yupString()
    .required('Wprowadź nazwę użytkownika'),

  password: yupString()
    .required('Wprowadź hasło'),
});

export {
  LoginForm,
  LoginFormValidationSchema,
};
