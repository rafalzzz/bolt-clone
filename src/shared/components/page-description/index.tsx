import { FC } from 'react';

import './page-description.css';

type TPageDescription = {
  description: string;
  secondaryDescription: string;
};

const PageDescription: FC<TPageDescription> = ({ description, secondaryDescription }) => (
  <div className='page-description custom-padding'>
    <div className='page-description__inner-container'>
      <h1 className='page-description__header'>{description}</h1>
      <p className='page-description__subheader'>{secondaryDescription}</p>
    </div>
  </div>
);

export default PageDescription;
