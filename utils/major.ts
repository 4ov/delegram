// deno-lint-ignore-file no-explicit-any
/// <reference path="../defs.d.ts" />
/// <reference path="../types.d.ts" />
import { updateTypes, updateSubtypes } from '../runtime-types.ts'

export function createForm(data: FormField[], extra: PostExtra) {
    const form = new FormData()
    const { files, fields } = extra
    data.forEach(field => {
        const [key, value] = field
        if (fields.includes(key)) {
            form.append(key, value, files?.[key])
        } else {
            form.append(key, value)
        }
    })

    return form
}






export const hashCode = function (text: string) {
    var hash = 0, i, chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
        chr = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};





export function extractMeta(update: Update): MetaDataResult {
    const updateKeys = Object.keys(update)
    const updateType = updateKeys.filter(key => updateTypes.includes(key as UpdateType))[0] as UpdateType
    const message = update[updateType] as Message
    console.log(message);
    
    const updateSubtype = Object.keys(message).filter(key => updateSubtypes.includes(key as UpdateSubtype))[0]
    const chatType = message?.chat?.type ?? null
    const text = message?.text ?? null

    return ({
        updateType,
        updateSubtype: updateSubtype as UpdateSubtype,
        chatType,
        text
    });


}