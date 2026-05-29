import { BoundingBox, Rectangle } from "../types/geometry.types";

export function rectangleToBoundingBox(rectangle: Rectangle): BoundingBox {
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