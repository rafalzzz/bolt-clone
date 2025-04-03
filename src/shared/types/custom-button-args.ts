import type { ButtonHTMLAttributes } from 'react';

export type TCustomButton = {
  text: string;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  testId?: string;
  isLoading?: boolean;
  additionalClassNames?: string;
};
