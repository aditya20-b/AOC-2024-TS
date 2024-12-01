import { readFileSync } from "fs";
import path from "path";

export function getInput(day: string): string {
    return readFileSync(
        path.join(__dirname, `../../inputs/day${day.padStart(2, "0")}.txt`),
        "utf-8"
    );
}
