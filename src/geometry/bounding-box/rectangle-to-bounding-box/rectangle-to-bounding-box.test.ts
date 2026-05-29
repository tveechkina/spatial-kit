import { describe, expect, it } from "vitest";
import { rectangleToBoundingBox } from "./rectangle-to-bounding-box";
import { createBbox, createRectangle } from "../../helpers/bbox";
import { SpatialKitError } from "../../../errors/spatial-kit-error";
import { GeometryErrorCode } from "../../../errors/spatial-kit-error.models";

describe('rectangleToBoundingBox', () => {
    it('Creates a valid bounding box from rectangle coordinates and size', () => {
        const rectangle = createRectangle(10, 5, 0, 5)
        const result = rectangleToBoundingBox(rectangle);
        const boundingBox = createBbox(0, 10, 5, 10);

        expect(result).toEqual(boundingBox);
    });

    it('Creates a zero-sized bounding box from a zero-sized rectangle', () => {
        const rectangle = createRectangle(0, 0, 5, 5)
        const result = rectangleToBoundingBox(rectangle);
        const boundingBox = createBbox(5, 5, 5, 5);

        expect(result).toEqual(boundingBox);
    });

    it('Creates a valid bounding box from a rectangle with negative coordinates', () => {
        const rectangle = createRectangle(10, 5, -4, -6)
        const result = rectangleToBoundingBox(rectangle);
        const boundingBox = createBbox(-4, 6, -6, -1);

        expect(result).toEqual(boundingBox);
    });

    it('Throws an error for a rectangle with invalid height', () => {
        const rectangle = createRectangle(2, -5, 5, 5)

        try {
            rectangleToBoundingBox(rectangle);
            expect.fail('Expected rectangleToBoundingBox to throw an error');
        } catch (error) {
            expect(error).toBeInstanceOf(SpatialKitError);
            expect((error as SpatialKitError).code).toEqual(GeometryErrorCode.INVALID_RECTANGLE_HEIGHT);
        }
    });

    it('Throws an error for a rectangle with invalid width', () => {
        const rectangle = createRectangle(-2, 5, 5, 5)

        try {
            rectangleToBoundingBox(rectangle);
            expect.fail('Expected rectangleToBoundingBox to throw an error');
        } catch (error) {
            expect(error).toBeInstanceOf(SpatialKitError);
            expect((error as SpatialKitError).code).toEqual(GeometryErrorCode.INVALID_RECTANGLE_WIDTH);
        }
    });
});