import { describe, expect, it } from "vitest";
import { createBbox } from "../../helpers/bbox";
import { expandBoundingBox } from "./transform";
import { SpatialKitError } from "../../../errors/spatial-kit-error";
import { GeometryErrorCode } from "../../../errors/spatial-kit-error.models";

describe('expandBoundingBox', () => {
    it('Returns a bounding box expanded by positive padding', () => {
        const initialBbox = createBbox(3, 6, 2, 5);
        const expectedBbox = createBbox(0, 9, -1, 8);
        const result = expandBoundingBox(initialBbox, 3);

        expect(result).toEqual(expectedBbox);
    });

    it('Returns the same bounding box for zero padding', () => {
        const initialBbox = createBbox(3, 6, 2, 5);
        const expectedBbox = createBbox(3, 6, 2, 5);
        const result = expandBoundingBox(initialBbox, 0);

        expect(result).toEqual(expectedBbox);
    });

    it('Expands a bounding box with negative coordinates', () => {
        const initialBbox = createBbox(-7, -2, -4, 0);
        const expectedBbox = createBbox(-10, 1, -7, 3);
        const result = expandBoundingBox(initialBbox, 3);

        expect(result).toEqual(expectedBbox);
    });

    it('Expands a zero-sized bounding box by positive padding', () => {
        const initialBbox = createBbox(-2, -2, -4, -4);
        const expectedBbox = createBbox(-5, 1, -7, -1);
        const result = expandBoundingBox(initialBbox, 3);

        expect(result).toEqual(expectedBbox);
    });

    it('Throws an error for negative padding', () => {
        const initialBbox = createBbox(-7, -2, -4, 0);

        try {
            expandBoundingBox(initialBbox, -3);
            expect.fail('Expected expandBoundingBox to throw an error');
        } catch (error) {
            expect(error).toBeInstanceOf(SpatialKitError);
            expect((error as SpatialKitError).code).toEqual(GeometryErrorCode.INVALID_BOUNDING_EXPAND_PADDING);
        }
    });
});