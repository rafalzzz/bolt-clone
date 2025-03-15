import type { Dispatch, RefObject, SetStateAction } from 'react';

export type TSidebar<T> = {
  ref: RefObject<T>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
