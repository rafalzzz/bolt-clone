import { EToastType } from '@/shared/enums/toast-type';

export type TToastParams = {
  text: string;
  type?: EToastType;
  testId?: string;
};
