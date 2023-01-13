import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './logo.css?inline';


export const Logo = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="flex justify-start items-center">
      <div class="w-12 h-12 mr-2">
        <img src={"/img/icon.png"} alt="Code Raiders Logo" />
      </div>
      <div>
        <div class="text-lg logo-title text-gray-800">Code Raiders</div>
        <div class="-mt-2 text-[10pt] logo-subtitle text-gray-500 italic">Shut up and code</div>
      </div>
    </div>
  );
});
