import { BoundingBox, AxisRange } from "../types/geometry.types";

export function expandBoundingBox(bbox: BoundingBox, padding: number): BoundingBox {
    return {
        x: expandAxis(bbox.x, padding),
        y: expandAxis(bbox.y, padding)
    };
}

function expandAxis(axis: AxisRange, padding: number): AxisRange {
    return {
        min: axis.min - padding,
        max: axis.max + padding
    }
}
