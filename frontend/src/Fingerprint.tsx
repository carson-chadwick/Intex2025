import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import { useEffect, useState } from 'react';

export const Fingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    getFingerprint().then((fingerprint) => {
      setFingerprint(fingerprint);
    });
  }, []);
  return <div>{fingerprint}</div>;
};

export default Fingerprint;
