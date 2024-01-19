import { viewUpdate } from "./view_updater";
import PubSub from "pubsub-js";

export let dynamic_view = (() => {
  PubSub.subscribe('new_turn', (_, game) => {
    new viewUpdate(game).updateMain();
  })

  PubSub.subscribe('game_over', (_, game) => {
    new viewUpdate(game).updateDisplay()
  })
})();
