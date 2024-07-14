"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const CONST_js_1 = require("../IdElements/CONST.js");
function validate(obj, collectionValidator, collectableValidator) {
    collectionValidator(obj);
    if (CONST_js_1.ContentsKey in obj) {
        const children = obj[CONST_js_1.ContentsKey];
        for (const k in children)
            collectableValidator(children[k]);
    }
    if (CONST_js_1.CollectionsKey in obj) {
        const collectionChildren = obj[CONST_js_1.CollectionsKey];
        for (const k in collectionChildren)
            validate(collectionChildren[k], collectionValidator, collectableValidator);
    }
    return true;
}
