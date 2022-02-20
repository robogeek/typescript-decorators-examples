
import * as inspectors from 'decorator-inspectors';
import {
    accessors, params, ValidateParams
} from 'runtime-data-validation';

class ToValidate {

    #ratio: number;
    #year: number;

    @accessors.AccessorValidation<number>()
    @accessors.IsIntRange(1990, 2050)
    @accessors.IsInt()
    set year(ny: number) { 
        console.log(`validate.ts set year ${ny}`);
        this.#year = ny; }
    get year() {
        console.log(`validate.ts get year ${this.#year}`);
        return this.#year; }
    
    @accessors.AccessorValidation<number>()
    @accessors.IsFloatRange(0.2, 0.8)
    @accessors.IsFloat()
    set ratio(nr: number) {
        console.log(`validate.ts set ratio ${nr}`);
        this.#ratio = nr; }
    get ratio() {
        console.log(`validate.ts get ratio ${this.#ratio}`);
        return this.#ratio; }
    

    @inspectors.LogMethodInspector
    @ValidateParams
    isGoodSpeed(
        @inspectors.LogParameterInspector
        @params.IsIntRange(10, 100)
        @params.IsInt()
        speed: number) {

        console.log(`IsGoodSpeed ${speed}`);
    }
}

const tv = new ToValidate();

tv.isGoodSpeed(15);
tv.isGoodSpeed(20);
// tv.isGoodSpeed(20.555);
// tv.isGoodSpeed(5);

tv.year = 1990;
tv.year = 2000;
tv.year = 2020;
// tv.year = 2060;
// tv.year = 1980;

tv.ratio = 0.25;
tv.ratio = 0.55;
// tv.ratio = 0.05;
// tv.ratio = 0.95;
