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

type Indexed<T = unknown> = {
    [key in string]: T;
};

export function isPlainObject(value: unknown): value is Indexed {
    return typeof value === "object"; /*&&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === "[object Object]";*/
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (Object.prototype.hasOwnProperty.call(rhs, p)) {
            try {
                if (isPlainObject(rhs[p])) {
                    rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
                } else {
                    lhs[p] = rhs[p];
                }
            } catch (e) {
                lhs[p] = rhs[p];
            }
        }
    }
    console.log(lhs, rhs);
    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    // Код
    if (!isPlainObject(object)) {
        return object;
    }

    const result = path.split(".").reduceRight<Indexed>((accumulator, key) => ({
        [key]: accumulator
    }), value as any);

    return merge(object as Indexed, result);
}

export function isEmpty(value: string | null | undefined) {
    return !value && value === '';
}
