export declare const idLike: RegExp;
export declare function needsIdValidation(k: unknown, v: unknown): v is string;
export declare function extractIdRefs(data: unknown): Set<string>;
export declare function forEachIdRef(data: unknown, forEach: (id: string) => void): void;
export declare function validateIdsInStrings(data: unknown, index: Map<string, unknown>): boolean;
export declare function validateMacroIdPointers(text: string, validIds: Map<string, unknown>): boolean;
export declare function validateMarkdownIdPointers(text: string, validIds: Map<string, unknown>): boolean;
export declare function validateIdPointer(id: string, index: Map<string, unknown>): boolean;
/** Recursively iterates over JSON values, applying a function to every primitive boolean, number, string, and null value. */
export declare function forEachPrimitiveValue<T = unknown>(value: T, key: string | number | undefined, fn: (v: boolean | number | string | null, k: unknown) => void): void;
