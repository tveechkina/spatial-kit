import { BoundingBox, Point } from "../../geometry";

export type SpatialId = string | number;
export type SpatialLayer = string | number;

export interface SpatialObject<Data = unknown> {
    id: SpatialId;
    bbox: BoundingBox;
    data?: Data;
    layer?: SpatialLayer;
    priority?: number;
}

export type SpatialObjectUpdate<Data = unknown> =
    Partial<Omit<SpatialObject<Data>, "id">>;

export interface SpatialIndexLike<Data = unknown> {
    /**
     * The number of objects currently stored in the index.
     */
    readonly size: number;

    /**
     * Adds a spatial object to the index.
     *
     * @throws If an object with the same ID already exists.
     */
    add(object: SpatialObject<Data>): void;

    /**
     * Removes an object from the index.
     *
     * @returns `true` if the object was removed, or `false` if it was not found.
     */
    remove(id: SpatialId): boolean;

    /**
     * Updates the provided properties of an existing object.
     *
     * @throws If an object with the given ID does not exist.
     */
    update(
        id: SpatialId,
        changes: SpatialObjectUpdate<Data>,
    ): void;

    /**
     * Returns an object by its ID.
     *
     * @returns The object, or `undefined` if it does not exist.
     */
    get(id: SpatialId): SpatialObject<Data> | undefined;

    /**
     * Checks whether an object with the given ID exists in the index.
     */
    has(id: SpatialId): boolean;

    /**
     * Removes all objects from the index.
     */
    clear(): void;

    /**
     * Returns all objects whose bounding boxes intersect the given bounding box.
     *
     * Touching boundaries are considered an intersection.
     */
    search(bbox: BoundingBox): SpatialObject<Data>[];

    /**
     * Returns all objects within the given radius of a point.
     *
     * The distance is measured from the point to the nearest position
     * on each object's bounding box.
     */
    findInRadius(
        point: Point,
        radius: number,
    ): SpatialObject<Data>[];

    /**
     * Returns all objects whose bounding boxes contain the given point.
     *
     * Bounding-box boundaries are included.
     */
    findAtPoint(point: Point): SpatialObject<Data>[];

    /**
     * Returns the highest-priority object whose bounding box contains
     * the given point.
     *
     * Objects without an explicit priority are treated as having priority `0`.
     *
     * @returns The matching object, or `undefined` if no object was found.
     */
    hitTest(point: Point): SpatialObject<Data> | undefined;
}