export enum GeometryErrorCode {
  INVALID_RECTANGLE_WIDTH = 'INVALID_RECTANGLE_WIDTH',
  INVALID_RECTANGLE_HEIGHT = 'INVALID_RECTANGLE_HEIGHT',
  INVALID_BOUNDING_EXPAND_PADDING = 'INVALID_BOUNDING_EXPAND_PADDING',
}

export enum SpatialIndexErrorCode {
  OBJECT_ALREADY_EXISTS = 'OBJECT_ALREADY_EXISTS',
  OBJECT_NOT_FOUND = 'OBJECT_NOT_FOUND',
  NEGATIVE_RADIUS = 'NEGATIVE_RADIUS',
  NEGATIVE_LIMIT = 'NEGATIVE_LIMIT',
}

const GEOMETRY_ERROR_MESSAGES: Record<GeometryErrorCode, string> = {
  [GeometryErrorCode.INVALID_RECTANGLE_WIDTH]:
    'Rectangle width must be greater than or equal to 0',
  [GeometryErrorCode.INVALID_RECTANGLE_HEIGHT]:
    'Rectangle height must be greater than or equal to 0',
  [GeometryErrorCode.INVALID_BOUNDING_EXPAND_PADDING]:
    'Bounding box padding must be greater than or equal to 0',
};

const SPATIAL_INDEX_ERROR_MESSAGES: Record<SpatialIndexErrorCode, string> = {
  [SpatialIndexErrorCode.OBJECT_ALREADY_EXISTS]:
    'An object with the given ID already exists.',
  [SpatialIndexErrorCode.OBJECT_NOT_FOUND]:
    'No object with the given ID was found.',
  [SpatialIndexErrorCode.NEGATIVE_RADIUS]:
    'Radius must be greater than or equal to 0.',
  [SpatialIndexErrorCode.NEGATIVE_LIMIT]:
    'Limit must be greater than or equal to 0.',
};
export type SpatialKitErrorCode = GeometryErrorCode | SpatialIndexErrorCode;

export const SPATIAL_KIT_ERROR_MESSAGES: Record<SpatialKitErrorCode, string> = {
  ...GEOMETRY_ERROR_MESSAGES,
  ...SPATIAL_INDEX_ERROR_MESSAGES,
};
