import {
  IAppState,
  changeAppState,
} from './';

import { RouteComponentProps, Route } from 'react-router';

export interface IProps extends RouteComponentProps {
  changeAppState: changeAppState;
  userLoggedIn: IAppState['userLoggedIn'];
}

export interface IState {
  /**
   * Czy przycisk menu jest aktywny (otwarty)
   */
  isMenuButtonOpen: boolean;

  /**
   * Stan komponentu BottomNavigation, który odpowiada za routing (taki navbar)
   */
  route: string;
}
