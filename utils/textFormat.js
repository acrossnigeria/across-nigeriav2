export const arrangeText = ( str ) => {
    const firstWord = str.slice(0, 1).toUpperCase();
    return `${firstWord}${str.slice(1)}`;
}   


export const shortenText = ( str, maxLength ) => {
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}