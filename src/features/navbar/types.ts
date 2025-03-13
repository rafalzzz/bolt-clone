import type { Dispatch, RefObject, SetStateAction } from 'react';

export type TNavButton = Readonly<{
  href: string;
  translation: string;
  testId: string;
}>;

export type TSidebar<T> = {
  ref: RefObject<T>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
