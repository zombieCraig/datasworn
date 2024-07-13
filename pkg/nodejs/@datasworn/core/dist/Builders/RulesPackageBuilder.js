"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _RulesPackageBuilder_instances, _a, _RulesPackageBuilder_schemaValidator, _RulesPackageBuilder_sourceSchemaValidator, _RulesPackageBuilder_result, _RulesPackageBuilder_isSorted, _RulesPackageBuilder_isMergeComplete, _RulesPackageBuilder_isValidated, _RulesPackageBuilder_countTypes, _RulesPackageBuilder_build, _RulesPackageBuilder_sortKeys, _RulesPackageBuilder_addFile, _RulesPackageBuilder_isObject, _RulesPackageBuilder_merge, _RulesPackagePart_data, _RulesPackagePart_isValidated;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesPackageBuilder = void 0;
const CONST_js_1 = __importDefault(require("../IdElements/CONST.js"));
const Sort_js_1 = require("../Utils/Sort.js");
const Text_js_1 = require("../Validators/Text.js");
const index_js_1 = __importDefault(require("../Validators/index.js"));
const index_js_2 = require("../index.js");
/**
 * Merges, assigns IDs to, and validates multiple {@link DataswornSource.RulesPackage}s to create a complete {@link Datasworn.RulesPackage} object.
 *
 * Before creating an instance use {@link RulesPackageBuilder.init} to provide validation functions.
 * */
class RulesPackageBuilder {
    static get schemaValidator() {
        return __classPrivateFieldGet(this, _a, "f", _RulesPackageBuilder_schemaValidator);
    }
    static get sourceSchemaValidator() {
        return __classPrivateFieldGet(this, _a, "f", _RulesPackageBuilder_sourceSchemaValidator);
    }
    get packageType() {
        if (this.files.size)
            for (const [_filePath, file] of this.files)
                return file.packageType;
        return undefined;
    }
    static init({ validator, sourceValidator }) {
        __classPrivateFieldSet(this, _a, validator, "f", _RulesPackageBuilder_schemaValidator);
        __classPrivateFieldSet(this, _a, sourceValidator, "f", _RulesPackageBuilder_sourceSchemaValidator);
        return this;
    }
    static get isInitialized() {
        return (typeof this.schemaValidator === 'function' &&
            typeof this.sourceSchemaValidator === 'function');
    }
    countType(typeId) {
        let ct = 0;
        for (const [k] of this.index)
            if (k.includes(typeId + CONST_js_1.default.PrefixSep))
                ct++;
        return ct;
    }
    mergeFiles(force = false) {
        if (!force && __classPrivateFieldGet(this, _RulesPackageBuilder_isMergeComplete, "f"))
            return this;
        const sortedEntries = Array.from(this.files)
            // sort by file name so that they merge in the same order every time (prevents JSON diff noise). the order itself is arbitrary, but must be the same no matter who runs it -- this is why localeCompare specifies a static locale
            .sort(([a], [b]) => a.localeCompare(b, 'en-US'));
        for (const [_, part] of sortedEntries)
            __classPrivateFieldGet(this, _RulesPackageBuilder_instances, "m", _RulesPackageBuilder_merge).call(this, __classPrivateFieldGet(this, _RulesPackageBuilder_result, "f"), part.data);
        __classPrivateFieldSet(this, _RulesPackageBuilder_isMergeComplete, true, "f");
        __classPrivateFieldSet(this, _RulesPackageBuilder_isValidated, false, "f");
        __classPrivateFieldSet(this, _RulesPackageBuilder_isSorted, false, "f");
        return this;
    }
    toJSON() {
        return __classPrivateFieldGet(this, _RulesPackageBuilder_result, "f");
    }
    static validateIdRef(id, idTracker, tree = index_js_2.IdParser.tree) {
        if (idTracker.valid.has(id))
            return true;
        if (idTracker.unreachable.has(id) || idTracker.invalid.has(id))
            return false;
        let parsedId;
        try {
            parsedId = index_js_2.IdParser.parse(id);
        }
        catch (e) {
            idTracker.invalid.add(id);
            return false;
        }
        const idHasMatches = parsedId.getMatches(tree, () => true).size > 0;
        if (idHasMatches) {
            idTracker.valid.add(id);
            return true;
        }
        idTracker.unreachable.add(id);
        return false;
    }
    validateIdRefs(idTracker, tree = index_js_2.IdParser.tree) {
        (0, Text_js_1.forEachIdRef)(this.toJSON(), (id) => {
            _a.validateIdRef(id, idTracker, tree);
        });
        return idTracker;
    }
    /** Performs JSON schema validation on the built data. */
    validate(force = false) {
        if (!force && __classPrivateFieldGet(this, _RulesPackageBuilder_isValidated, "f"))
            return this;
        _a.schemaValidator(__classPrivateFieldGet(this, _RulesPackageBuilder_result, "f"));
        for (const [id, typeNode] of this.index) {
            if (typeNode == null)
                continue;
            if (!__classPrivateFieldGet(_a, _a, "m", _RulesPackageBuilder_isObject).call(_a, typeNode))
                continue;
            if (!('type' in typeNode))
                continue;
            if (typeNode.type == null || typeof typeNode.type !== 'string')
                continue;
            const typeValidation = _a.postSchemaValidators[typeNode.type];
            if (typeof typeValidation !== 'function')
                continue;
            try {
                typeValidation(typeNode);
            }
            catch (e) {
                throw new Error(`<${id}> ${String(e)}\n\n${JSON.stringify(typeNode, undefined, '\t')}`);
            }
        }
        __classPrivateFieldSet(this, _RulesPackageBuilder_isValidated, true, "f");
        return this;
    }
    build(force = false) {
        try {
            // refuse to build if one of the files isn't valid
            if (this.errors.size > 0) {
                const msg = Array.from(this.errors)
                    .map(([file, error]) => `"${file}" failed DataswornSource schema validation: ${error}`)
                    .join('\n');
                throw new Error(msg);
            }
            __classPrivateFieldGet(this, _RulesPackageBuilder_instances, "m", _RulesPackageBuilder_build).call(this, force);
            this.validate(force);
            // console.table(this.#countTypes())
            return this;
        }
        catch (e) {
            throw new Error(`Couldn't build "${this.id}". ${String(e)}`);
        }
    }
    /**
     *
     * @param id The `_id` of the RulesPackage to be constructed.
     * @param validator A function that validates the completed RulesPackage against the Datasworn JSON schema.
     * @param sourceValidator A function that validates the individual package file contents against the DataswornSource JSON schema.
     * @param logger The destination for logging build messages.
     */
    constructor(id, logger) {
        _RulesPackageBuilder_instances.add(this);
        this.files = new Map();
        this.index = new Map();
        _RulesPackageBuilder_result.set(this, {});
        _RulesPackageBuilder_isSorted.set(this, false);
        _RulesPackageBuilder_isMergeComplete.set(this, false);
        _RulesPackageBuilder_isValidated.set(this, false);
        this.counter = {};
        this.idRefs = new Set();
        this.errors = new Map();
        if (!_a.isInitialized)
            throw new Error(`RulesPackageBuilder constructor is missing validator functions. Set them with the RulesPackageBuilder.init static method before creating an instance.`);
        this.id = id;
        this.logger = logger;
    }
    addFiles(...files) {
        for (const file of files)
            try {
                void __classPrivateFieldGet(this, _RulesPackageBuilder_instances, "m", _RulesPackageBuilder_addFile).call(this, file);
            }
            catch (e) {
                throw new Error(`Failed to add "${file.name}" to ${this.packageType} "${this.id}"! ${String(e)}`);
            }
        return this;
    }
}
exports.RulesPackageBuilder = RulesPackageBuilder;
_a = RulesPackageBuilder, _RulesPackageBuilder_result = new WeakMap(), _RulesPackageBuilder_isSorted = new WeakMap(), _RulesPackageBuilder_isMergeComplete = new WeakMap(), _RulesPackageBuilder_isValidated = new WeakMap(), _RulesPackageBuilder_instances = new WeakSet(), _RulesPackageBuilder_countTypes = function _RulesPackageBuilder_countTypes() {
    const ct = {};
    for (const [k, _] of this.index) {
        const [prefix] = k.split(':');
        ct[prefix] || (ct[prefix] = 0);
        ct[prefix]++;
    }
    return ct;
}, _RulesPackageBuilder_build = function _RulesPackageBuilder_build(force = false) {
    this.mergeFiles(force);
    __classPrivateFieldSet(this, _RulesPackageBuilder_isValidated, false, "f");
    __classPrivateFieldGet(this, _RulesPackageBuilder_instances, "m", _RulesPackageBuilder_sortKeys).call(this, force);
    return __classPrivateFieldGet(this, _RulesPackageBuilder_result, "f");
}, _RulesPackageBuilder_sortKeys = function _RulesPackageBuilder_sortKeys(force = false) {
    if (__classPrivateFieldGet(this, _RulesPackageBuilder_isSorted, "f") && !force)
        return this;
    __classPrivateFieldSet(this, _RulesPackageBuilder_result, (0, Sort_js_1.sortObjectKeys)(__classPrivateFieldGet(this, _RulesPackageBuilder_result, "f"), Sort_js_1.dataswornKeyOrder), "f");
    __classPrivateFieldSet(this, _RulesPackageBuilder_isSorted, true, "f");
    return this;
}, _RulesPackageBuilder_addFile = function _RulesPackageBuilder_addFile(file) {
    const fileToAdd = file instanceof RulesPackagePart
        ? file
        : new RulesPackagePart(file, this.logger);
    if (this.packageType != null && this.packageType !== fileToAdd.packageType)
        throw new Error(`Expected a source file with the type "${this.packageType}", but got "${fileToAdd.packageType}"`);
    if (!fileToAdd.isValidated)
        try {
            fileToAdd.init();
        }
        catch (e) {
            this.errors.set(fileToAdd.name, e);
        }
    this.files.set(fileToAdd.name, fileToAdd);
    return this;
}, _RulesPackageBuilder_isObject = function _RulesPackageBuilder_isObject(value) {
    return value != null && typeof value === 'object' && !Array.isArray(value);
}, _RulesPackageBuilder_merge = function _RulesPackageBuilder_merge(target, ...sources) {
    if (!sources.length) {
        // nothing left to add, so index it
        if (__classPrivateFieldGet(_a, _a, "m", _RulesPackageBuilder_isObject).call(_a, target) && '_id' in target) {
            const isRulesPackage = ['ruleset', 'expansion'].includes(target.type);
            // if ((target._id as string).startsWith('asset.ability'))
            // 	console.log(target._id)
            if (!isRulesPackage)
                this.index.set(target._id, target);
        }
        return target;
    }
    const source = sources.shift();
    if (__classPrivateFieldGet(_a, _a, "m", _RulesPackageBuilder_isObject).call(_a, target) &&
        __classPrivateFieldGet(_a, _a, "m", _RulesPackageBuilder_isObject).call(_a, source)) {
        for (const k in source) {
            const key = k;
            if (__classPrivateFieldGet(_a, _a, "m", _RulesPackageBuilder_isObject).call(_a, source[key])) {
                if (typeof target[key] === 'undefined')
                    Object.assign(target, { [key]: {} });
                __classPrivateFieldGet(this, _RulesPackageBuilder_instances, "m", _RulesPackageBuilder_merge).call(this, target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return __classPrivateFieldGet(this, _RulesPackageBuilder_instances, "m", _RulesPackageBuilder_merge).call(this, target, ...sources);
};
RulesPackageBuilder.postSchemaValidators = index_js_1.default;
_RulesPackageBuilder_schemaValidator = { value: void 0 };
_RulesPackageBuilder_sourceSchemaValidator = { value: void 0 };
/** Top-level RulesPackage properties to omit from key sorting. */
RulesPackageBuilder.topLevelKeysBlackList = [
    'rules'
];
/** Separator character used for JSON pointers. */
RulesPackageBuilder.pointerSep = '/';
/** Hash character that prepends generated JSON pointers. */
RulesPackageBuilder.hashChar = '#';
class RulesPackagePart {
    static get sourceValidator() {
        return RulesPackageBuilder.sourceSchemaValidator;
    }
    get packageType() {
        return this.data.type;
    }
    get data() {
        return __classPrivateFieldGet(this, _RulesPackagePart_data, "f");
    }
    set data(value) {
        __classPrivateFieldSet(this, _RulesPackagePart_data, value, "f");
        __classPrivateFieldSet(this, _RulesPackagePart_isValidated, false, "f");
    }
    get isValidated() {
        return __classPrivateFieldGet(this, _RulesPackagePart_isValidated, "f");
    }
    validateSource() {
        const result = RulesPackagePart.sourceValidator(this.data);
        __classPrivateFieldSet(this, _RulesPackagePart_isValidated, true, "f");
        return result;
    }
    constructor({ data, name }, logger) {
        this.index = new Map();
        _RulesPackagePart_data.set(this, void 0);
        _RulesPackagePart_isValidated.set(this, false);
        this.name = name;
        this.logger = logger;
        __classPrivateFieldSet(this, _RulesPackagePart_data, data, "f");
    }
    init() {
        const isValid = this.validateSource();
        if (!isValid)
            throw new Error(`File "${this.name}" doesn't match DataswornSource schema`);
        void index_js_2.IdParser.assignIdsInRulesPackage(this.data, this.index);
        return isValid;
    }
}
_RulesPackagePart_data = new WeakMap(), _RulesPackagePart_isValidated = new WeakMap();
