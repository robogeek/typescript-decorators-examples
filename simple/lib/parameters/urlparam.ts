import 'reflect-metadata';
import * as util from 'util';
import * as inspectors from 'decorator-inspectors';

const registered = [];

function URLParam(id: string) {
    return (target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) => {

        const topush = {
            target, propertyKey, parameterIndex, urlparam: id,
            ownKeys: Object.getOwnPropertyNames(target),
            function: target[propertyKey],
            // funcDescriptor: Object.getOwnPropertyDescriptor(target, propertyKey)
        };
        registered.push(topush);
    }
}

class BlogRouter {

    viewPost(req, res, next,
        @URLParam('id') id: string
    ) {
        console.log(`viewPost`);
    }

    viewComments(req, res, next,
        @URLParam('id') id: string,
        @URLParam('commentID') commentID: string
    ) {
        console.log(`viewComments`);
    }
}

console.log(registered);

