export function memorizer(func, resolver, cache, ctx) {
    cache = cache || new Map();
    resolver = resolver || function (args) {
        return args[0];
    };
    let fn = (...args) => {
        const key = resolver(args);
        if (!cache.has(key)) {
            cache.set(key, func.apply(ctx, args));
        }
        return cache.get(key);
    };
    fn.resetCache = () => {
        cache = new Map();
    };
    fn.getCache = () => {
        return cache;
    };
    return fn;
}
export function shellMemorizer(fundamental, resolver, cache, ctx) {
    cache = cache || new Map();
    resolver = resolver || function (args) {
        return args[0];
    };
    let shell = (...args) => {
        const key = resolver(args);
        if (!cache.has(key)) {
            cache.set(key, fundamental.apply(ctx, [shell, ...args]));
        }
        return cache.get(key);
    };
    shell.resetCache = () => {
        cache = new Map();
    };
    shell.getCache = () => {
        return cache;
    };
    return shell;
}
function memorizerDecorator(resolver) {
    let cache = new Map();
    resolver = resolver || function (args) {
        return args[0];
    };
    return (target, propertyKey, descriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            const key = resolver(args);
            if (!cache.has(key)) {
                cache.set(key, method.bind(target)(...args));
            }
            return cache.get(key);
        };
        descriptor.value.resetCache = () => {
            cache = new Map();
        };
        descriptor.value.getCache = () => {
            return cache;
        };
        return descriptor;
    };
}
//# sourceMappingURL=E:/lib/memorizer/index.js.map