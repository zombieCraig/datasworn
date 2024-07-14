"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceInfoKey = exports.IdKey = exports.ReplacesKey = exports.EnhancesKey = exports.ContentsKey = exports.CollectionsKey = exports.GlobstarString = exports.WildcardString = exports.PrefixSep = exports.TypeSep = exports.PathKeySep = exports.MdLinkPrefix = exports.PACKAGE_ID_LENGTH_MIN = exports.COLLECTION_DEPTH_MIN = exports.COLLECTION_DEPTH_MAX = exports.VERSION = void 0;
exports.VERSION = '0.1.0';
/** The maximum depth for nesting collections, relative to the root dictionary for its type */
exports.COLLECTION_DEPTH_MAX = 4;
exports.COLLECTION_DEPTH_MIN = 1;
exports.PACKAGE_ID_LENGTH_MIN = 3;
exports.MdLinkPrefix = 'datasworn';
/** The separator character for Datasworn IDs. */
exports.PathKeySep = '/';
exports.TypeSep = '.';
exports.PrefixSep = ':';
/** The wildcard character for Datasworn IDs that matches any key in a dictionary object. */
exports.WildcardString = '*';
/** A globstar (recursive wildcard) representing any number of levels of in recursive collections. */
exports.GlobstarString = '**';
/** Key in Collection that contains a dictionary object of child collections. */
exports.CollectionsKey = 'collections';
/** Key in Collection that contains a dictionary object of collectable items. */
exports.ContentsKey = 'contents';
/** Key in Collection that specifies other collections that the Collection should be merged in to.  */
exports.EnhancesKey = 'enhances';
/** Key in primary node that specifies other nodes replaced by this object. */
exports.ReplacesKey = 'replaces';
exports.IdKey = '_id';
exports.SourceInfoKey = '_source';
