
export function functionData(f: Function) {
    return {
        name: f.name,
        // displayName: f.displayName,
        // arguments: f.arguments,
        code: f.toLocaleString()
    }
}