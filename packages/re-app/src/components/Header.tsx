import React, {
  Component,
  ReactNode,
  ChangeEvent,
} from 'react';

import {
  IHeaderProps,
  IHeaderState,
} from '@types';

import {
  TimelineMax,
  Power3,
  Elastic,
  Circ,
} from 'gsap';

import {
  cookieGetSafe,
} from '@helpers';

import {
  IoIosContact,
  IoIosMusicalNotes,
} from 'react-icons/io';

import {
  TiChartBar,
} from 'react-icons/ti';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { GoRadioTower } from 'react-icons/go';
import { MdWhatshot } from 'react-icons/md';
import { Transition } from 'react-transition-group';
import { Link, LinkProps } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import logotype from '@images/logotype.svg';
import logotypeDouble from '@images/logotype-double.svg';
import * as styles from '@styles/components/Header.scss';
import { IUserNativeSchema } from '@re/server/types';

/**
 * Uwaga!
 * Przebuduj komponent używając react-gsap-enhancer
 */
// tslint:disable

const iconSize: number = 22;

const linksData: LinkProps[] = [
  { to: '/co-gralismy', children: (
    <span><MdWhatshot size={iconSize} /> Co graliśmy?</span>
  )},
  { to: '/glosowania', children: (
    <span><GoRadioTower size={iconSize} /> Głosowania</span>
  )},
  { to: '/utwory', children: (
    <span><IoIosMusicalNotes size={iconSize} /> Utwory</span>
  )},
  { to: '/statystyki', children: (
    <span><TiChartBar size={iconSize} /> Statystyki</span>
  )},
  { to: '/konto', children: (
    <span><IoIosContact size={iconSize} /> Twoje konto</span>
  )},
];

// @ts-ignore
const linksNodes = (linksData: LinkProps[]): ReactNode[] =>
  linksData.map((linkProps: LinkProps, key: number) => (
    <li>
      <Link key={key} {...linkProps}></Link>
    </li>
  ));

const links: ReactNode[] = linksNodes(linksData);

class Header extends Component<IHeaderProps, IHeaderState> {

  public constructor(props) {
    super(props);

    const { location } = props;
    const defaultRoute: string = location.pathname.split('/')[1];

    this.state = {
      isMenuButtonOpen: false,
      route: defaultRoute,
    };

    this.menuButtonStateToggle = this.menuButtonStateToggle.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  /**
   * Nasłuchuj zmian w routingu i odpowiednio
   * zmień zaznaczenie podstron
   */
  public componentDidMount() {
    this.props.history.listen(({ pathname }: { pathname: string }) => {
      this.setState({
        isMenuButtonOpen: false,
      });

      if (pathname === '/') {
        this.setState({
          route: '',
        });
      }
    });
  }

  /**
   * Zmień wybrany tab
   */
  public handleRouteChange(e: ChangeEvent<{}>, v: string): void {
    const { history } = this.props;

    this.setState({
      route: v,
    },            () => {
      history.push(`/${v}`);
    });
  }

  /**
   * Zmień stan otwarcia menu dla mobile
   */
  public menuButtonStateToggle(): void {
    const { isMenuButtonOpen } = this.state;

    this.setState({
      isMenuButtonOpen: !isMenuButtonOpen,
    });
  }

  public render(): ReactNode {
    const {
      isMenuButtonOpen,
      route,
    } = this.state;

    const {
      userLoggedIn,
      history,
    } = this.props;

    const userCookie = cookieGetSafe('user') as IUserNativeSchema;

    let yourAccount: ReactNode = (
      <BottomNavigationAction
        className={ styles.item }
        label="Twoje konto"
        value="konto"
        icon={
          <IoIosContact size={iconSize} />
        }
      />
    );

    if( userCookie && userLoggedIn ) {
      yourAccount = (
        <BottomNavigationAction
          className={ styles.item }
          label="Twoje konto"
          value="konto"
          icon={
            <Avatar
              className={`avatar avatar${userCookie.type}`}
              src={userCookie.picture ? userCookie.picture.small as string : '' }
            >
            </Avatar>
          }
        />
      );
    }

    return (
      <div className={ styles.header }>

        <div className={ styles.logotypeWrapper }>
          <Transition
            timeout={500}
            appear
            in={isMenuButtonOpen}
            addEndListener={(node, done) => {
              const tl: TimelineMax = new TimelineMax({
                onComplete: done,
              });

              if (!isMenuButtonOpen) {
                tl.restart();
              }

              tl.to(node, isMenuButtonOpen ? .5 : .3, {
                className: isMenuButtonOpen ? `+=${styles.menuOpened}` : `-=${styles.menuOpened}`,
                ease: Circ.easeInOut,
              });
            }}
          >
            <Button
              className={ styles.logotype }
              // Zamiast używania tego z komponentem Link z react-router-dom
              // po prostu po kliknięciu przechodzimy do strony głównej
              // Takie rozwiązanie zostało wdrożone, bo w przeciwnym
              // przypadku TouchRipple dziwnie się zachowuje przez
              // wielokrotne rerenderowanie
              onClick={() => history.push('/')}
              // https://github.com/mui-org/material-ui/issues/8598#issuecomment-399166441
              // component={({ innerRef, ...props }) =>
              //   <Link {...props} to="/" />
              // }
            >
              <SVGInline
                className={ styles.logotypeSvgMobile }
                svg={ logotype }
              />

              <SVGInline
                className={ styles.logotypeSvg }
                svg={ logotypeDouble }
              />
            </Button>
          </Transition>
        </div>

        <Transition
          timeout={2000}
          mountOnEnter
          unmountOnExit
          in={isMenuButtonOpen}
          addEndListener={(node, done) => {
            const tl: TimelineMax = new TimelineMax();
            const { children } = node;

            if (!isMenuButtonOpen) {
              tl.restart();
            }

            tl.fromTo(node, .35, {
              autoAlpha: isMenuButtonOpen ? 0 : 1,
              scale: isMenuButtonOpen ? .2 : 1,
              borderRadius: isMenuButtonOpen ? 1000 : 0,
            },        {
              borderRadius: 0,
              autoAlpha: isMenuButtonOpen ? 1 : 0,
              scale: 1,
              ease: isMenuButtonOpen ? Power3.easeInOut : Power3.easeOut,
            });

            tl.staggerFrom(children, isMenuButtonOpen ? .6 : 0, {
              autoAlpha: 0,
              y: -100,
              ease: Elastic.easeOut.config(4, 3.1),
              onComplete: done,
            },             isMenuButtonOpen ? .18 : 0, '-=.285');

          }}
        >
          <ul className={ styles.menuMobile }>
            { links }
          </ul>
        </Transition>

        <div className={ styles.menuWrapper }>
          <BottomNavigation
            value={ route }
            onChange={ this.handleRouteChange }
            className={ styles.menu }
            showLabels
          >
            <BottomNavigationAction
              className={ styles.item }
              label="Co graliśmy?"
              value="co-gralismy"
              icon={
                <MdWhatshot size={iconSize} />
              }
            />

            <BottomNavigationAction
              className={ styles.item }
              label="Głosowania"
              value="glosowania"
              icon={
                <GoRadioTower size={iconSize} />
              }
            />

            <BottomNavigationAction
              className={ styles.item }
              label="Utwory"
              value="utwory"
              icon={
                <IoIosMusicalNotes size={iconSize} />
              }
            />

            <BottomNavigationAction
              className={ styles.item }
              label="Statystyki"
              value="statystyki"
              icon={
                <TiChartBar size={iconSize} />
              }
            />

            { yourAccount }
          </BottomNavigation>

          {/* <ul className={ styles.menu }>
            { ...links }
          </ul> */}

          <Button
            className={ styles.menuButtonOuter }
            onClick={this.menuButtonStateToggle}
          >
            <Transition
              timeout={800}
              appear
              in={isMenuButtonOpen}
              addEndListener={(node, done) => {
                const [first, second] = Array.from(
                  node.children,
                );

                const tl: TimelineMax = new TimelineMax({
                  onComplete: done,
                });

                if (!isMenuButtonOpen) {
                  tl.restart();
                }

                tl.to(first, .8, {
                  transform: isMenuButtonOpen ? (
                    'translateY(6px) rotateZ(40deg)'
                  ) : (
                    'translateY(0) rotateZ(0)'
                  ),
                  backgroundColor: isMenuButtonOpen ? '#fff' : '#353535',
                  ease: Elastic.easeOut.config(1.8, 0.5),
                });

                tl.to(second, .8, {
                  transform: isMenuButtonOpen ? (
                    'translateY(-6px) rotateZ(-40deg)'
                  ) : (
                    'translateY(0) rotateZ(0)'
                  ),
                  backgroundColor: isMenuButtonOpen ? '#fff' : '#353535',
                  ease: Elastic.easeOut.config(1.8, 0.5),
                },    '-=.8');

              }}
            >
                <ul className={ styles.menuButton }>
                  <li></li>
                  <li></li>
                </ul>
            </Transition>
          </Button>
        </div>
      </div>
    );
  }

}

export { Header };
