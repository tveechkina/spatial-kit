export enum GeometryErrorCode {
    INVALID_RECTANGLE_WIDTH = 'INVALID_RECTANGLE_WIDTH',
    INVALID_RECTANGLE_HEIGHT = 'INVALID_RECTANGLE_HEIGHT',
    INVALID_BOUNDING_EXPAND_PADDING = 'INVALID_BOUNDING_EXPAND_PADDING'
}

const GEOMETRY_ERROR_MESSAGES: Record<GeometryErrorCode, string> = {
    [GeometryErrorCode.INVALID_RECTANGLE_WIDTH]: "Rectangle width must be greater than or equal to 0",
    [GeometryErrorCode.INVALID_RECTANGLE_HEIGHT]: "Rectangle height must be greater than or equal to 0",
    [GeometryErrorCode.INVALID_BOUNDING_EXPAND_PADDING]: "Bounding box padding must be greater than or equal to 0"
}

export type SpatialKitErrorCode = GeometryErrorCode;

export const SPATIAL_KIT_ERROR_MESSAGES: Record<SpatialKitErrorCode, string> = {
    ...GEOMETRY_ERROR_MESSAGES
};