export function solve1(input: string) {
    const sections = input.trim().split('\r\n\r\n');
    const rules = sections[0].split('\r\n').map(rule => rule.split('|').map(Number));
    const updates = sections[1].split('\r\n').map(update => update.split(',').map(Number));

    const isValid = (update: number[]): boolean => {
        // first we map each update number to its corresponding index
        const indexMap = new Map<number, number>();
        for (let i = 0; i < update.length; i++) {
            indexMap.set(update[i], i);
        }
        
        // then we check if the update is valid
        // lets take example of 75,47,61,53,29
        // and the following rules: 75|53, 47|53
        // then we check if 75 is before 53 and 47 is before 53, ie. fromIndex < toIndex
        for (const [from, to] of rules) {
            const fromIndex = indexMap.get(from);
            const toIndex = indexMap.get(to);
            if (fromIndex === undefined || toIndex === undefined) {
                continue;
            };

            if (fromIndex > toIndex) {
                return false;
            }
        }
        return true;
    }

    const findMiddle = (update: number[]): number => {
        const middleIndex = Math.floor(update.length / 2);
        return update[middleIndex];
    }

    let totalSum = 0;

    for (const update of updates) {
        if (isValid(update)) {
            totalSum += findMiddle(update);
        }
    }

    return totalSum;

}

export function solve2(input: string) {
    const sections = input.trim().split('\r\n\r\n');
    const rules = sections[0].split('\r\n').map(rule => rule.split('|').map(Number));
    const updates = sections[1].split('\r\n').map(update => update.split(',').map(Number));

    const isValid = (update: number[]): boolean => {
        // first we map each update number to its corresponding index
        const indexMap = new Map<number, number>();
        for (let i = 0; i < update.length; i++) {
            indexMap.set(update[i], i);
        }
        
        // then we check if the update is valid
        // lets take example of 75,47,61,53,29
        // and the following rules: 75|53, 47|53
        // then we check if 75 is before 53 and 47 is before 53, ie. fromIndex < toIndex
        for (const [from, to] of rules) {
            const fromIndex = indexMap.get(from);
            const toIndex = indexMap.get(to);
            if (fromIndex === undefined || toIndex === undefined) {
                continue;
            };

            if (fromIndex > toIndex) {
                return false;
            }
        }
        return true;
    }

    const fixUpdate = (update: number[]): number[] => {
        const indexMap = new Map<number, number>();
        for (let i = 0; i < update.length; i++) {
            indexMap.set(update[i], i);
        }
        // lets take example of 21,75,47,61,53,29
        // and the following rules: 75|53, 47|53, 53|21
        // Now here there is a clear violation of the rule 53|21
        // so we need to fix it by moving 21 to the correct position
        // end result should be 75,47,61,53,29,21
        for (const [from, to] of rules) {
            const fromIndex = indexMap.get(from);
            const toIndex = indexMap.get(to);
            if (fromIndex === undefined || toIndex === undefined) {
                continue;
            };

            if (fromIndex > toIndex) {
                update.splice(fromIndex, 1);
                update.splice(toIndex, 0, from);
                return update;
            }
        }
        return update;

    }

    const findMiddle = (update: number[]): number => {
        const middleIndex = Math.floor(update.length / 2);
        return update[middleIndex];
    }

    let totalSum = 0;

    for (const update of updates) {
        if (!isValid(update)) {
            let fixedUpdate = fixUpdate(update);
            // keep fixing the update until it is valid; very dirty but hey it works
            while (!isValid(fixedUpdate)) {
                fixedUpdate = fixUpdate(update);
            }
            totalSum += findMiddle(fixedUpdate);
        }
    }

    return totalSum;

}