/**  Just the one from Baeldung: 

Recuressive solution 1:
 Partitioning by Elements in the Entire Set
*/


function helper(combinations: number[][], comb: number[], start: number, end: number, index: number){
    if(comb.length == index){
        let newComb = JSON.parse(JSON.stringify(comb));
        combinations.push(newComb);
    }
    else if(start <= end){
        comb[index] = start;
        helper(combinations, comb, start+1, end, index+1);
        helper(combinations, comb, start+1, end, index);
    } 

}

let combinations: number[][] = [];
let total : number = 5;
let combination: number[] = Array(2);

helper(combinations, combination, 0, total, 0);

for(let comb of combinations){
    console.log(comb);
}

console.log('--------------------------------');


/* Recursive Solution 2 - Partitioning by Elements in the Combination 
*/

function helper2(combinations: number[][], comb: number[], start: number, end: number, index: number){
    if(index === comb.length){
        let newComb: number[] = JSON.parse(JSON.stringify(comb));
        combinations.push(newComb);
    } else {
        let max: number = Math.min(end, end - comb.length + index + 1)
        for(let i: number = start; i <= max; i++){
            comb[index] = start;
            helper2(combinations, comb, start+1, end, index+1);
        }
    }
}

let combinations2: number[][] = [];
helper(combinations2, combination, 0, total, 0);

for(let comb of combinations2){
    console.log(comb);
}

/**
 * Iterative solution
 * 
 * We start with an initial combination
 */


