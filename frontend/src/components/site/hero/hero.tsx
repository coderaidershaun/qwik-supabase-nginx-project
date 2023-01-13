import { component$ } from "@builder.io/qwik";
import { ButtonStd } from "~/components/ui/button-std";
import { Link } from "@builder.io/qwik-city";

export const Hero = component$(() => {
  return (
    <section class="py-24 w-full bg-gradient-to-br from-gray-900 to-sky-900 shadow-xl">
      <div class="flex flex-col h-full items-center justify-center w-full">
        <div class="text-white text-4xl md:text-5xl lg:text-7xl tracking-tighter font-extrabold font-sans">
          Good People Borrow
        </div>
        <div class="relative flex justify-center text-white text-5xl md:text-6xl lg:text-8xl tracking-tight font-extrabold font-sans">
          <div class="text-green-500 ">Great People Steal</div>
        </div>
        <div class="text-slate-300 mt-24 italic text-xl font-light">
          ~ Picasso ~
        </div>
        <div class="text-white mt-24 itali text-xl italic">
          Get the Developer Resources Your Need
        </div>
        <Link href="/signup">
          <ButtonStd
            title="Become a Code Raider"
            classText="bg-sky-500 hover:bg-sky-400 mt-5 shadow-xl hover:shadow-none"
          />
        </Link>
      </div>
    </section>
  );
});
