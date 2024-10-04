// SASS
declare module '*.css';
declare module '*.scss';

declare module '*.md' {
  const content: string;
  export default content;
}
declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import type * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const content: string;
  export default content;
}

declare module '*.svg?source' {
  const content: string;
  export default content;
}
