
const registeredClasses = [];

function Router(path: string, options ?: object) {
    return (constructor: Function) => {
        registeredClasses.push({
            constructor, path, options
        });
    };
}

@Router('/')
class HomePageRouter {
    // routing functions
}

@Router('/blog', {
    rss: '/blog/rss.xml'
})
class BlogRouter {
    // routing functions
}

console.log(registeredClasses);
