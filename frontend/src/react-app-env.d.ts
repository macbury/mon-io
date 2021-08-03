/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

// import original module declarations
import 'styled-components'
import 'styled-components/native'
import { MonioTheme } from './config/types'

declare module 'styled-components' {
  export interface DefaultTheme extends MonioTheme {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends MonioTheme {}
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchGraphqlSchema(): CustomMatcherResult
    }
  }
}

declare module 'react' {
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: any): T;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.graphql' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}


declare module 'react-native' {
  export class VirtualizedList<ItemT> extends React.Component<
    VirtualizedListProps<ItemT>
  > {
    scrollToEnd: (params?: { animated?: boolean }) => void;
    scrollToIndex: (
      params: {
        animated?: boolean;
        index: number;
        viewOffset?: number;
        viewPosition?: number;
      }
    ) => void;
    scrollToItem: (
      params: { animated?: boolean; item: ItemT; viewPosition?: number }
    ) => void;
    scrollToOffset: (params: { animated?: boolean; offset: number }) => void;
    recordInteraction: () => void;
  }
}
