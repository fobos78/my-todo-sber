
export const asyncForEach = async (arr: any, callback: any) => {
    for (let i = 0; i < arr.length; i++) {
        await callback(arr[i], i, arr);
    }
};