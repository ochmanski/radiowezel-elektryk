import {
  IAppState,
  changeAppState,
} from './';

import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps {
  changeAppState: changeAppState;
  counterHidden: IAppState['counterHidden'];
  subpageLabelHidden: IAppState['subpageLabelHidden'];
  themeName: IAppState['themeName'];
  userLoggedIn: IAppState['userLoggedIn'];

}

export interface IState {
  test?: undefined;
}
