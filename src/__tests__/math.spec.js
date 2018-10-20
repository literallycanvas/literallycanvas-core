import math from "../math";

describe("math", () => {
    it("should define length function", () => {
        expect(math.len({x: 3, y: 4})).toBe(5);
    });
});
