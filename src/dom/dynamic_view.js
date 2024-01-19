import PubSub from 'pubsub-js';
import { ViewUpdate } from './view_updater';

export const dynamicView = (() => {
  PubSub.subscribe('new_turn', (_, game) => {
    new ViewUpdate(game).updateMain();
  });

  PubSub.subscribe('game_over', (_, game) => {
    new ViewUpdate(game).updateDisplay();
  });
})();
