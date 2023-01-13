import { component$ } from "@builder.io/qwik";

interface ItemProps {
  title: string;
  classText?: string;
  handleFunction?: any;
  noBackground?: boolean;
}

export const ButtonStd = component$((props: ItemProps) => {

  return (
    <button
      onClick$={props.handleFunction}
      class={
        props.classText +
        " transition-all duration-300 px-4 py-2 rounded-sm "
      }
    >
      <div>{props.title}</div>
    </button>
  );
});
