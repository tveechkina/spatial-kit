import { describe, expect, it } from "vitest";
import { createBbox } from "../../helpers/bbox";
import { isAbove, isBelow, isLeftOf, isRightOf } from "./position";

describe('isAbove', () => {
    it('Returns true when bounding box A is above bounding box B', () => {
        const bboxA = createBbox(-4, 0, -8, 0);
        const bboxB = createBbox(4, 10, 2, 8);
        const result = isAbove(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when zero-height bounding box A is above zero-height bounding box B', () => {
        const bboxA = createBbox(-4, 0, -8, -8);
        const bboxB = createBbox(4, 10, 2, 2);
        const result = isAbove(bboxA, bboxB);

        expect(result).toBe(true);
    });


    it('Returns false when bounding box A touches bounding box B from above', () => {
        const bboxA = createBbox(4, 10, 0, 2);
        const bboxB = createBbox(4, 10, 2, 8);
        const result = isAbove(bboxA, bboxB);

        expect(result).toBe(false);
    });

    it('Returns false for two intersecting bounding boxes', () => {
        const bboxA = createBbox(4, 10, 0, 3);
        const bboxB = createBbox(4, 10, 2, 8);
        const result = isAbove(bboxA, bboxB);

        expect(result).toBe(false);
    });
});

describe('isBelow', () => {
    it('Returns true when bounding box A is below bounding box B', () => {
        const bboxA = createBbox(12, 14, 10, 14);
        const bboxB = createBbox(4, 10, 2, 8);
        const result = isBelow(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when zero-height bounding box A is below zero-height bounding box B', () => {
        const bboxA = createBbox(-4, 0, 2, 2);
        const bboxB = createBbox(4, 10, 0, 0);
        const result = isBelow(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns false when bounding box A touches bounding box B from below', () => {
        const bboxA = createBbox(12, 14, 10, 14);
        const bboxB = createBbox(12, 14, 2, 10);
        const result = isBelow(bboxA, bboxB);

        expect(result).toBe(false);
    });

    it('Returns false for two intersecting bounding boxes', () => {
        const bboxA = createBbox(4, 10, 0, 3);
        const bboxB = createBbox(4, 10, -2, 1);
        const result = isBelow(bboxA, bboxB);

        expect(result).toBe(false);
    });
});

describe('isLeftOf', () => {
    it('Returns true when bounding box A is to the left of bounding box B', () => {
        const bboxA = createBbox(2, 10, 2, 8);
        const bboxB = createBbox(12, 14, -4, 0);
        const result = isLeftOf(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when zero-width bounding box A is to the left of zero-width bounding box B', () => {
        const bboxA = createBbox(-4, -4, 2, 10);
        const bboxB = createBbox(4, 4, 0, 0);
        const result = isLeftOf(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns false when bounding box A touches bounding box B from the left', () => {
        const bboxA = createBbox(8, 12, 2, 14);
        const bboxB = createBbox(12, 14, 2, 10);
        const result = isLeftOf(bboxA, bboxB);

        expect(result).toBe(false);
    });

    it('Returns false for two intersecting bounding boxes', () => {
        const bboxA = createBbox(-4, 5, -2, 1);
        const bboxB = createBbox(4, 10, -2, 1);
        const result = isLeftOf(bboxA, bboxB);

        expect(result).toBe(false);
    });
});

describe('isRightOf', () => {
    it('Returns true when bounding box A is to the right of bounding box B', () => {
        const bboxA = createBbox(12, 14, 2, 8);
        const bboxB = createBbox(2, 6, -4, 0);
        const result = isRightOf(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns true when zero-width bounding box A is to the right of zero-width bounding box B', () => {
        const bboxA = createBbox(4, 4, 2, 10);
        const bboxB = createBbox(-4, -4, 0, 0);
        const result = isRightOf(bboxA, bboxB);

        expect(result).toBe(true);
    });

    it('Returns false when bounding box A touches bounding box B from the right', () => {
        const bboxA = createBbox(12, 14, 2, 14);
        const bboxB = createBbox(10, 12, 2, 10);
        const result = isRightOf(bboxA, bboxB);

        expect(result).toBe(false);
    });

    it('Returns false for two intersecting bounding boxes', () => {
        const bboxA = createBbox(4, 10, 0, 3);
        const bboxB = createBbox(0, 5, 0, 3);
        const result = isRightOf(bboxA, bboxB);

        expect(result).toBe(false);
    });
});