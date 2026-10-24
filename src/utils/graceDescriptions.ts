export interface GraceDescription {
    star: string;
    descriptionKey: string;
    time: number;
}

const graceDescriptions = new Map<string, GraceDescription[]>();

/**
 * Stores the per-star Laser grace descriptions generated from
 * LaserGraceTimesPerST, so the source fields can be removed from module data.
 * @param {string} moduleName module name
 * @param {GraceDescription[]} entries generated descriptions
 */
export function setGraceDescriptions(moduleName: string, entries: GraceDescription[]): void {
    graceDescriptions.set(moduleName, entries);
}

/**
 * @param {string} moduleName module name
 * @return {GraceDescription[]} previously generated descriptions
 */
export function getGraceDescriptions(moduleName: string): GraceDescription[] {
    return graceDescriptions.get(moduleName) ?? [];
}
