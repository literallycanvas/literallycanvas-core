import math from "../math";

describe("math", () => {
    it("should define length function", () => {
        expect(math.len({x: 3, y: 4})).toBe(5);
    });
    it("should define diff function", () => {
        expect(math.diff({x: 3, y: 4}, {x: 3, y: 4})).toEqual({x: 0, y: 0});
        expect(math.diff({x: 1, y: 4}, {x: 3, y: 4})).toEqual({x: 2, y: 0});
        expect(math.diff({x: 3, y: 2}, {x: 3, y: 4})).toEqual({x: 0, y: 2});
        expect(math.diff({x: 10, y: 10}, {x: 3, y: 4})).toEqual({x: -7, y: -6});
    });
});
