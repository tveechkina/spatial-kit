import { BoundingBox } from "../../types";

export function isAbove(a: BoundingBox, b: BoundingBox): boolean {
    return a.y.max < b.y.min;
}

export function isBelow(a: BoundingBox, b: BoundingBox): boolean {
    return a.y.min > b.y.max;
}

export function isLeftOf(a: BoundingBox, b: BoundingBox): boolean {
    return a.x.max < b.x.min;
}

export function isRightOf(a: BoundingBox, b: BoundingBox): boolean {
    return a.x.min > b.x.max;
}
