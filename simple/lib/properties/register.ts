
const registered = [];

function IntegerRange(min: number, max: number) {
    return (target: Object, member: string) => {
        registered.push({
            target, member,
            operation: {
                op: 'intrange',
                min, max
            }
        });
    }
}

function Matches(matcher: RegExp) {
    return (target: Object, member: string) => {
        registered.push({
            target, member,
            operation: {
                op: 'match',
                matcher
            }
        });
    }
}

class StudentRecord {

    @IntegerRange(1900, 2050)
    year: number;

    @Matches(/^[a-zA-Z ]+$/)
    name: string;
}

// const sr1 = new StudentRecord();

console.log(registered);
