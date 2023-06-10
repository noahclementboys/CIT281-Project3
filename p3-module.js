function valueFromArray(arr) {
    return arr.reduce(
        (acc, val) => 
          Array.isArray(val) ? valueFromArray(val) : acc + valueFromCoinObject(val),
        0  
    );
};


function validDenomination(coin){
    return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
};

function valueFromCoinObject(obj) {
    const { denom = 0, count = 0 } = obj;
    return validDenomination(denom) ? denom * count : 0;
};

function coinCount(...coinage){
    return valueFromArray(coinage);
};

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));

module.exports = {
    coinCount,
    valueFromArray,
    valueFromCoinObject,
    validDenomination
}