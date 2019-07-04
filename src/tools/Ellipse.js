import {ToolWithStroke} from "./base";
import {createShape} from "../shapes";

class Ellipse extends ToolWithStroke {
    begin(x, y, lc) {
        return (this.currentShape = createShape("Ellipse", {
            x: x,
            y: y,
            strokeWidth: this.strokeWidth,
            strokeColor: lc.getColor("primary"),
            fillColor: lc.getColor("secondary"),
        }));
    }

    continue(x, y, lc) {
        this.currentShape.width = x - this.currentShape.x;
        this.currentShape.height = y - this.currentShape.y;
        return lc.drawShapeInProgress(this.currentShape);
    }

    end(x, y, lc) {
        return lc.saveShape(this.currentShape);
    }
}

Ellipse.prototype.name = "Ellipse";
Ellipse.prototype.iconName = "ellipse";

export default Ellipse;
