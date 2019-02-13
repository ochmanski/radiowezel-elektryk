
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.svg';

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}
