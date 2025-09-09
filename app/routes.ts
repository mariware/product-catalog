import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/browse", "routes/browse.tsx"),
  ...prefix("games", [
    route(":id", "routes/games/game.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
