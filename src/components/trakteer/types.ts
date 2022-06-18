import { MutableRefObject } from "react";

export interface TrakteerContextValue {
  trakteerRef: MutableRefObject<HTMLIFrameElement | null>;
  isTrakteerOpen: boolean;
  setIsTrakteerOpen: (b: boolean) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
}
export type TrakteerProviderProps = { children: React.ReactNode };
