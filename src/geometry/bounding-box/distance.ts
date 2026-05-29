import { BoundingBox, AxisRange, Point } from "../types";

export function getPointToBoundingBoxDistance(point: Point, bbox: BoundingBox): number {
    const distanceX = getDistanceToAxisRange(bbox.x, point.x);
    const distanceY = getDistanceToAxisRange(bbox.y, point.y);

    return Math.sqrt(distanceX ** 2 + distanceY ** 2);
}

function getDistanceToAxisRange(axis: AxisRange, coordinate: number): number {
    if (coordinate < axis.min) {
        return axis.min - coordinate;
    }

    if (coordinate > axis.max) {
        return coordinate - axis.max;
    }

    return 0;
}