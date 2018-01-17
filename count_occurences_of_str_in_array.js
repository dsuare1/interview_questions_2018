const arr1 = ['theresa', 'derrick', 'theresa', 'eleanor', 'monica', 'kristi', 'kristi', 'theresa', 'eleanor', 'eleanor', 'eleanor', 'kim', 'mike', 'mike', 'pam', 'derrick', 'eleanor', 'kristi', 'eleanor'];

const arr2 = ['multiple', 'multiple', 'multiple', 'multiple', 'multiple','multiple','multiple', 'mul tiple', 'mu lti ple', 'mu lti ple', 'mul tiple', 'multi ple', 'multi ple'];

// count the number of occurences of a given string in the array and log out to the console the results in the format 'name: count'

// approach 1 - loop through the array and use a hash of 'name: count' key:value pair to keep track
/*
function countStrWithHash(arr) {
	const hash = {};
	
	arr.forEach((str) => {
		if (!hash[str]) {
			hash[str] = 1;
		} else {
			hash[str] = hash[str] + 1;
		}
	});

	return hash;
}

console.log(countStrWithHash(arr1));
console.log(countStrWithHash(arr2));
*/

// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/

// approach 2 - for the second array, remove the whitespace in each array element so they essentially become the same
/*
function countStrWithHashNoWhitespace(arr) {
	const hash = {};

	for (let i = 0; i < arr.length; i += 1) {
		const trimmedStr = arr[i].replace(/ /g, '');

		if (!hash[trimmedStr]) {
			hash[trimmedStr] = 1;
		} else {
			hash[trimmedStr] += 1;
		}
	}

	return hash;
}

console.log(countStrWithHashNoWhitespace(arr2));
*/

// /--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--/

// approach 3 - 
function countStrInSortedArray(arr) {
	const hash = {};
	const sortedArr = arr.sort();

	for (let i = 0; i < arr.length; i += 1) {
		let currentValue = arr[i];
		let count = 0;

		while (currentValue === arr[i]) {
			count += 1;
		}

		hash[currentValue] = count;
	}

	return hash;
}

console.log(countStrInSortedArray(arr1));
