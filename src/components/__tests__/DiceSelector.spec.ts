import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { dicePool } from "../../data/dicePool";
import DiceSelector from "../DiceSelector.vue";

describe("DiceSelector", () => {
  it("renders properly", () => {
    const wrapper = mount(DiceSelector, { props: { dice: dicePool } });
    expect(wrapper.text()).toContain("");
  });
});
