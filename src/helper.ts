export function checkIfStringIsInStringArray(
    array: string[],
    value: string,
): boolean {
    return array.some((entry) => entry === value);
}
