import { component$ } from "@builder.io/qwik";
import { Grid } from "../svgs/grid";

interface ItemProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  isLoadingLabel?: string;
  handleFunction?: any;
  label: string;
}

export const ButtonAction = component$((props: ItemProps) => {
  return (
    <button
      onClick$={props.handleFunction}
      class={
        "transition-all duration-300 shadow-lg hover:shadow-none flex text-white px-4 py-2 w-56 justify-center rounded-sm space-x-4 " +
        (props.isDisabled ? "bg-gray-500 " : "bg-sky-500 hover:bg-sky-400 ")
      }
    >
      {props.isLoading && (
        <>
          <Grid />
          <span class="">{props.isLoadingLabel}</span>
        </>
      )}

      {!props.isLoading && <span class="">{props.label}</span>}
    </button>
  );
});
