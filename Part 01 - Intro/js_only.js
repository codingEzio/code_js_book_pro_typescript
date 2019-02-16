let globalScope = 1; {
    let blockScope = 2;
    globalScope = 100;
    nestedBlockScope = 300;

    {
        let nestedBlockScope = 3;
        globalScope = 1000;
        blockScope = 2000;
    }
}

console.log(nestedBlockScope)
console.log(globalScope)
console.log(blockScope)