import {IMatch, ISanta} from "../types";

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

export function generateMatches(santas: ISanta[], initialReducerValue: { remainingSantaLists: ISanta[][], matches: IMatch[]}): IMatch[] {
    return santas.reduce((accumulator, currentSanta) => {
        const { remainingSantaLists, matches } = accumulator;

        // santaSelection will be an array of n santas for this name to be matched to, where n is the number of gifts each santa purchases
        const santaSelection = remainingSantaLists
        // Remove the current name from the list of candidate recipients
            .map(santaList => santaList.filter(santa => santa.name !== currentSanta.name))
            // Shuffle each list
            .map(list => shuffle(list))
            // Find a candidate recipient from each list and add into selection
            .reduce((selection, santaList) => {
                const selectedRecipient = santaList.find(candidateSanta =>
                    // Where santa doesn't exist in selection
                    !selection.map(santa => santa.name).includes(candidateSanta.name)
                );

                if (selectedRecipient === undefined) {
                    throw new Error("Matching failed");
                }

                return [...selection, selectedRecipient];
            }, []);

        const newMatch: IMatch = {
            santa: currentSanta,
            matchedWith: santaSelection
        };

        return {
            // Remove each selected santa from their respective remainingSantaList
            remainingSantaLists: remainingSantaLists.map((santaList, index) =>
                santaList.filter(santa => {
                    return santa.name !== santaSelection[index]!.name
                })),
            matches: [ ...matches, newMatch ]
        }
    }, initialReducerValue).matches;
}