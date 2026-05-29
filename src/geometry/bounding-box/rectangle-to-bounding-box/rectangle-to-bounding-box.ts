import { SpatialKitError } from "../../../errors/spatial-kit-error";
import { GeometryErrorCode } from "../../../errors/spatial-kit-error.models";
import { BoundingBox, Rectangle } from "../../types";

export function rectangleToBoundingBox(rectangle: Rectangle): BoundingBox {
    if (rectangle.height < 0) {
        throw new SpatialKitError(GeometryErrorCode.INVALID_RECTANGLE_HEIGHT);
    }

    if (rectangle.width < 0) {
        throw new SpatialKitError(GeometryErrorCode.INVALID_RECTANGLE_WIDTH);
    }

    return {
        x: {
            min: rectangle.x,
            max: rectangle.x + rectangle.width
        },
        y: {
            min: rectangle.y,
            max: rectangle.y + rectangle.height
        },
    }
}