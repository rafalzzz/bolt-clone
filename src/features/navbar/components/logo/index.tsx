import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { LOGO_BASE64 } from '@/features/navbar/consts/logo';

const Logo = () => (
  <div className='flex items-center'>
    <Link href='/' className='text-xl font-bold'>
      <Image
        className='w-12 invert dark:invert-0 transition'
        src={LOGO_BASE64}
        alt='BoltCopy logo'
        width={40}
        height={20}
      />
    </Link>
  </div>
);

export default Logo;
