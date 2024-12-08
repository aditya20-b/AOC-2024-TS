export function solve1(input: string) {
    let sum = 0;
    

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    // We do Array.from because matchAll returns an iterator 
    // The iterator is not a real array, so we need to convert it to an array and then we can use forEach
    Array.from(input.matchAll(regex)).forEach((match) => {
        const [_, a, b] = match;
        sum += parseInt(a) * parseInt(b);
    });

    return sum;
}

export function solve2(input: string) {
    let mul_switch = true;
    let sum = 0;
    const regex = /mul\((\d{0,3}),(\d{0,3})\)|do\(\)|don't\(\)/g;

    Array.from(input.matchAll(regex)).forEach((match) => {
        const [doswitch, a, b] = match;
        if (doswitch === "do()") {
            mul_switch = true;
        } else if (doswitch === "don't()") {
            mul_switch = false;
        } else if (mul_switch) {
            sum += parseInt(a) * parseInt(b);
        }
    });
    return sum;
}