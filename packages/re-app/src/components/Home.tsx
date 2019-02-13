import React, {
  Component,
  ReactNode,
} from 'react';

import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import * as styles from '@styles/components/Home.scss';

// const FaHandPaper: ReactNode = FaHandPaper();

const linkToLogin: ReactNode = (
  <div className={`${styles.firstVisitInfo}`}>
    <div className={ styles.firstVisitInfoHeader }>
      <h2 className="h2 loud">
        Cześć 👋
      </h2>
    </div>

    <div className={ styles.firstVisitInfoContent }>
      <h5 className="h5 quiet">
        Zaloguj lub zarejestruj się, aby korzystać z serwisu
      </h5>
    </div>
  </div>
);

const animationTimeout: number = 650;

const linkToLoginAnimated: ReactNode = (
  <Grow
    in
    appear
    timeout={animationTimeout}
    style={{
      transformOrigin: '0 0 0 0',
    }}
  >
    {linkToLogin}
  </Grow>
);

class Home extends Component {
  public render(): ReactNode {
    return (
      <div className={ styles.Home }>
        <Helmet>
          <meta name="theme-color" content="#e0e0e0" />
        </Helmet>

        <Link to="/zaloguj">
          { linkToLoginAnimated }
        </Link>
      </div>
    );
  }
}

export { Home };
