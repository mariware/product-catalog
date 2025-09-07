import type { Route } from "./+types/not-found";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Catalog" },
    { name: "description", content: "Browse latest games." },
  ];
}


export default function NotFound() {
  return (
    <div className="flex flex-col max-w-5xl p-8 gap-16 pb-16">
      <p className="text-3xl font-bold">Page doesn't exist.</p>
    </div>
  );
}
