export const isEmptyObject = (object) => {
    return object && !Object.keys(object || {}).length;
}
