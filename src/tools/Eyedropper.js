import {Tool} from "./base";

const getPixel = function(ctx, arg) {
    var pixel, x, y;
    (x = arg.x), (y = arg.y);
    pixel = ctx.getImageData(x, y, 1, 1).data;
    if (pixel[3]) {
        return "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    } else {
        return null;
    }
};

class Eyedropper extends Tool {
    readColor(x, y, lc) {
        var canvas, color, newColor, offset;
        offset = lc.getDefaultImageRect();
        canvas = lc.getImage();
        newColor = getPixel(canvas.getContext("2d"), {
            x: x - offset.x,
            y: y - offset.y,
        });
        color = newColor || lc.getColor("background");
        if (this.strokeOrFill === "stroke") {
            return lc.setColor("primary", newColor);
        } else {
            return lc.setColor("secondary", newColor);
        }
    }

    begin(x, y, lc) {
        return this.readColor(x, y, lc);
    }

    continue(x, y, lc) {
        return this.readColor(x, y, lc);
    }
}

Eyedropper.prototype.name = "Eyedropper";
Eyedropper.prototype.iconName = "eyedropper";
Eyedropper.prototype.optionsStyle = "stroke-or-fill";

export default Eyedropper;
