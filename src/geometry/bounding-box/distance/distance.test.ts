import { describe, expect, it } from "vitest";
import { createBbox, createPoint } from "../../helpers/bbox";
import { getPointToBoundingBoxDistance } from "./distance";

describe(('getPointToBoundingBoxDistance'), () => {
    it('Returns the diagonal distance from a point outside both bounding box axes', () => {
        const bbox = createBbox(0, 10, 0, 10);
        const point = createPoint(15, 14);

        expect(getPointToBoundingBoxDistance(point, bbox)).toBeCloseTo(6.4)
    });

    it('Returns the horizontal distance when the point is to the right of the bounding box', () => {
        const bbox = createBbox(0, 10, 0, 10);
        const point = createPoint(15, 5);

        expect(getPointToBoundingBoxDistance(point, bbox)).toEqual(5)
    });

    it('Returns the vertical distance when the point is below the bounding box', () => {
        const bbox = createBbox(0, 10, 0, 10);
        const point = createPoint(6, 12);

        expect(getPointToBoundingBoxDistance(point, bbox)).toEqual(2)
    });


    it('Returns the diagonal distance from a point below and to the right of a bounding box above the X axis', () => {
        const bbox = createBbox(4, 10, -6, -2);
        const point = createPoint(12, 2);

        expect(getPointToBoundingBoxDistance(point, bbox)).toBeCloseTo(4.47)
    });

    it('Returns zero when the point is inside the bounding box', () => {
        const bbox = createBbox(2, 9, 3, 10);
        const point = createPoint(3, 5);

        expect(getPointToBoundingBoxDistance(point, bbox)).toEqual(0)
    });

    it('Returns zero when the point is on the border of a zero-width bounding box', () => {
        const bbox = createBbox(2, 2, 3, 10);
        const point = createPoint(2, 7);

        expect(getPointToBoundingBoxDistance(point, bbox)).toEqual(0)
    });

    it('Returns the horizontal distance from a zero-width bounding box to a point on the right', () => {
        const bbox = createBbox(2, 2, 3, 10);
        const point = createPoint(4, 7);

        expect(getPointToBoundingBoxDistance(point, bbox)).toEqual(2)
    });

    it('Returns the diagonal distance from a zero-width bounding box to a point above and to the left', () => {
        const bbox = createBbox(2, 2, 3, 10);
        const point = createPoint(-2, -7);

        expect(getPointToBoundingBoxDistance(point, bbox)).toBeCloseTo(10.77)
    });
});