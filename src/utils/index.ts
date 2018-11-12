export function hashCode(str: string) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 3) - hash);
    }
    return hash;
}

export const getColourFromName = (name: string) => {
    return `hsla(${hashCode(name) * hashCode(name) % 360}, 100%, 50%, 1)`;
};

export function shuffle<T>(arr: T[]): T[]{
    for (let i = arr.length - 1; i >= 0; i--) {

        const randomIndex = Math.floor(Math.random()*(i+1));
        const itemAtIndex = arr[randomIndex];

        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
    }
    return arr;
}