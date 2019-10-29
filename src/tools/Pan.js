import {Tool} from "./base";

class Pan extends Tool {
    didBecomeActive(lc) {
        const unsubscribeFuncs = [];
        this.unsubscribe = (function(_this) {
            return function() {
                let func, i, len, results;
                results = [];
                for (i = 0, len = unsubscribeFuncs.length; i < len; i++) {
                    func = unsubscribeFuncs[i];
                    results.push(func());
                }
                return results;
            };
        })(this);
        unsubscribeFuncs.push(
            lc.on(
                "lc-pointerdown",
                (function(_this) {
                    return function(arg) {
                        let rawX, rawY;
                        (rawX = arg.rawX), (rawY = arg.rawY);
                        _this.oldPosition = lc.position;
                        return (_this.pointerStart = {
                            x: rawX,
                            y: rawY,
                        });
                    };
                })(this),
            ),
        );
        return unsubscribeFuncs.push(
            lc.on(
                "lc-pointerdrag",
                (function(_this) {
                    return function(arg) {
                        let dp, rawX, rawY;
                        (rawX = arg.rawX), (rawY = arg.rawY);
                        dp = {
                            x: (rawX - _this.pointerStart.x) * lc.backingScale,
                            y: (rawY - _this.pointerStart.y) * lc.backingScale,
                        };
                        return lc.setPan(
                            _this.oldPosition.x + dp.x,
                            _this.oldPosition.y + dp.y,
                        );
                    };
                })(this),
            ),
        );
    }

    willBecomeInactive(lc) {
        return this.unsubscribe();
    }
}

Pan.prototype.name = "Pan";
Pan.prototype.iconName = "pan";
Pan.prototype.usesSimpleAPI = false;

export default Pan;
