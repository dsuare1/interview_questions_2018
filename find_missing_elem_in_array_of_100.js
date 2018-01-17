// Instructions: write a function to find the random missing element from an array of numbers from 1 - 100

const array = []; 
const fixedArray = [];
// generate an array of integers from 1 - 100
for (let i = 1; i <= 100; i += 1) {
	array.push(i);
	fixedArray.push(i);
}

// generate a random index to remove from the array
const randomIndex = Math.floor(Math.random() * 100);
// remove that element using the .splice() method and randomIndex as a starting point, removing 1 element
array.splice(randomIndex, 1);

// approach 1 - loop through the now-truncated array, comparing two values to check if the difference is not 1
// (we can assume this approach since we know the array is sorted from 1 - 100)
function findMissingElement(array) {
	// declare tracking variable 1
	let currentElement;
	// declare tracking variable 2
	let nextElement;
	// loop through the array
	for (let i = 0; i < array.length; i += 1) {
		// set current element
		currentElement = array[i];
		// set next element to the value of the *next index*
		nextElement = array[i + 1];
		// if the difference between the two elements is not 1, we know we've skipped a number, and thus found our missing element
		if (nextElement - currentElement !== 1) {
			// return that element
			return currentElement + 1;
		}
	}
}

console.log(findMissingElement(array));
/*
output:
<random integer>
*/

// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/
// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/

// approach 2 - using Array.prototype.reduce() to add up total of the fixedArray and subtract the total of the spliced array to get the difference; that will be the missing element
function findMissingElementUsingSplice(array) {
	// local function to use to reduce the arrays
	function reduce(arr) {
		return arr.reduce((prev, curr) => {
			return prev + curr;
		});
	}
	// reduce the fixed array down to a single value
	const fixedTotal = reduce(fixedArray);
	// reduce the truncated array down to a single value
	const passedInTotal = reduce(array);
	// return the difference between these two arrays; this will be the missing element
	return fixedTotal - passedInTotal;
}

console.log(JSON.stringify(findMissingElementUsingSplice(array), null, 2));
/*
output:
<random integer>
*/

// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/
// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/

// approach 3 - divide and conquer; potentially splits the time in half
function findMissingElementsUsingSplitArrays(array) {
	// find the mid point of the array
	const midPoint = Math.ceil(array.length / 2);
	// split the array into a first half and second half using the midPoint
	const firstHalf = array.splice(0, midPoint);
	const secondHalf = array.splice(0);
	// declare a variable that will eventually hold the value of the missing element
	let missingElement;
	// loop through the first array (Big O should be reduced by half)
	for (let i = 0; i < firstHalf.length; i += 1) {
		// since we have two arrays, we first have to check if we've reached the end of the first array without finding the missing element
		if (i === firstHalf.length - 1) {
			break;
		}
		// if the next element - the current element is not 1, we've found our missing element
		if (firstHalf[i + 1] - firstHalf[i] !== 1) {
			// return the value of what *would be* after the current element
			return firstHalf[i] + 1;
		}
	}
	// if we haven't returned by now, we have to loop through the second array, doing the same check
	for (let i = 0; i < secondHalf.length; i += 1) {
		if (secondHalf[i + 1] - secondHalf[i] !== 1) {
			return secondHalf[i] + 1;
		}
	}
}

console.log(findMissingElementsUsingSplitArrays(array));
/*
output:
<random integer>
*/
