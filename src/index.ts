import { getInput } from "./utils/input";

const day = process.argv[2] || "01";

async function run() {
    try {
        const modulePath = `./days/day${day.padStart(2, "0")}`;
        const { solve1, solve2 } = await import(modulePath);
        const input = getInput(day);
        const output1 = solve1(input);
        const output2 = solve2(input);
        console.log(`Day ${day} result 1:`, output1);
        console.log(`Day ${day} result 2:`, output2);
    } catch (err) {
        console.error(`Error running day ${day}:`, err);
    }
}

run();