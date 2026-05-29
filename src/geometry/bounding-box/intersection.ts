import { BoundingBox, AxisRange, Point } from "../types/geometry.types";

export function hasIntersection(a: BoundingBox, b: BoundingBox): boolean {
    return hasAxisIntersection(a.x, b.x) && hasAxisIntersection(a.y, b.y);
}

function hasAxisIntersection(a: AxisRange, b: AxisRange): boolean {
    return Math.max(a.min, b.min) <= Math.min(a.max, b.max);
}

export function containsPoint(bbox: BoundingBox, point: Point): boolean {
    return containsCoordinate(bbox.x, point.x) && containsCoordinate(bbox.y, point.y);
}

export function containsCoordinate(axis: AxisRange, pointCoord: number): boolean {
    return pointCoord >= axis.min && pointCoord <= axis.max;
}
