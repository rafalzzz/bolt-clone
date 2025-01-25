import { type FC, type PropsWithChildren } from 'react';

export type TFCWithChildren<ComponentProps = object> = FC<PropsWithChildren<ComponentProps>>;
