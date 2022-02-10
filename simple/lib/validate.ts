
import * as inspectors from 'decorator-inspectors';
import * as validators from 'runtime-validators';

class ToValidate {

    @inspectors.LogMethodInspector
    @validators.ValidateParams
    isGoodSpeed(
        @inspectors.LogParameterInspector
        @validators.NumberRange(10, 100)
        @validators.IsInteger()
        speed: number) {

        console.log(`IsGoodSpeed ${speed}`);
    }
}

const tv = new ToValidate();

tv.isGoodSpeed(15);
tv.isGoodSpeed(20);
tv.isGoodSpeed(20.555);
tv.isGoodSpeed(5);
