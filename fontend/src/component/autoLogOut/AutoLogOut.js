import { useEffect, useState } from 'react';
import IdleTimer from './IdleTimer';
import swal from 'sweetalert';

export default function AutoLogOut() {
  const [isTimeout, setIsTimeout] = useState(false);
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 600, //seconds
      onTimeout: () => {
        setIsTimeout(true);
        swal({
          title: 'You have been locked out',
          text: `You have not been active for ${timer.timeout / 60} min`,
          type: 'error',
          icon: 'error',
        }).then(function () {
          window.location.href = '/signIn';
        });
      },
      onExpired: () => {
        setIsTimeout(true);
      },
      onDestroy: () => {},
    });

    return () => {
      if (isTimeout) {
        timer.cleanUp();
      }
    };
  }, [isTimeout]);

  return <div>{isTimeout ? '' : ''}</div>;
}
