/*
    TODO: Remove after vroom-ui is built and a real package
    This is only needed because the build breaks

    ../../libs/vroom-ui/src/elements/Icon/Icon.tsx:4:18
    Type error: Cannot find module '../../../public/assets/icons.svg'.

 */

declare module '*.svg' {
  const content: any;
  export default content;
}
