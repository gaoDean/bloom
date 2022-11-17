export const map = f => functor => functor.map(f);
export const filter = f => functor => functor.filter(f);
export const pipe = (x0, ...funcs) => funcs.reduce((x, f) => f(x), x0);
