import React, {
  Component,
  ReactNode,
} from 'react';

import * as styles from '@styles/components/Counter.scss';

class Counter extends Component {

  public render(): ReactNode {

    return (
      <div className={ styles.counterOuter }>
        <div className={ styles.counterPlaceholder }></div>

        <ul className={ styles.counterWrapper }>
          <li className={`${styles.counter} ${styles.hours}`}>08</li>
          <li className={`${styles.counter} ${styles.minutes}`}>12</li>
          <li className={`${styles.counter} ${styles.seconds}`}>23</li>
        </ul>
      </div>
    );
  }

}

export { Counter };
