export interface IMatch {
    santa: ISanta;
    matchedWith: ISanta[];
}

export interface ISanta {
    name: string;
    email: string;
}

export type CancellableEvent = { preventDefault: () => void }

