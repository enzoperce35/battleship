import { Game } from "./game";
import { Player } from "./player";
import { static_view } from "./dom/static_view";
import { dynamic_view } from "./dom/dynamic_view";
import "./index.css";

new Game(Player(true), Player()).play();
