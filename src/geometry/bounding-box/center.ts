import { BoundingBox, AxisRange, Point } from "../types/geometry.types";

export function getBoundingBoxCenter(bbox: BoundingBox): Point {
    return {
        x: getAxisRangeCenter(bbox.x),
        y: getAxisRangeCenter(bbox.y)
    }
}

function getAxisRangeCenter(axis: AxisRange): number {
    return axis.max - ((axis.max - axis.min) / 2);
}
