import { SPATIAL_KIT_ERROR_MESSAGES, SpatialKitErrorCode } from "./spatial-kit-error.models";

export class SpatialKitError extends Error {
    constructor(readonly code: SpatialKitErrorCode) {
        super(SPATIAL_KIT_ERROR_MESSAGES[code]);

        this.name = 'SpatialKitError';
    }
}