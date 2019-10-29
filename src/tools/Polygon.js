import {ToolWithStroke} from "./base";
import {createShape} from "../shapes";

class Polygon extends ToolWithStroke {
    constructor(lc) {
        super(lc);
    }

    didBecomeActive(lc) {
        let onDown,
            onMove,
            onUp,
            polygonCancel,
            polygonFinishClosed,
            polygonFinishOpen,
            polygonUnsubscribeFuncs;

        super.didBecomeActive.call(this, lc);
        polygonUnsubscribeFuncs = [];
        this.polygonUnsubscribe = (function(_this) {
            return function() {
                let func, i, len, results;
                results = [];
                for (
                    i = 0, len = polygonUnsubscribeFuncs.length;
                    i < len;
                    i++
                ) {
                    func = polygonUnsubscribeFuncs[i];
                    results.push(func());
                }
                return results;
            };
        })(this);
        this.points = null;
        this.maybePoint = null;
        onUp = (function(_this) {
            return function() {
                if (_this._getWillFinish()) {
                    return _this._close(lc);
                }
                lc.trigger("lc-polygon-started");
                if (_this.points) {
                    _this.points.push(_this.maybePoint);
                } else {
                    _this.points = [_this.maybePoint];
                }
                _this.maybePoint = {
                    x: _this.maybePoint.x,
                    y: _this.maybePoint.y,
                };
                lc.setShapesInProgress(_this._getShapes(lc));
                return lc.repaintLayer("main");
            };
        })(this);
        onMove = (function(_this) {
            return function(arg) {
                var x, y;
                (x = arg.x), (y = arg.y);
                if (_this.maybePoint) {
                    _this.maybePoint.x = x;
                    _this.maybePoint.y = y;
                    lc.setShapesInProgress(_this._getShapes(lc));
                    return lc.repaintLayer("main");
                }
            };
        })(this);
        onDown = (function(_this) {
            return function(arg) {
                var x, y;
                (x = arg.x), (y = arg.y);
                _this.maybePoint = {
                    x: x,
                    y: y,
                };
                lc.setShapesInProgress(_this._getShapes(lc));
                return lc.repaintLayer("main");
            };
        })(this);
        polygonFinishOpen = (function(_this) {
            return function() {
                _this.maybePoint = {
                    x: Infinity,
                    y: Infinity,
                };
                return _this._close(lc);
            };
        })(this);
        polygonFinishClosed = (function(_this) {
            return function() {
                _this.maybePoint = _this.points[0];
                return _this._close(lc);
            };
        })(this);
        polygonCancel = (function(_this) {
            return function() {
                return _this._cancel(lc);
            };
        })(this);
        polygonUnsubscribeFuncs.push(
            lc.on(
                "drawingChange",
                (function(_this) {
                    return function() {
                        return _this._cancel(lc);
                    };
                })(this),
            ),
        );
        polygonUnsubscribeFuncs.push(lc.on("lc-pointerdown", onDown));
        polygonUnsubscribeFuncs.push(lc.on("lc-pointerdrag", onMove));
        polygonUnsubscribeFuncs.push(lc.on("lc-pointermove", onMove));
        polygonUnsubscribeFuncs.push(lc.on("lc-pointerup", onUp));
        polygonUnsubscribeFuncs.push(
            lc.on("lc-polygon-finishopen", polygonFinishOpen),
        );
        polygonUnsubscribeFuncs.push(
            lc.on("lc-polygon-finishclosed", polygonFinishClosed),
        );
        return polygonUnsubscribeFuncs.push(
            lc.on("lc-polygon-cancel", polygonCancel),
        );
    }

    willBecomeInactive(lc) {
        super.willBecomeInactive.call(this, lc);
        if (this.points || this.maybePoint) {
            this._cancel(lc);
        }
        return this.polygonUnsubscribe();
    }

    _getArePointsClose(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) < 10;
    }

    _getWillClose() {
        if (!(this.points && this.points.length > 1)) {
            return false;
        }
        if (!this.maybePoint) {
            return false;
        }
        return this._getArePointsClose(this.points[0], this.maybePoint);
    }

    _getWillFinish() {
        if (!(this.points && this.points.length > 1)) {
            return false;
        }
        if (!this.maybePoint) {
            return false;
        }
        return (
            this._getArePointsClose(this.points[0], this.maybePoint) ||
            this._getArePointsClose(
                this.points[this.points.length - 1],
                this.maybePoint,
            )
        );
    }

    _cancel(lc) {
        lc.trigger("lc-polygon-stopped");
        this.maybePoint = null;
        this.points = null;
        lc.setShapesInProgress([]);
        return lc.repaintLayer("main");
    }

    _close(lc) {
        lc.trigger("lc-polygon-stopped");
        lc.setShapesInProgress([]);
        if (this.points.length > 2) {
            lc.saveShape(this._getShape(lc, false));
        }
        this.maybePoint = null;
        return (this.points = null);
    }

    _getShapes(lc, isInProgress) {
        var shape;
        if (isInProgress == null) {
            isInProgress = true;
        }
        shape = this._getShape(lc, isInProgress);
        if (shape) {
            return [shape];
        } else {
            return [];
        }
    }

    _getShape(lc, isInProgress) {
        var points;
        if (isInProgress == null) {
            isInProgress = true;
        }
        points = [];
        if (this.points) {
            points = points.concat(this.points);
        }
        if (!isInProgress && points.length < 3) {
            return null;
        }
        if (isInProgress && this.maybePoint) {
            points.push(this.maybePoint);
        }
        if (points.length > 1) {
            return createShape("Polygon", {
                isClosed: this._getWillClose(),
                strokeColor: lc.getColor("primary"),
                fillColor: lc.getColor("secondary"),
                strokeWidth: this.strokeWidth,
                points: points.map(function(xy) {
                    return createShape("Point", xy);
                }),
            });
        } else {
            return null;
        }
    }
}

Polygon.prototype.name = "Polygon";
Polygon.prototype.iconName = "polygon";
Polygon.prototype.usesSimpleAPI = false;
Polygon.prototype.optionsStyle = "polygon-and-stroke-width";

export default Polygon;
