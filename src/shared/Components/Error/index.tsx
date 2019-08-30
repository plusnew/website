import plusnew, { component, Props } from '@plusnew/core';

type props = {
  message: string,
};

export default component(
  __dirname,
  (Props: Props<props>) =>
    <Props>{props =>
      props.message
    }</Props>,
);
