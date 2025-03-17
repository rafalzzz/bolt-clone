import Image from 'next/image';
import Link from 'next/link';

import { LOGO_BASE64 } from '@/shared/consts/logo';

const Logo = () => (
  <div className='flex items-center'>
    <Link href='/' prefetch className='text-xl font-bold'>
      <Image
        className='w-12 invert dark:invert-0 transition-all'
        src={LOGO_BASE64}
        alt='BoltCopy logo'
        width={40}
        height={20}
      />
    </Link>
  </div>
);

export default Logo;
