export function deepEqual(firstObject: object, secondObject: object) {
    if (firstObject === secondObject) {
        return true;
    } else {
        if (Object.keys(firstObject).length != Object.keys(secondObject).length)
            return false;

        for (let prop in firstObject) {
            if (secondObject.hasOwnProperty(prop)) {
                // @ts-ignore prop уже item из firstObject
                if (!deepEqual(firstObject[prop], secondObject[prop]))
                    return false;
            } else
                return false;
        }

        return true;
    }
}
