import {expect} from "chai";
import {
    avg,
    max,
    maxValueIndex,
    min,
    minValueIndex,
    pairing,
    pickRandom,
    randBoolean,
    randDouble,
    randInt,
    removeFromArray,
    shuffle,
    sum
} from "../../../src/utils/Utils";

describe("Utils", () => {
    it("pick random", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        const elem: number = pickRandom(arr);
        expect(arr.includes(elem)).to.be.true;
    });

    it("randInt", () => {
        for (let i: number = 0; i < 100; i++) {
            const int: number = randInt(-50, 50);

            expect(int).to.be.below(50);
            expect(int).to.be.above(-51);
        }
    });

    it("randDouble", () => {
        for (let i: number = 0; i < 100; i++) {
            const double: number = randDouble(-50, 50);

            expect(double).to.be.below(50);
            expect(double).to.be.above(-51);
        }
    });

    it("randBoolean", () => {
        let trues: number = 0;
        let falses: number = 0;
        for (let i: number = 0; i < 1000; i++) {
            const bool: boolean = randBoolean();
            if (bool) {
                trues++;
            } else {
                falses++;
            }
        }
        expect(trues).to.be.closeTo(falses, 100);
    });

    it("remove from array", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        expect(removeFromArray(arr, 200)).to.be.false;
        expect(removeFromArray(arr, arr[0])).to.be.true;

        const len: number = arr.length;
        expect(removeFromArray(arr, arr[2])).to.be.true;
        expect(arr.length).equals(len - 1);
    });

    it("shuffle", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        const copy: number[] = arr.slice();
        shuffle(copy);

        expect(copy.length).to.be.equals(arr.length);
        copy.forEach(element => expect(arr).includes(element));
    });

    it("max", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        const maxValue: number = max(arr);

        arr.forEach(elem => expect(elem).to.be.at.most(maxValue));
    });

    it("max index", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        const maxValue: number = max(arr);

        expect(maxValueIndex(arr)).to.be.equals(arr.indexOf(maxValue));
    });

    it("min", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        const minValue: number = min(arr);

        arr.forEach(elem => expect(elem).to.be.at.least(minValue));
    });

    it("min index", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        const minValue: number = min(arr);

        expect(minValueIndex(arr)).to.be.equals(arr.indexOf(minValue));
    });

    it("avg", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        let sum: number = 0;
        arr.forEach(elem => sum += elem);
        expect(avg(arr)).to.be.equals(sum / arr.length);
    });

    it("sum", () => {
        const arr: number[] = [
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50),
            randDouble(-50, 50)
        ];

        let sumValue: number = 0;
        arr.forEach(elem => sumValue += elem);
        expect(sum(arr)).to.be.equals(sumValue);
    });


    describe("Utils pairing", () => {
        const a: number = randInt(0, 100);
        const b: number = randInt(0, 100);

        it(`pairing(a=${a}, b=${b}) => {number}`, () => {
            const pair: number = pairing(a, b);
            expect(pair).to.be.a("number");

            const w: number = Math.floor((Math.sqrt(8 * pair + 1) - 1) / 2);
            const t: number = (w * w + w) / 2;
            const y: number = pair - t;
            const x: number = w - y;

            expect(a).to.be.equal(x);
            expect(b).to.be.equal(y);
        });
    });
});