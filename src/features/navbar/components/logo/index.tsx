import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { LOGO_BASE64 } from '@/shared/consts/logo';

import './logo.scss';

const Logo = () => (
  <div className='logo'>
    <Link href='/' className='logo__link'>
      <Image className='logo__image' src={LOGO_BASE64} alt='BoltCopy logo' width={40} height={20} />
    </Link>
  </div>
);

export default Logo;
