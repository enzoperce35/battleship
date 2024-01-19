import { dynamic_view } from "../../src/dom/dynamic_view";
import PubSub from "pubsub-js";

jest.mock("pubsub-js");

describe('dynamic_view', () => {
  it('subscribes to new_turn', () => {
    expect(PubSub.subscribe).toHaveBeenCalledWith('new_turn', expect.any(Function))
  })

  it('subscribes to game_over', () => {
    expect(PubSub.subscribe).toHaveBeenCalledWith('game_over', expect.any(Function))
  })
});
