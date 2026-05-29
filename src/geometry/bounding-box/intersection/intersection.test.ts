import { describe, expect, it } from "vitest";
import { createBbox, createPoint } from "../../helpers/bbox";
import { containsPoint, hasIntersection } from "./intersection";

describe('hasIntersection', () => {
    it('Returns true for two intersecting bounding boxes', () => {
        const bboxA = createBbox(4, 10, 4, 6);
        const bboxB = createBbox(6, 20, 1, 5);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when two bounding boxes touch at the edge', () => {
        const bboxA = createBbox(4, 10, 4, 6);
        const bboxB = createBbox(10, 12, 4, 5);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true for two equal bounding boxes', () => {
        const bboxA = createBbox(4, 10, 4, 6);
        const bboxB = createBbox(4, 10, 4, 6);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when one bounding box is inside another bounding box', () => {
        const bboxA = createBbox(4, 10, 4, 6);
        const bboxB = createBbox(5, 9, 4.5, 5.5);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when one intersecting bounding box is above the viewport', () => {
        const bboxA = createBbox(4, 10, -10, -2);
        const bboxB = createBbox(5, 9, -4, 7);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when two bounding boxes touch at a corner', () => {
        const bboxA = createBbox(4, 10, 4, 6);
        const bboxB = createBbox(10, 16, 6, 8);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns false for two bounding boxes that do not touch', () => {
        const bboxA = createBbox(4, 10, 4, 6);
        const bboxB = createBbox(4, 10, 8, 10);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(false);
    });

    it('Returns false for two non-intersecting zero-width bounding boxes', () => {
        const bboxA = createBbox(4, 4, 4, 6);
        const bboxB = createBbox(4, 4, 8, 10);
        const result = hasIntersection(bboxA, bboxB);

        expect(result).toBe(false);
    });

});

describe('containsPoint', () => {
    it('Returns true when the point is inside the bounding box', () => {
        const bbox = createBbox(4, 10, 4, 6);
        const point = createPoint(5, 5);
        const result = containsPoint(bbox, point);

        expect(result).toBe(true);
    });

    it('Returns true when the point is on the edge of the bounding box', () => {
        const bbox = createBbox(4, 10, 4, 6);
        const point = createPoint(6, 4);
        const result = containsPoint(bbox, point);

        expect(result).toBe(true);
    });

    it('Returns true when the point is on a corner of the bounding box', () => {
        const bbox = createBbox(4, 10, 4, 6);
        const point = createPoint(10, 4);
        const result = containsPoint(bbox, point);

        expect(result).toBe(true);
    });

    it('Returns false when the point is outside the bounding box', () => {
        const bbox = createBbox(4, 10, 4, 6);
        const point = createPoint(-10, -4);
        const result = containsPoint(bbox, point);

        expect(result).toBe(false);
    });

    it('Returns true when the point is inside a zero-sized bounding box', () => {
        const bbox = createBbox(4, 4, 2, 2);
        const point = createPoint(4, 2);
        const result = containsPoint(bbox, point);

        expect(result).toBe(true);
    });
});