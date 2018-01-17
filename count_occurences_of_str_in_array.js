const arr1 = ['elaine', 'jerry', 'elaine', 'timmy', 'estelle', 'carol', 'carol', 'elaine', 'timmy', 'timmy', 'timmy', 'frank', 'morty', 'morty', 'newman', 'jerry', 'timmy', 'carol', 'timmy'];

const arr2 = ['multiple', 'multiple', 'multiple', 'multiple', 'multiple','multiple','multiple', 'mul tiple', 'mu lti ple', 'mu lti ple', 'mul tiple', 'multi ple', 'multi ple'];

// count the number of occurences of a given string in the array and log out to the console the results in the format 'name: count'

// approach 1 - loop through the array and use a hash of 'name: count' key:value pair to keep track
function countStrWithHash(arr) {
	// create a hash to track strings
	const hash = {};
	// loop through the passed-in array using a forEach loop
	arr.forEach((str) => {
		// if the string is NOT present in the hash
		if (!hash[str]) {
			// set its occurence count to 1
			hash[str] = 1;
		// if the string IS present in the hash
		} else {
			// increment its occurence count by 1
			hash[str] = hash[str] + 1;
		}
	});

	return hash;
}

console.log(JSON.stringify(countStrWithHash(arr1), null, 2));
/*
output:
{
  "elaine": 3,
  "jerry": 2,
  "timmy": 6,
  "estelle": 1,
  "carol": 3,
  "frank": 1,
  "morty": 2,
  "newman": 1
}
*/

console.log(JSON.stringify(countStrWithHash(arr2), null, 2));
/*
output:
{
  "multiple": 7,
  "mul tiple": 2,
  "mu lti ple": 2,
  "multi ple": 2
}
*/

// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/
// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/

// approach 2 - for the second array, remove the whitespace in each array element so they essentially become the same
function countStrWithHashNoWhitespace(arr) {
	// create a hash to track strings
	const hash = {};

	// loop through the passed-in array using a for loop
	for (let i = 0; i < arr.length; i += 1) {
		// save a copy of the (immutable) original string with the all (via the 'g' flag) of the white space removed
		const trimmedStr = arr[i].replace(/ /g, '');

		// if the trimmed string value is NOT present in the hash
		if (!hash[trimmedStr]) {
			// set its occurence count to 1
			hash[trimmedStr] = 1;
		// if the trimmed string IS present in the hash
		} else {
			// increment its occurence count by 1
			hash[trimmedStr] += 1;
		}
	}

	return hash;
}

console.log(JSON.stringify(countStrWithHashNoWhitespace(arr2), null, 2));
/*
output:
{
  "multiple": 13
}
*/

// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/
// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/

// approach 3 - sort the array first, then use a tracking value to compare, resetting it and the count each time a new string is encountered
function countStrInSortedArray(arr) {
	// create a hash to track strings
	const hash = {};
	// sort the array
	const sortedArr = arr.sort();
	// initialize a value to be tracked; since the array is sorted at this point, we'll just initialize this as the first element
	let trackedValue = sortedArr[0];
	// initialize a count to 0
	let count = 0;
	// loop through the array with a for loop
	for (let i = 0; i < arr.length; i += 1) {
		// need to check if we've reached the end of the array; if we have,
		if (i === sortedArr.length - 1) {
			// incrment the count for the final element
			count += 1;
			// set the last occuring string equal to its count
			hash[trackedValue] = count;
			// we know we're at the final element, so we can return the hash
			return hash;
		}
		// if the current value in the sorted array is equal to the tracked value (the first element on the first pass)
		if (sortedArr[i] === trackedValue) {
			// increment the count by 1 (to 1 on the first pass)
			count += 1;
			// continue in the for loop to the next iteration
			continue;
		} else {
			// here, we've encountered a new string, so we set the previously tracked string as a key in the hash with the value of its count
			hash[trackedValue] = count;
			// we reset the tracked value to be the current element in the sorted array, which will be the 1st occurence of a new string
			trackedValue = sortedArr[i];
			// since we're at the first occurence of the new string, we set the count to 1, and increment from there
			count = 1;
		}
	}

	return hash;
}

console.log(JSON.stringify(countStrInSortedArray(arr1), null, 2));
/*
output:
{
  "carol": 3,
  "elaine": 3,
  "estelle": 1,
  "frank": 1,
  "jerry": 2,
  "morty": 2,
  "newman": 1,
  "timmy": 6
}
*/

console.log(JSON.stringify(countStrInSortedArray(arr2), null, 2));
/*
output:
{
  "mu lti ple": 2,
  "mul tiple": 2,
  "multi ple": 2,
  "multiple": 7
}
*/
