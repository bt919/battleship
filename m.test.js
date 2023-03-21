import { hello } from "./src/index.js";

test("returns hello", () => {
  expect(hello()).toBe("hello");
});
