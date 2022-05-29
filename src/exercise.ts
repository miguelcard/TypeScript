
/** fcn should PRINT all combinations of values in list that added return the value given it 'total'
 *
 * hints:
 * use exacty the 'numToUse' cuantity
 * there should be No Duplicate set reported!!, BUT IF AME NUMBERS ARE IN DIFF positions then is OK
*/

/**
 * Approach:
 * 1. get all combinations of (n) numbers in list without repetition
 * 2. add checking the sum
 * 3. add printing indexes
 */

// do first without knowing then indx and then figure out the index thing
// arrays are objects! but how to access index values?? -> return array with indexes!


// Iterative approach:

async function findMatch6(list: number[], total: number, numToUse: number) {
    // initial combination of indexes:
    let indexes: number[] = fillFirstIndexes(numToUse);

    let i: number = numToUse-1;
    while(indexes[0] <= list.length - numToUse){

        if(i < numToUse-1){
            i++;
            indexes[i] = indexes[i-1] +1;
        } else if(i === numToUse-1){
            checkSum(list, indexes, total);

            while(indexes[i] + 1 < list.length){
                indexes[i]++;
                checkSum(list, indexes, total);
            }

            do {
                i--;
                indexes[i]++;
            } while(indexes[i] > list.length - numToUse + i && i > 0)
        }
    }
}

function fillFirstIndexes(numbersToUse:number): number[] {
    let toReturn: number[] = [];
    for(let i = 0; i < numbersToUse; i++){
        toReturn.push(i);
    }
    return toReturn;
}

function checkSum(numbersList : number[], indexes: number[], total: number){
    let sum : number = 0;
    for(let index of indexes){
        sum += numbersList[index];
    }
    
    if(sum === total){
        let message : string = "";
        for(let k: number = 0; k < indexes.length; k++){
            message += (k === 0)? "" : " + ";
            message += `Element ${indexes[k]+1}`;
        }
        message += ` = ${sum}`;
        console.log(message);
    }
}

// findMatch6([3,4,6,7,10,3,9,15,17,17,-5,10,7,-1,21], 20, 2);



// Baedlung solution:

function getCombinations(numsToUse:number, listLength: number) {
    // initial combination of indexes:
    let indexes: number[] = fillFirstIndexes(numsToUse);

    while(indexes[numsToUse - 1] < listLength){
        console.log(indexes);

        let t: number = numsToUse -1;
        
        while(indexes[numsToUse-1] != 0 && indexes[t] == listLength - numsToUse + t){
            t--;
        }

        indexes[t]++;
        for(let i: number = t+1; i < indexes.length; i++){
            indexes[i] = indexes[i-1] + 1;
        }
    }
}

getCombinations(3, 5);

