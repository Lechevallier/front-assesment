
import { HasValuePipe, FormatPipe } from './shared.pipe';

const answertotheUltimateQuestionofLifetheUniverseandEverything: number = 42;
const pi: number =  3.14159;

describe('HasValuePipe', () => {
    const pipe = new HasValuePipe();

    it('should return false if undefined is passed', () => {
        expect(pipe.transform(undefined)).toBeFalsy();
    });

    it('should return false if null is passed', () => {
        expect(pipe.transform(null)).toBeFalsy();
    });

    it('should return false if an empty array is passed', () => {
        expect(pipe.transform([])).toBeFalsy();
    });

    it('should return true if an array with data is passed', () => {
        expect(pipe.transform(['foo', 'bar'])).toBeTruthy();
    });

    it('should return true if a string is passed', () => {
        expect(pipe.transform('foobar')).toBeTruthy();
    });

    it('should return true if a number is passed', () => {
        expect(pipe.transform(answertotheUltimateQuestionofLifetheUniverseandEverything)).toBeTruthy();
    });
});

describe('FormatPipe', () => {
    const pipe = new FormatPipe();

    it('should transform an array of string into a concatenated string with \',\'', () => {
        const result = pipe.transform(['foo', 'bar']);
        expect(typeof result).toBe('string');
        expect(result).toContain(', ');
    });

    it('should keep only the decimal of a float', () => {
        const result = pipe.transform(pi);
        expect(typeof result).toBe('number');
        expect(result).toBe(3.1);
    });

});
