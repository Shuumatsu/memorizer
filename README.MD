```
npm install --save result-memorizer
```

# memorizer
memoizes the result of a func. If resolver is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function. By default, the first argument provided to the memoized function is used as the map cache key.

## API
```
memorizer(func: Function, resolver: Function, cache?: Map<any, any>, ctx?: any)
```
```
shellMemorizer(fundamental: Function, resolver: Function, cache: Map<any, any>, ctx: any)
```
```
@memorizerDecorator(resolver?: Function)
```

## EXAMPLE
### memorizer
```
import { memorizer } from 'memorizer';
function fibonacci(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
fibonacci = memorizer(fibonacci);
console.log(fibonacci(50));
```

### shellMemorizer
```
import { shellMemorizer } from 'memorizer';
let map = new Map();
map.set(0, 0);
map.set(1, 1);
let fibonacci = shellMemorizer(function (recur, n) {
    return recur(n - 1) + recur(n - 2);
}, null, map);
console.log(fibonacci(50));
```

### memorizerDecorator
```
import { memorizerDecorator } from 'memorizer';
class F {
    @memorizerDecorator()
    fibonacci(n) {
        if (n === 0 || n === 1) {
            return n;
        }
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
}
let f = new F();
console.log(f.fibonacci(5));
```