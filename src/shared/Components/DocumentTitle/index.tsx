import plusnew, { component, Props } from 'plusnew';

type props = {
  value: string,
};

export default component(
  __dirname,
  (Props: Props<props>) =>
    <Props>{(props) => {
      document.title = props.value;
      return null;
    }}</Props>,
);
