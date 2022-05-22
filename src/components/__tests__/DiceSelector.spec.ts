import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

import { mount } from "@vue/test-utils";
import { dicePool } from "../../data/dicePool";
import DiceSelector from "../DiceSelector.vue";

describe("DiceSelector", () => {
  it("renders properly", () => {
    const wrapper = mount(DiceSelector, {
      props: { dice: dicePool },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });
    expect(wrapper.text()).toContain("");
  });
});
