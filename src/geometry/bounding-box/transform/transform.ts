import { SpatialKitError } from "../../../errors/spatial-kit-error";
import { GeometryErrorCode } from "../../../errors/spatial-kit-error.models";
import { BoundingBox, AxisRange } from "../../types";

export function expandBoundingBox(bbox: BoundingBox, padding: number): BoundingBox {
    if (padding < 0) {
        throw new SpatialKitError(GeometryErrorCode.INVALID_BOUNDING_EXPAND_PADDING)
    }

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
