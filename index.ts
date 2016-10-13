export function memorizer(func: Function, resolver: Function, cache?: Map<any, any>, ctx?: any) {
    cache = cache || new Map<any, any>();
    resolver = resolver || function (args: Array<any>) {
        return args[0];
    };

    let fn: any = (...args) => {
        const key = resolver(args);
        if (!cache.has(key)) {
            cache.set(key, func.apply(ctx, args));
        }

        return cache.get(key);
    };
    fn.resetCache = () => {
        cache = new Map<any, any>();
    };
    fn.getCache = () => {
        return cache;
    };

    return fn;
}

export function shellMemorizer(fundamental: Function, resolver: Function, cache: Map<any, any>, ctx: any) {
    cache = cache || new Map<any, any>();
    resolver = resolver || function (args: Array<any>) {
        return args[0];
    };

    let shell: any = (...args) => {
        const key = resolver(args);
        if (!cache.has(key)) {
            cache.set(key, fundamental.apply(ctx, [shell, ...args]));
        }

        return cache.get(key);
    };
    shell.resetCache = () => {
        cache = new Map<any, any>();
    };
    shell.getCache = () => {
        return cache;
    };

    return shell;
}

function memorizerDecorator(resolver?: Function) {
    let cache = new Map<any, any>();
    resolver = resolver || function (args: Array<any>) {
        return args[0];
    };

    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const method: Function = descriptor.value;

        descriptor.value = function (...args) {
            const key = resolver(args);
            if (!cache.has(key)) {
                cache.set(key, method.bind(target)(...args));
            }

            return cache.get(key);
        };
        descriptor.value.resetCache = () => {
            cache = new Map<any, any>();
        };
        descriptor.value.getCache = () => {
            return cache;
        };

        return descriptor;
    };
}