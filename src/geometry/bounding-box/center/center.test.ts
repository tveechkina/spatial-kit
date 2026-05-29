import { describe, expect, it } from 'vitest';
import { createBbox } from '../../helpers/bbox';
import { getBoundingBoxCenter } from './center';

describe('getBoundingBoxCenter', () => {
    it('Returns the center of the bounding box', () => {
        const bbox = createBbox(0, 10, 0, 20);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: 5,
            y: 10
        });
    });

    it('Returns the center of a bounding box above the viewport', () => {
        const bbox = createBbox(4, 10, -6, -2);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: 7,
            y: -4
        });
    });

    it('Returns the center of a bounding box to the left of the viewport', () => {
        const bbox = createBbox(-4, -10, 2, 6);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: -7,
            y: 4
        });
    });

    it('Returns the center of a bounding box crossing the X axis', () => {
        const bbox = createBbox(4, 10, -2, 2);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: 7,
            y: 0
        });
    });

    it('Returns the center of a bounding box crossing the Y axis', () => {
        const bbox = createBbox(-4, 4, 2, 6);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: 0,
            y: 4
        });
    });

    it('Returns the center of a bounding box centered at the origin', () => {
        const bbox = createBbox(-4, 4, -4, 4);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: 0,
            y: 0
        });
    });

    it('Returns a decimal center for a bounding box with an odd width or height', () => {
        const bbox = createBbox(0, 5, 0, 7);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: 2.5,
            y: 3.5
        });
    });

    it('Returns the center of a zero-width bounding box', () => {
        const bbox = createBbox(5, 5, 0, 7);
        const result = getBoundingBoxCenter(bbox);

        expect(result).toEqual({
            x: 5,
            y: 3.5
        });
    });
});
