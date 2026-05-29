import { BoundingBox, Point, Rectangle } from "../types";

export function createBbox(minX: number, maxX: number, minY: number, maxY: number): BoundingBox {
    return {
        x: {
            min: minX,
            max: maxX
        },
        y: {
            min: minY,
            max: maxY
        }
    }
};

export function createPoint(x: number, y: number): Point {
    return {
        x,
        y
    }
};

export function createRectangle(width: number, height: number, x: number, y: number): Rectangle {
    return {
        x, y, width, height
    }
}