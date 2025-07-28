'use client';

import { memo, useEffect } from 'react';
import { trackEvent } from '@/lib/trackEvent';

/** 谷歌Firebase组件 */
const Firebase = () => {
  useEffect(() => {
    trackEvent('initialize');
  }, []);
  return null;
};

export default memo(Firebase);
