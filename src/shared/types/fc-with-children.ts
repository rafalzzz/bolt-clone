import type { FC, PropsWithChildren } from 'react';

export type TFCWithChildren<ComponentProps = object> = FC<PropsWithChildren<ComponentProps>>;
