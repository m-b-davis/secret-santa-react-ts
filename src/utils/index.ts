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

function getUrl(match: IMatch) {
    const payload = `${match.santa.name}|${match.matchedWith.map(m => m.name).join(',')}`;
    console.log(payload);
 
    const encoded = window.btoa(payload);

    return `https://${window.location.hostname}/show-match/${encoded}`;
}

export function decodePayload(payload: string): IMatch {
    const decoded = window.atob(payload);
    const [ santaName, recipientString ] = decoded.split('|');

    const recipients: ISanta[] = recipientString.split(',').map(recipientName => ({
        name: recipientName,
        email: ''
    }));

    return {
        santa: { name: santaName, email: '' },
        matchedWith: recipients
    };
}

export function generateMatches(santas: ISanta[], matchesPerSanta: number) {
    type reducerState = { 
        remainingSantaLists: ISanta[][],
        matches: IMatch[]
    };
  
    const initialReducerValue: reducerState = { 
        remainingSantaLists: Array(matchesPerSanta).fill(santas),
        matches: []
    };
    
    return santas.reduce((accumulator, currentSanta) => {
        const { remainingSantaLists, matches } = accumulator;

        // santaSelection will be an array of n santas for this name to be matched to, where n is the number of gifts each santa purchases
        const santaSelection = remainingSantaLists
        // Remove the current name from the list of candidate recipients
            .map(santaList => santaList.filter(santa => santa.name !== currentSanta.name))
            // Shuffle each list
            .map(shuffle)
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
            matches: [ ...matches, { 
                ...newMatch,
                url: getUrl(newMatch) 
            }]
        }
    }, initialReducerValue).matches;
}