import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const links = [
  { label: "About", link: "/about" },
  { label: "Shop", link: "/shop" },
  { label: "Services", link: "/services" },
  { label: "Privacy", link: "/privacy" },
  { label: "Terms", link: "/terms" },
  { label: "Disclaimer", link: "/disclaimer" },
  { label: "Contact", link: "/contact" },
];

export const Footer = component$(() => {
  return (
    <footer class="bg-gray-900">
      <div class="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <nav
          class="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {links.map((link) => {
            return (
              <div key={link.label} class="px-5 py-2">
                <Link
                  href={link.link}
                  class="text-base text-gray-500 hover:text-sky-500"
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </nav>

        <p class="mt-8 text-center text-base text-gray-400">
          &copy; 2023 CodeRaiders.com - XCHAIN ANALYTICS LTD
        </p>
      </div>
    </footer>
  );
});
