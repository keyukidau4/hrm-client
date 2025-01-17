
//check is integer
export const isInteger = (str: string ) => {
    return /^\d+$/.test(str);
}

//check is number
export const isNumberic = ( str: string) => {
    return /^[+-]?\d+(\.\d+)?$/.test(str);
}