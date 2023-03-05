export function isValid(value: string, regExpPattern: string, isMandatory: boolean) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0 && isMandatory) {
        return false;
    }

    return new RegExp(regExpPattern).test(trimmedValue);
}
