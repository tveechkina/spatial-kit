import { SpatialKitError } from '../../errors/spatial-kit-error';
import { SpatialIndexErrorCode } from '../../errors/spatial-kit-error.models';
import {
  BoundingBox,
  containsPoint,
  getPointToBoundingBoxDistance,
  hasIntersection,
  Point,
} from '../../geometry';
import {
  QueryOptions,
  SpatialId,
  SpatialIndexLike,
  SpatialLayer,
  SpatialObject,
} from '../types';

export class NaiveSpatialIndex<Data> implements SpatialIndexLike<Data> {
  private readonly index = new Map<SpatialId, SpatialObject<Data>>();

  get size(): number {
    return this.index.size;
  }

  private get array(): SpatialObject<Data>[] {
    return [...this.index.values()];
  }

  add(object: SpatialObject<Data>): void {
    if (this.index.has(object.id)) {
      throw new SpatialKitError(SpatialIndexErrorCode.OBJECT_ALREADY_EXISTS);
    }

    this.index.set(object.id, this.cloneObject(object));
  }

  remove(id: SpatialId): boolean {
    return this.index.delete(id);
  }

  update(
    id: SpatialId,
    changes: Partial<Omit<SpatialObject<Data>, 'id'>>
  ): void {
    const existed = this.index.get(id);

    if (!existed) {
      throw new SpatialKitError(SpatialIndexErrorCode.OBJECT_NOT_FOUND);
    }

    const updated = {
      ...existed,
      ...changes,
    };

    this.index.set(id, this.cloneObject(updated));
  }

  get(id: SpatialId): SpatialObject<Data> | undefined {
    const object = this.index.get(id);

    return object ? this.cloneObject(object) : undefined;
  }

  has(id: SpatialId): boolean {
    return this.index.has(id);
  }

  clear(): void {
    this.index.clear();
  }

  search(bbox: BoundingBox, query?: QueryOptions): SpatialObject<Data>[] {
    const intersections = this.array.filter((object) =>
      hasIntersection(bbox, object.bbox)
    );

    return this.applyQuery(intersections, query).map((object) =>
      this.cloneObject(object)
    );
  }

  findInRadius(
    point: Point,
    radius: number,
    query?: QueryOptions
  ): SpatialObject<Data>[] {
    if (radius < 0) {
      throw new SpatialKitError(SpatialIndexErrorCode.NEGATIVE_RADIUS);
    }

    const inRadiusObjects = this.array.filter(
      (object) => getPointToBoundingBoxDistance(point, object.bbox) <= radius
    );

    return this.applyQuery(inRadiusObjects, query).map((object) =>
      this.cloneObject(object)
    );
  }

  findAtPoint(point: Point, query?: QueryOptions): SpatialObject<Data>[] {
    const atPointObjects = this.array.filter((object) =>
      containsPoint(object.bbox, point)
    );

    return this.applyQuery(atPointObjects, query).map((object) =>
      this.cloneObject(object)
    );
  }

  hitTest(
    point: Point,
    radius?: number,
    query?: QueryOptions
  ): SpatialObject<Data> | undefined {
    if (radius !== undefined && radius < 0) {
      throw new SpatialKitError(SpatialIndexErrorCode.NEGATIVE_RADIUS);
    }

    const hitCandidates = this.array.filter((object) =>
      radius !== undefined
        ? getPointToBoundingBoxDistance(point, object.bbox) <= radius
        : containsPoint(object.bbox, point)
    );

    const result = this.applyQuery(hitCandidates, {
      ...query,
      sortByPriority: true,
    })[0];

    return result ? this.cloneObject(result) : undefined;
  }

  private cloneObject(object: SpatialObject<Data>): SpatialObject<Data> {
    return {
      ...object,
      bbox: { ...object.bbox },
    };
  }

  private applyQuery(
    objects: SpatialObject<Data>[],
    query?: QueryOptions
  ): SpatialObject<Data>[] {
    if (!query) {
      return objects;
    }

    const filteredObjects = query.layers
      ? this.filterByLayers(objects, query.layers)
      : [...objects];

    if (query.sortByPriority) {
      this.sortByPriority(filteredObjects);
    }

    if (query.limit !== undefined && query.limit < 0) {
      throw new SpatialKitError(SpatialIndexErrorCode.NEGATIVE_LIMIT);
    }

    return query.limit !== undefined
      ? filteredObjects.slice(0, query.limit)
      : filteredObjects;
  }

  private filterByLayers(
    objects: SpatialObject<Data>[],
    layers: SpatialLayer[]
  ): SpatialObject<Data>[] {
    return objects.filter(
      (object) => object.layer !== undefined && layers.includes(object.layer)
    );
  }

  private sortByPriority(objects: SpatialObject<Data>[]): void {
    objects.sort((objectA, objectB) => {
      const objectAPriority = objectA.priority ?? 0;
      const objectBPriority = objectB.priority ?? 0;

      return objectBPriority - objectAPriority;
    });
  }
}
