export interface Point {
    x: number;
    y: number;
}

export interface Rectangle extends Point {
    width: number;
    height: number;
}

export interface AxisRange {
    min: number;
    max: number;
}

export interface BoundingBox {
    x: AxisRange;
    y: AxisRange;
}
