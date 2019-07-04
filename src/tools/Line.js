import {ToolWithStroke} from "./base";
import {createShape} from "../shapes";

class Line extends ToolWithStroke {
    begin(x, y, lc) {
        return (this.currentShape = createShape("Line", {
            x1: x,
            y1: y,
            x2: x,
            y2: y,
            strokeWidth: this.strokeWidth,
            dash: function() {
                switch (false) {
                    case !this.isDashed:
                        return [this.strokeWidth * 2, this.strokeWidth * 4];
                    default:
                        return null;
                }
            }.call(this),
            endCapShapes: this.hasEndArrow ? [null, "arrow"] : null,
            color: lc.getColor("primary"),
        }));
    }

    continue(x, y, lc) {
        this.currentShape.x2 = x;
        this.currentShape.y2 = y;
        return lc.drawShapeInProgress(this.currentShape);
    }

    end(x, y, lc) {
        return lc.saveShape(this.currentShape);
    }
}

Line.prototype.name = "Line";
Line.prototype.iconName = "line";
Line.prototype.optionsStyle = "line-options-and-stroke-width";

export default Line;
