# JavaScript Problem Solving Questions and Answers

This document contains commonly asked JavaScript problem-solving interview questions.

It focuses on:

- array-based questions
- string-based questions
- mathematical and logic puzzles
- object and data transformation questions
- advanced functions and closures
- asynchronous JavaScript and Promise questions
- native polyfills and basic data structures
- Vanilla JavaScript only
- simple logic that is easy to explain in interviews

You can run these examples in:

- browser console
- Node.js
- any online JavaScript editor

---

## Array Problem Solving Questions

## 0. Find Missing Numbers Without Using Built-In Method

### Question

Find missing numbers from `1` to the maximum number in the given array.

Example:

```js
[1, 2, 3, 4, 6, 8, 10]
```

Missing numbers:

```js
[5, 7, 9]
```

### Code

```js
function missingNumber(arr) {
  const newArr = [...arr].sort((a, b) => a - b);
  const numSet = new Set(newArr);
  console.log(numSet)
  const foundValue = [];
  const missValue = [];
  const end = newArr[newArr.length - 1] || 0;
  for(var i=1; i<=end; i++) {
    if(numSet.has(i)) {
      foundValue.push(i);
    } else {
      missValue.push(i)
    }
  }
  return {foundValue, missValue}
}

const result = missingNumber([22, 2, 3, 4, 6, 8, 10]);
console.log(result);

```

### Output

```js
{
  foundValue: [1, 2, 3, 4, 6, 8, 10],
  missedValue: [5, 7, 9]
}
```

### Explanation

Here we assume the array is sorted and starts from `1`.

First, take the last value of the array as the ending number.

Then loop from `1` to that ending number.

For every number, check whether it exists in the original array using another simple loop.

If it exists, add it to `foundValue`. Otherwise, add it to `missedValue`.

## 1. Reverse An Array Without Using reverse()

### Question

Reverse an array without using the built-in `reverse()` method.

### Code

```js
function reverseArray(arr) {
  var result = [];

  for (var i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;
}

console.log(reverseArray([1, 2, 3, 4, 5]));
```

### Output

```js
[5, 4, 3, 2, 1]
```

### Explanation

Start from the last index and push each item into a new array.

---

## 2. Find Largest And Smallest Number In An Array

### Question

Find the largest and smallest number from an array.

### Code

```js
function findLargestAndSmallest(arr) {
  var largest = arr[0];
  var smallest = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }

    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return {
    largest: largest,
    smallest: smallest
  };
}

console.log(findLargestAndSmallest([10, 4, 25, 7, 1]));
```

### Output

```js
{ largest: 25, smallest: 1 }
```

### Explanation

Assume the first element is both largest and smallest.

Then compare each element one by one.

---

## 3. Find the closest sub array of the given target from the array.

```js
function subArray(arr, target) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                result.push(arr[i], arr[j]);
                return result; 
            }
        }
    }
    return result;
}

const arr = [1, 3, 2, 4, 6, 5, 8];
const target = 8;
console.log(subArray(arr, target)); // [3, 5] or [2, 6] depending on order found

## 3. Remove Duplicate Values From An Array

### Question

Remove duplicate values from an array.

### Code

```js
function findDuplicate(arr){
    const newArr = arr;
    var duplicateVal = [];
    var cleanValue = [];
    for(var i=0; i<newArr.length; i++){
        if(!cleanValue.includes(newArr[i])){
           cleanValue.push(newArr[i]);
        } else {
            duplicateVal.push(newArr[i]);
        }
    }
    return {arr, duplicateVal, cleanValue}
}

const result = findDuplicate([1,2,3,2,4,5,6,4,1,1]);
console.log("___original_array", result.arr);
console.log("___duplicate_value", result.duplicateVal);
console.log("___clean_value", result.cleanValue);
```

### Output

```js
[1, 2, 3, 4, 5]
```

### Explanation

Before adding an item into `result`, check whether it already exists.

### Shorter Version

```js
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
```

---

## 4. Find Second Largest Number In An Array

### Question

Find the second largest number in an array.

### Code

```js
function secondLargest(arr){
    var largest = 0;
    var second = 0;
    for(var i=0; i<arr.length; i++){
        if(arr[i] > largest) {
            largest=arr[i];
        } 
    }
    for (var i=0; i<arr.length; i++){
        if(arr[i] > second && arr[i] < largest) {
            second=arr[i];
        }
    }
    return {
        largest,
        second
    }
}
const result = secondLargest([30,25,2,5,20, 29]);
console.log("___largest result: ", result.largest);
console.log("___second largest result: ", result.second);
```

### Output

```js
10
```

### Explanation

Keep two variables:

- `largest`
- `second`

When a new largest value is found, the old largest becomes second largest.

---

## 5. Count Frequency Of Array Elements

### Question

Count how many times each value appears in an array.

### Code

```js
function countFrequency(arr) {
  var frequency = {};

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];

    if (frequency[item]) {
      frequency[item] = frequency[item] + 1;
    } else {
      frequency[item] = 1;
    }
  }

  return frequency;
}

console.log(countFrequency(['apple', 'banana', 'apple', 'orange', 'banana']));
console.log(countFrequency([2, 2, 1, 3, 3, 5]));
```

### Output

```js
{ apple: 2, banana: 2, orange: 1 }
{ a: 1, p: 2, l: 1, e: 3, s: 1 }
```

### Explanation

Use an object where:

- key is the array item
- value is the count

---

## 6. Flatten A Nested Array

### Question

Convert a nested array into a single-level array.

### Code

```js
function flattenArray(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(flattenArray([1, [2, 3], [4, [5, 6]]]));
```

### Output

```js
[1, 2, 3, 4, 5, 6]
```

### Explanation

If the current item is an array, call the same function again.

This is called recursion.

### Shorter Version

```js
var arr = [1, [2, 3], [4, [5, 6]]];

console.log(arr.flat(Infinity));
```

---

## 7. Find Missing Number From 1 To N

### Question

Find the missing number from an array containing numbers from `1` to `n`.

### Code

```js
function findMissingNumber(arr, n) {
  var expectedSum = (n * (n + 1)) / 2;
  var actualSum = 0;

  for (var i = 0; i < arr.length; i++) {
    actualSum = actualSum + arr[i];
  }

  return expectedSum - actualSum;
}

console.log(findMissingNumber([1, 2, 4, 5], 5));
```

### Output

```js
3
```

### Explanation

Sum of numbers from `1` to `n` is:

```js
n * (n + 1) / 2
```

Missing number is:

```js
expectedSum - actualSum
```

---

## 8. Move All Zeros To End

### Question

Move all zeros to the end of an array without changing the order of non-zero elements.

### Code

```js
function moveZerosToEnd(arr) {
  var result = [];
  var zeroCount = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      zeroCount++;
    } else {
      result.push(arr[i]);
    }
  }

  for (var j = 0; j < zeroCount; j++) {
    result.push(0);
  }

  return result;
}

console.log(moveZerosToEnd([0, 1, 0, 3, 12]));
```

### Output

```js
[1, 3, 12, 0, 0]
```

### Explanation

First add all non-zero values.

Then add zeros at the end.

---

## 9. Two Sum Problem

### Question

Find two numbers from an array whose sum is equal to the target.

### Code

```js
function twoSum(arr, target) {
  var seen = {};

  for (var i = 0; i < arr.length; i++) {
    var current = arr[i];
    var needed = target - current;

    if (seen[needed] !== undefined) {
      return [seen[needed], i];
    }

    seen[current] = i;
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
```

### Output

```js
[0, 1]
```

### Explanation

For each number, calculate what number is needed to reach the target.

Example:

```js
target = 9
current = 2
needed = 7
```

If `needed` already exists, return both indexes.

---

## 10. Merge Two Sorted Arrays

### Question

Merge two sorted arrays into one sorted array.

### Code

```js
function mergeSortedArrays(arr1, arr2) {
  var result = [];
  var i = 0;
  var j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
```

### Output

```js
[1, 2, 3, 4, 5, 6]
```

### Explanation

Use two pointers:

- one pointer for first array
- one pointer for second array

Compare both values and add the smaller value into result.

---

## 11. Find Duplicate Values In An Array

### Question

Find all values that appear more than once in an array.

### Code

```js
function findDuplicates(arr) {
  var seen = {};
  var duplicates = [];

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];

    if (seen[item]) {
      if (!duplicates.includes(item)) {
        duplicates.push(item);
      }
    } else {
      seen[item] = true;
    }
  }

  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1, 3]));
```

### Output

```js
[2, 1, 3]
```

### Explanation

Use one object to remember which values are already seen.

If the value comes again, add it to the duplicate array.

---

## 12. Find Intersection Of Two Arrays

### Question

Find common values between two arrays.

### Code

```js
function findIntersection(arr1, arr2) {
  var result = [];

  for (var i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])){
      result.push(arr1[i]);
    }
  }
  return result;
}

console.log(findIntersection([1, 2, 3, 4], [3, 4, 5, 6, 3]));
```

### Output

```js
[3, 4]
```

### Explanation

Loop through the first array and check whether the same value exists in the second array.

Also check `result` so duplicate common values are not added again.

## 13. Please remove leading and trailing 0 from the given String.

```js
function removeZeros(strValue) {
    var newStr = strValue.split("");
    var startIndex = 0;
    var endIndex = newStr.length - 1;
    var endValueIndex = 0;
    // Find the first non-zero index
    for (var i = 0; i < newStr.length; i++) {
        if (newStr[i] > 0) {
            startIndex = i;
            break;
        }
    }
    // CORRECTED: Fixed the condition (i >= 0) and the loop step
    for (var i = endIndex; i >= 0; i--) {
        if (newStr[i] > 0) {
            endValueIndex = i; // Save the exact last non-zero index
            break;
        }
    }
    // CORRECTED: Use slice() with a join() instead of mutating with splice()
    return newStr.slice(startIndex, endValueIndex + 1).join("");
}

console.log(removeZeros("003030405000")); // "3030405"
```

---

## 13. Find Union Of Two Arrays

### Question

Merge two arrays and keep only unique values.

### Code

```js
function findUnion(arr1, arr2) {
  var combined = arr1.concat(arr2);
  var result = [];

  for (var i = 0; i < combined.length; i++) {
    if (!result.includes(combined[i])) {
      result.push(combined[i]);
    }
  }

  return result;
}

console.log(findUnion([1, 2, 3], [3, 4, 5]));
```

### Output

```js
[1, 2, 3, 4, 5]
```

### Explanation

First combine both arrays.

Then push only those values which are not already present in the result.

---

## 14. Rotate Array By K Positions

### Question

Rotate an array to the right by `k` positions.

### Code

```js
function rotateArray(arr, k) {
  var result = [];
  var n = arr.length;

  k = k % n;

  for (var i = n - k; i < n; i++) {
    result.push(arr[i]);
  }

  for (var j = 0; j < n - k; j++) {
    result.push(arr[j]);
  }

  return result;
}

console.log(rotateArray([1, 2, 3, 4, 5], 2));
```

### Output

```js
[4, 5, 1, 2, 3]
```

### Explanation

For right rotation by `2`, the last two values come to the front.

Then the remaining values are added after them.

---

## 15. Find Pair With Given Sum

### Question

Find two values from an array whose sum is equal to the target.

### Code

```js
function findPairWithSum(arr, target) {
  var seen = {};

  for (var i = 0; i < arr.length; i++) {
    var current = arr[i];
    var needed = target - current;

    if (seen[needed]) {
      return [needed, current];
    }

    seen[current] = true;
  }

  return [];
}

console.log(findPairWithSum([2, 4, 7, 11, 15], 9));
```

### Output

```js
[2, 7]
```

### Explanation

For every number, calculate the number needed to make the target.

If that needed number is already seen, return the pair.

---

## 16. Remove Falsy Values From An Array

### Question

Remove falsy values like `false`, `0`, `''`, `null`, `undefined`, and `NaN` from an array.

### Code

```js
function removeFalsyValues(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(removeFalsyValues([0, 1, false, 2, '', 3, null, 'hello']));
```

### Output

```js
[1, 2, 3, 'hello']
```

### Explanation

In JavaScript, values like `0`, `false`, empty string, `null`, and `undefined` behave as false in conditions.

So only truthy values are pushed into the result.

---

## 17. Chunk An Array

### Question

Split an array into smaller arrays of a given size.

### Code

```js
function chunkArray(arr, size) {
  var result = [];

  for (var i = 0; i < arr.length; i = i + size) {
    var chunk = [];

    for (var j = i; j < i + size && j < arr.length; j++) {
      chunk.push(arr[j]);
    }

    result.push(chunk);
  }

  return result;
}

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3));
```

### Output

```js
[[1, 2, 3], [4, 5, 6], [7]]
```

### Explanation

Outer loop jumps by the given size.

Inner loop collects values for one chunk.

---

## 18. Find Maximum Sum Subarray

### Question

Find the maximum sum of a continuous subarray.

### Code

```js
function maxSubarraySum(arr) {
  var currentSum = arr[0];
  var maxSum = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (currentSum + arr[i] < arr[i]) {
      currentSum = arr[i];
    } else {
      currentSum = currentSum + arr[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
```

### Output

```js
6
```

### Explanation

The maximum sum subarray is:

```js
[4, -1, 2, 1]
```

Its sum is `6`.

At each step, decide whether to continue the previous sum or start fresh from the current number.

---

## 19. Sort Array Without Using sort()

### Question

Sort an array in ascending order without using the built-in `sort()` method.

### Code

```js
function sorting(arr) {
  for(var i=0; i<arr.length; i++){
    for(var j=0;j<arr.length; j++) {
      if(arr[j] > arr[j+1]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}
const result = sorting([22, 2, 3, 4, 6, 8, 10]);
console.log(result);
```

### Output

```js
[2, 3, 4, 6, 8, 10, 22]
```

### Ascending Order Sorting
```js
function sorting(arr) {
  const newArr = [...arr].sort((a, b) => a - b);
  return newArr;
}

const result = sorting([22, 2, 3, 4, 6, 8, 10]);
console.log(result); // 2, 3, 4, 6, 8, 10, 22
```

### Descending Order Sorting
```js
function sorting(arr) {
  const newArr = [...arr].sort((a, b) => b - a);
  return newArr;
}

const result = sorting([22, 2, 3, 4, 6, 8, 10]);
console.log(result); // 22, 10, 8, 6, 4, 3, 2
```

### Explanation

This uses bubble sort.

Compare two nearby values and swap them if they are in the wrong order.

---

## 20. Group Array Of Objects By Property

### Question

Group users by their role.

### Code

```js
function groupUsersByRole(users) {
  var result = {};

  for (var i = 0; i < users.length; i++) {
    var role = users[i].role;

    if (!result[role]) {
      result[role] = [];
    }

    result[role].push(users[i].name);
  }

  return result;
}

var users = [
  { name: 'Amit', role: 'admin' },
  { name: 'Priya', role: 'user' },
  { name: 'Rahul', role: 'admin' },
  { name: 'Neha', role: 'user' }
];

console.log(groupUsersByRole(users));
```

### Output

```js
{
  admin: ['Amit', 'Rahul'],
  user: ['Priya', 'Neha']
}
```

### Explanation

Use the role as a key in the result object.

For every user, push the name into the matching role array.

---

## 21. In a page, there is a single div only
1. click on div - don't alert
2. click on body - alert("Hello");
```js
import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const handleClick = () => {
      alert("Hello");
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []); 

  const handleOnClick = (event) => {
    event.stopPropagation();
    console.log("Hello");
  };

  return (
    <button onClick={handleOnClick}>Button</button>
  );
};

export default App;
```

## 21. flatten an array - const nestedArray = [[1, 2], [3, 4], [5, 6], [7,8]];
Output - [1,2,3,4,5,6,7,8];

```js
const nestedArray = [[1, 2], [3, 4], [5, 6]];
const res = nestedArray.reduce((acc, cur) => {
    return acc.concat(cur);
}, []);
console.log(res) //[1,2,3,4,5,6,7,8];   Accumulator always check the what type its defined based on this array, object, or string function gets decided
```

## 22. flatten an array - const nestedArray = [[1, 2], [3, 4], [5, 6], [7,8],];
Output - 1,23,45,67,8

```js
const nestedArray = [[1, 2], [3, 4], [5, 6], [7,8]];

const res = nestedArray.reduce((acc, cur) => {
    return acc.concat(cur);
}, "");
console.log(res); // 1,23,45,67,8
```

## 21. how to make short url link with code?
The easiest way to generate a short link programmatically is by calling a free API like TinyURL or Bitly.

```js
async function shortenUrl(longUrl) {
    const response = await fetch(`https://tinyurl.com{encodeURIComponent(longUrl)}`);
    const shortUrl = await response.text();
    return shortUrl;
}

// Example usage:
shortenUrl("https://google.com").then(url => console.log(url));
```

## 22. How can we pass multiple arguments in currying function?

```js
function add(...a){
    let addedValue = 0;
    for(let i=0;i<a.length; i++){
     addedValue = Number(addedValue + a[i]);
    }
    return function(b) {
        return function(c) {
            return addedValue * b * c;
        }
    }
}
```

console.log(add(5,5,5)(5)(5));

# String Problem Solving Questions

## 1. Reverse A String

### Question

Reverse a string without using built-in `reverse()` directly on the string.

### Code

```js
function reverseString(str) {
  var result = '';

  for (var i = str.length - 1; i >= 0; i--) {
    result = result + str[i];
  }

  return result;
}

console.log(reverseString('hello'));
```

### Output

```js
'olleh'
```

### Explanation

Start from the last character and build a new string.

---

## 2. Check If String Is Palindrome

### Question

Check whether a string reads the same forward and backward.

### Code

```js
function isPalindrome(str) {
  var cleanStr = str.toLowerCase();
  var reversed = '';

  for (var i = cleanStr.length - 1; i >= 0; i--) {
    reversed = reversed + cleanStr[i];
  }

  return cleanStr === reversed;
}

console.log(isPalindrome('madam'));
console.log(isPalindrome('hello'));
```

### Output

```js
true
false
```

### Explanation

Reverse the string and compare it with the original string.

---

## 3. Count Vowels In A String

### Question

Count how many vowels are present in a string.

### Code

```js
function countVowels(str) {
  var vowels = 'aeiou';
  var count = 0;

  for (var i = 0; i < str.length; i++) {
    var char = str[i].toLowerCase();

    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

console.log(countVowels('JavaScript'));
```

### Output

```js
3
```

### Explanation

Convert each character to lowercase and check if it exists in `aeiou`.

---

## 4. Remove Duplicate Characters From String

### Question

Remove duplicate characters from a string.

### Code

```js
function removeDuplicateCharacters(str) {
  var result = '';

  for (var i = 0; i < str.length; i++) {
    if (!result.includes(str[i])) {
      result = result + str[i];
    }
  }

  return result;
}

console.log(removeDuplicateCharacters('programming'));
```

### Output

```js
'progamin'
```

### Explanation

Before adding a character, check whether it already exists in `result`.

---

## 5. Find First Non-Repeating Character

### Question

Find the first character that appears only once in a string.

### Code

```js
function firstNonRepeatingChar(str) {
  var frequency = {};

  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    frequency[char] = (frequency[char] || 0) + 1;
  }

  for (var j = 0; j < str.length; j++) {
    if (frequency[str[j]] === 1) {
      return str[j];
    }
  }

  return null;
}

console.log(firstNonRepeatingChar('aabbcdd'));
```

### Output

```js
'c'
```

### Explanation

First count each character.

Then loop again and return the first character whose count is `1`.

---

## 6. Check If Two Strings Are Anagrams

### Question

Check whether two strings are anagrams.

Anagrams contain the same characters with the same frequency.

Example:

```text
listen -> silent
```

### Code

```js
function areAnagrams(str1, str2) {
  var first = str1.toLowerCase().split('').sort().join('');
  var second = str2.toLowerCase().split('').sort().join('');

  return first === second;
}

console.log(areAnagrams('listen', 'silent'));
console.log(areAnagrams('hello', 'world'));
```

### Output

```js
true
false
```

### Explanation

Sort both strings.

If both sorted strings are equal, they are anagrams.

---

## 7. Find Longest Word In A Sentence

### Question

Find the longest word in a sentence.

### Code

```js
function findLongestWord(sentence) {
  var words = sentence.split(' ');
  var longest = words[0];

  for (var i = 1; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }

  return longest;
}

console.log(findLongestWord('I am learning JavaScript problem solving'));
```

### Output

```js
'JavaScript'
```

### Explanation

Split the sentence into words.

Compare each word length with the current longest word.

---

## 8. Count Frequency Of Characters In A String

### Question

Count how many times each character appears in a string.

### Code

```js
function countFrequency(arr) {
  var frequency = {};
  for(var i=0; i<arr.length; i++) {
    var item = arr[i];
    if(frequency[item]) {
      frequency[item] = frequency[item] + 1;
    } else {
      frequency[item] = 1
    }
  }
  return frequency;
}

console.log(countFrequency("appleees"));
```

### Output

```js
{ a: 1, p: 2, l: 1, e: 3, s: 1 }
```

### Explanation

Use an object to store each character count.

Spaces are skipped in this example.

---

## 9. Capitalize First Letter Of Each Word

### Question

Capitalize the first letter of each word in a sentence.

### Code

```js
function capitalizeWords(sentence) {
  var words = sentence.split(' ');
  var result = [];

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var capitalized = word[0].toUpperCase() + word.slice(1);

    result.push(capitalized);
  }

  return result.join(' ');
}

console.log(capitalizeWords('javascript is easy'));
```

### Output

```js
'JavaScript Is Easy'
```

### Explanation

Split sentence into words.

For each word:

- uppercase first character
- join it with remaining characters

---

## 10. Reverse Words In A Sentence

### Question

Reverse the order of words in a sentence.

### Code

```js
function reverseWords(sentence) {
  var words = sentence.split(' ');
  var result = [];

  for (var i = words.length - 1; i >= 0; i--) {
    result.push(words[i]);
  }

  return result.join(' ');
}

console.log(reverseWords('I love JavaScript'));
```

### Output

```js
'JavaScript love I'
```

### Explanation

Split the sentence into words.

Loop from the last word to the first word.

Push each word into a new array and join them again.

---

## 11. Check If String Has All Unique Characters

### Question

Check whether every character in a string appears only once.

### Code

```js
function hasUniqueCharacters(str) {
  var seen = {};

  for (var i = 0; i < str.length; i++) {
    var char = str[i];

    if (seen[char]) {
      return false;
    }

    seen[char] = true;
  }

  return true;
}

console.log(hasUniqueCharacters('abcde'));
console.log(hasUniqueCharacters('hello'));
```

### Output

```js
true
false
```

### Explanation

Use an object to remember characters.

If a character is already present in the object, it means the string does not have all unique characters.

---

## 12. Find Longest Substring Without Repeating Characters

### Question

Find the longest part of a string where no character is repeated.

### Code

```js
function longestUniqueSubstring(str) {
  var seen = {};
  var start = 0;
  var maxLength = 0;
  var longest = '';

  for (var end = 0; end < str.length; end++) {
    var char = str[end];

    if (seen[char] !== undefined && seen[char] >= start) {
      start = seen[char] + 1;
    }

    seen[char] = end;

    var currentLength = end - start + 1;

    if (currentLength > maxLength) {
      maxLength = currentLength;
      longest = str.slice(start, end + 1);
    }
  }

  return longest;
}

console.log(longestUniqueSubstring('abcabcbb'));
```

### Output

```js
'abc'
```

### Explanation

Use two positions:

- `start` marks where the current substring starts
- `end` moves character by character

If a repeated character is found, move `start` after the previous same character.

---

## 13. Compress A String

### Question

Compress a string by counting repeated continuous characters.

### Code

```js
function compressString(str) {
  var result = '';
  var count = 1;

  for (var i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      result = result + str[i - 1] + count;
      count = 1;
    }
  }

  return result;
}

console.log(compressString('aaabbc'));
```

### Output

```js
'a3b2c1'
```

### Explanation

Count continuous same characters.

When the character changes, add the previous character and its count to the result.

---

## 14. Count Words In A Sentence

### Question

Count how many words are present in a sentence.

### Code

```js
function countWords(sentence) {
  var words = sentence.trim().split(' ');
  var count = 0;

  for (var i = 0; i < words.length; i++) {
    if (words[i] !== '') {
      count++;
    }
  }

  return count;
}

console.log(countWords('JavaScript is very powerful'));
```

### Output

```js
4
```

### Explanation

First trim extra spaces from the beginning and end.

Then split by space and count valid words.

---

## 15. Remove Spaces From A String

### Question

Remove all spaces from a string.

### Code

```js
function removeSpaces(str) {
  var result = '';

  for (var i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      result = result + str[i];
    }
  }

  return result;
}

console.log(removeSpaces('I love JavaScript'));
```

### Output

```js
'IloveJavaScript'
```

### Explanation

Loop through each character.

Add only non-space characters into the result.

---

## 16. Check If String Contains Only Digits

### Question

Check whether a string contains only numbers.

### Code

```js
function containsOnlyDigits(str) {
  if (str.length === 0) {
    return false;
  }

  for (var i = 0; i < str.length; i++) {
    if (str[i] < '0' || str[i] > '9') {
      return false;
    }
  }

  return true;
}

console.log(containsOnlyDigits('12345'));
console.log(containsOnlyDigits('123a5'));
```

### Output

```js
true
false
```

### Explanation

Every character should be between `'0'` and `'9'`.

If any character is outside this range, return `false`.

---

## 17. Find Most Frequent Character

### Question

Find the character that appears the most in a string.

### Code

```js
function mostFrequentCharacter(str) {
  var frequency = {};
  var maxChar = '';
  var maxCount = 0;

  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    if (char === ' ') {
      continue;
    }
    frequency[char] = (frequency[char] || 0) + 1;
    if (frequency[char] > maxCount) {
      maxCount = frequency[char];
      maxChar = char;
    }
  }

  return maxChar;
}

console.log(mostFrequentCharacter('javascript'));
```

### Output

```js
'a'
```

### Explanation

Count each character using an object.

While counting, keep track of the character with the highest count.

---

## 17. Find most Frequent number in the array.

```js
function findMostFrequent(arr) {
    let freq = {};
    let maxCount = 0;
    let mostFrequent = null;
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        freq[item] = (freq[item] || 0) + 1;
        if (freq[item] > maxCount) {
            maxCount = freq[item];
            mostFrequent = item;
        }
    }
    return mostFrequent;
}
console.log(findMostFrequent([1, 2, 3, 2, 4, 2, 3, 3, 3, 2, 4, 4, 4, 4]));
```

Output - 4


## 18. Replace Spaces With Hyphen

### Question

Replace spaces in a sentence with hyphens.

### Code

```js
function replaceSpacesWithHyphen(str) {
  var result = '';

  for (var i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      result = result + '-';
    } else {
      result = result + str[i];
    }
  }

  return result;
}

console.log(replaceSpacesWithHyphen('learn javascript daily'));
```

### Output

```js
'learn-javascript-daily'
```

### Explanation

Loop through the string.

When a space is found, add `-`; otherwise add the same character.

---

## 19. Toggle Character Case

### Question

Convert uppercase letters to lowercase and lowercase letters to uppercase.

### Code

```js
function toggleCase(str) {
  var result = '';

  for (var i = 0; i < str.length; i++) {
    var char = str[i];

    if (char.toLowerCase() === char.toUpperCase()) {
      result = result + char;
    } else if (char === char.toUpperCase()) {
      result = result + char.toLowerCase();
    } else {
      result = result + char.toUpperCase();
    }
  }

  return result;
}

console.log(toggleCase('JavaScript 123'));
```

### Output

```js
'jAVAsCRIPT 123'
```

### Explanation

For letters:

- uppercase becomes lowercase
- lowercase becomes uppercase

Numbers and spaces stay the same.

---

## 20. Count Occurrence Of A Word

### Question

Count how many times a specific word appears in a sentence.

### Code

```js
function countWordOccurrence(sentence, word) {
  var words = sentence.toLowerCase().split(' ');
  var target = word.toLowerCase();
  var count = 0;

  for (var i = 0; i < words.length; i++) {
    if (words[i] === target) {
      count++;
    }
  }

  return count;
}

console.log(countWordOccurrence('React is easy and react is popular', 'react'));
```

### Output

```js
2
```

### Explanation

Convert the sentence and target word to lowercase.

Then compare each word with the target word and count matches.

---

## 21. Reverse A String Recursively

### Question

Reverse a string recursively without using `.reverse()`.

### Code

```js
function reverseStringRecursive(str) {
  if (str.length <= 1) {
    return str;
  }

  return reverseStringRecursive(str.slice(1)) + str[0];
}

console.log(reverseStringRecursive('hello'));
```

### Output

```js
'olleh'
```

### Explanation

Remove the first character and reverse the remaining string.

Then add the first character at the end.

---

## 22. Palindrome Checker Ignoring Case And Symbols

### Question

Return `true` if a string reads the same backward while ignoring casing and non-alphanumeric characters.

### Code

```js
function isCleanPalindrome(str) {
  var clean = '';

  for (var i = 0; i < str.length; i++) {
    var char = str[i].toLowerCase();

    if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9')) {
      clean = clean + char;
    }
  }

  var left = 0;
  var right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

console.log(isCleanPalindrome('A man, a plan, a canal: Panama'));
console.log(isCleanPalindrome('hello'));
```

### Output

```js
true
false
```

### Explanation

First keep only letters and numbers in lowercase.

Then compare characters using two pointers from both ends.

---

## 23. First Unique Character Index

### Question

Find the index of the first non-repeating character in a string.

### Code

```js
function firstUniqueCharIndex(str) {
  var frequency = {};

  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    frequency[char] = (frequency[char] || 0) + 1;
  }

  for (var j = 0; j < str.length; j++) {
    if (frequency[str[j]] === 1) {
      return j;
    }
  }

  return -1;
}

console.log(firstUniqueCharIndex('leetcode'));
console.log(firstUniqueCharIndex('aabb'));
```

### Output

```js
0
-1
```

### Explanation

First count every character.

Then return the first index whose character count is `1`.

---

## 24. Truncate String

### Question

Truncate a string if it exceeds a maximum length and append `"..."`.

### Code

```js
function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength) + '...';
}

console.log(truncateString('JavaScript problem solving', 10));
console.log(truncateString('React', 10));
```

### Output

```js
'JavaScript...'
'React'
```

### Explanation

If the string is longer than the allowed length, take only the required part and add `"..."`.

---

# Mathematical And Logic Puzzles

## 1. Fibonacci Series

### Question

Print the Fibonacci series up to `n` terms.

### Code

```js
function fibonacciSeries(n) {
  var result = [];
  var first = 0;
  var second = 1;

  for (var i = 0; i < n; i++) {
    result.push(first);

    var next = first + second;
    first = second;
    second = next;
  }

  return result;
}

console.log(fibonacciSeries(7));
```

### Output

```js
[0, 1, 1, 2, 3, 5, 8]
```

### Explanation

Every next number is the sum of the previous two numbers.

---

## 2. Prime Number Checker

### Question

Check whether a number is prime or composite.

### Code

```js
function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  for (var i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(7));
console.log(isPrime(10));
```

### Output

```js
true
false
```

### Explanation

A prime number is divisible only by `1` and itself.

We check divisibility from `2` to square root of the number.

---

## 3. FizzBuzz

### Question

Print numbers from `1` to `n`.

- Print `Fizz` for multiples of `3`
- Print `Buzz` for multiples of `5`
- Print `FizzBuzz` for multiples of both `3` and `5`

### Code

```js
function fizzBuzz(n) {
  var result = [];

  for (var i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(i);
    }
  }

  return result;
}

console.log(fizzBuzz(15));
```

### Output

```js
[1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']
```

### Explanation

Check the condition for both `3` and `5` first.

---

## 4. Factorial Number

### Question

Find factorial of a number.

### Code

```js
function factorial(num) {
  var result = 1;

  for (var i = 2; i <= num; i++) {
    result = result * i;
  }

  return result;
}

console.log(factorial(5));
```

### Output

```js
120
```

### Explanation

Factorial means multiplying all numbers from `1` to that number.

Example:

```js
5 * 4 * 3 * 2 * 1 = 120
```

---

# Object Problem Solving Questions

## 1. Count Number Of Keys In An Object

### Question

Find how many keys are present in an object.

### Code

```js
function countKeys(obj) {
  var keys = Object.keys(obj);
  return keys.length;
}

var user = {
  name: 'Paras',
  age: 25,
  city: 'Bengaluru'
};

console.log(countKeys(user));
```

### Output

```js
3
```

### Explanation

`Object.keys(obj)` returns an array of object keys.

Then we use `.length` to count them.

---

## 2. Check If Object Has A Property

### Question

Check whether a given property exists in an object.

### Code

```js
function hasProperty(obj, key) {
  return obj.hasOwnProperty(key);
}

var user = {
  name: 'Paras',
  role: 'admin'
};

console.log(hasProperty(user, 'name'));
console.log(hasProperty(user, 'email'));
```

### Output

```js
true
false
```

### Explanation

`hasOwnProperty()` checks whether the property exists directly inside the object.

---

## 3. Convert Object To Array

### Question

Convert an object into an array of key-value pairs.

### Code

```js
function objectToArray(obj) {
  return Object.entries(obj);
}

var user = {
  name: 'Paras',
  age: 25
};

console.log(objectToArray(user));
```

### Output

```js
[
  ['name', 'Paras'],
  ['age', 25]
]
```

### Explanation

`Object.entries(obj)` converts an object into an array.

Each item contains:

- key
- value

---

## 4. Merge Two Objects

### Question

Merge two objects into one object.

### Code

```js
function mergeObjects(obj1, obj2) {
  return Object.assign({}, obj1, obj2);
}

var user = {
  name: 'Paras',
  age: 25
};

var address = {
  city: 'Bengaluru',
  country: 'India'
};

console.log(mergeObjects(user, address));
```

### Output

```js
{
  name: 'Paras',
  age: 25,
  city: 'Bengaluru',
  country: 'India'
}
```

### Explanation

`Object.assign()` copies properties from source objects into a new object.

### Shorter Version

```js
var merged = { ...user, ...address };

console.log(merged);
```

---

## 5. Find Highest Value In An Object

### Question

Find the key that has the highest value in an object.

### Code

```js
function findHighestScore(scores) {
  var highestNameKey = '';
  var highestScore = -Infinity;

  for (var key in scores) {
    if (scores[key] > highestScore) {
      highestScore = scores[key];
      highestNameKey = key;
    }
  }
  return {
    name: highestNameKey,
    score: highestScore
  };
}

var scores = {
  Amit: 80,
  Neha: 95,
  Ravi: 70
};

console.log(findHighestScore(scores));
```

### Output

```js
{ name: 'Neha', score: 95 }
```

### Explanation

Loop through every key in the object.

Compare each value with the current highest value.

If a bigger value is found, update both:

- highest key
- highest value

---

## 6. Deep Clone Object Without JSON Methods

### Question

Replicate an object completely, including nested objects and arrays, without using `JSON.parse(JSON.stringify())`.

### Code

```js
function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    var arrCopy = [];

    for (var i = 0; i < value.length; i++) {
      arrCopy[i] = deepClone(value[i]);
    }

    return arrCopy;
  }

  var objCopy = {};

  for (var key in value) {
    if (value.hasOwnProperty(key)) {
      objCopy[key] = deepClone(value[key]);
    }
  }

  return objCopy;
}

var user = {
  name: 'Paras',
  address: {
    city: 'Bengaluru'
  },
  skills: ['JS', 'React']
};

var copiedUser = deepClone(user);
copiedUser.address.city = 'Delhi';

console.log(user.address.city);
console.log(copiedUser.address.city);
```

### Output

```js
'Bengaluru'
'Delhi'
```

### Explanation

If the value is primitive, return it directly.

If it is an array or object, recursively copy each nested value.

---

## 7. Deep Equality Comparison

### Question

Compare two variables or objects deeply to confirm if they hold identical values.

### Code

```js
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  var keysA = Object.keys(a);
  var keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    var key = keysA[i];

    if (!b.hasOwnProperty(key)) {
      return false;
    }

    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
console.log(deepEqual({ a: 1 }, { a: 2 }));
```

### Output

```js
true
false
```

### Explanation

First compare direct values.

If both are objects, compare keys and then compare every nested value recursively.

---

## 8. Object Inversion

### Question

Swap an object's keys and values.

### Code

```js
function invertObject(obj) {
  var result = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];
      result[value] = key;
    }
  }

  return result;
}

console.log(invertObject({ name: 'Paras', role: 'admin' }));
```

### Output

```js
{ Paras: 'name', admin: 'role' }
```

### Explanation

Loop over each key.

Use the old value as the new key and the old key as the new value.

---

## 9. Filter Collection

### Question

Filter an array of objects based on key-value matching criteria.

### Code

```js
function filterCollection(collection, key, value) {
  var result = [];

  for (var i = 0; i < collection.length; i++) {
    if (collection[i][key] === value) {
      result.push(collection[i]);
    }
  }

  return result;
}

var users = [
  { name: 'Amit', role: 'admin' },
  { name: 'Priya', role: 'user' },
  { name: 'Rahul', role: 'admin' }
];

console.log(filterCollection(users, 'role', 'admin'));
```

### Output

```js
[
  { name: 'Amit', role: 'admin' },
  { name: 'Rahul', role: 'admin' }
]
```

### Explanation

Loop through every object and push only the objects whose key value matches.

---

## 10. Generic Group By Utility

### Question

Group an array of objects by a common property key.

### Code

```js
function groupBy(collection, key) {
  var result = {};

  for (var i = 0; i < collection.length; i++) {
    var groupKey = collection[i][key];

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(collection[i]);
  }

  return result;
}

var users = [
  { name: 'Amit', role: 'admin' },
  { name: 'Priya', role: 'user' },
  { name: 'Rahul', role: 'admin' }
];

console.log(groupBy(users, 'role'));
```

### Output

```js
{
  admin: [
    { name: 'Amit', role: 'admin' },
    { name: 'Rahul', role: 'admin' }
  ],
  user: [
    { name: 'Priya', role: 'user' }
  ]
}
```

### Explanation

Use the selected property value as the group name.

---

## 11. Query String Parser

### Question

Convert a URL query string into a JavaScript object.

Example:

```js
'?item=book&qty=2'
```

### Code

```js
function parseQueryString(query) {
  var result = {};

  if (query[0] === '?') {
    query = query.slice(1);
  }

  if (query === '') {
    return result;
  }

  var pairs = query.split('&');

  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts[1] || '');

    result[key] = value;
  }

  return result;
}

console.log(parseQueryString('?item=book&qty=2'));
```

### Output

```js
{ item: 'book', qty: '2' }
```

### Explanation

Remove `?`, split by `&`, then split each key-value pair by `=`.

---

## 12. Object Flattening

### Question

Flatten a nested object into dot-notated path keys.

Example:

```js
{ a: { b: 1 } } -> { 'a.b': 1 }
```

### Code

```js
function flatten(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flatten(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    } 
  }
  return result;
}

const data = {
  id: 101,
  tags: ['admin', 'editor'],
  info: {
    age: 28,
    location: {
      city: "New York",
      zip: 10001
    }
  }
};

console.log(flatten(data));
```

### Output

```js
/* Output:
{
  id: 101,
  'tags.0': 'admin',
  'tags.1': 'editor',
  'info.age': 28,
  'info.location.city': 'New York',
  'info.location.zip': 10001
}
*/
```

### Explanation

Use recursion and keep building the key path with dots.

---

# Advanced Functions And Closures

## 1. Debounce

### Question

Delay function execution until a specific amount of idle time has passed.

### Code

```js
function debounce(fn, delay) {
  var timerId;

  return function () {
    var context = this;
    var args = arguments;

    clearTimeout(timerId);

    timerId = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

var search = debounce(function (text) {
  console.log('Searching:', text);
}, 500);

search('r');
search('re');
search('rea');
```

### Explanation

Every new call resets the timer.

The function runs only after calls stop for the given delay.

---

## 2. Throttle

### Question

Limit function execution to once every specified time interval.

### Code

```js
function throttle(fn, delay) {
  var lastCall = 0;

  return function () {
    var now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, arguments);
    }
  };
}

var handleScroll = throttle(function () {
  console.log('Scroll event handled');
}, 1000);

handleScroll();
handleScroll();
```

### Explanation

Throttle allows the function to run at most once during the given time interval.

---

## 3. Currying Function

### Question

Transform a function with multiple arguments into a chain of functions.

### Code

```js
function curryAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(curryAdd(2)(3)(4));
```

### Output

```js
9
```

### Explanation

Each function remembers the previous argument using closure.

---

## 4. Memoize

### Question

Create a caching utility that remembers previous function results.

### Code

```js
function memoize(fn) {
  var cache = {};

  return function () {
    var key = JSON.stringify(arguments);

    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }

    var result = fn.apply(this, arguments);
    cache[key] = result;
    return result;
  };
}

var slowAdd = memoize(function (a, b) {
  console.log('Calculating...');
  return a + b;
});

console.log(slowAdd(2, 3));
console.log(slowAdd(2, 3));
```

### Explanation

The first call calculates the result.

The second call returns the saved result from cache.

---

## 5. Once

### Question

Allow a function to execute only once.

### Code

```js
function once(fn) {
  var called = false;
  var result;

  return function () {
    if (!called) {
      called = true;
      result = fn.apply(this, arguments);
    }

    return result;
  };
}

var initialize = once(function () {
  console.log('Initialized');
  return true;
});

initialize();
initialize();
```

### Explanation

The first call runs the function.

Later calls return the saved result.

---

## 6. Compose

### Question

Build a functional pipeline that runs functions from right to left.

### Code

```js
function compose() {
  var fns = arguments;

  return function (value) {
    var result = value;

    for (var i = fns.length - 1; i >= 0; i--) {
      result = fns[i](result);
    }

    return result;
  };
}

function double(num) {
  return num * 2;
}

function square(num) {
  return num * num;
}

var doubleThenSquare = compose(square, double);

console.log(doubleThenSquare(3));
```

### Output

```js
36
```

### Explanation

`compose(square, double)(3)` runs:

```js
square(double(3))
```

---

## 7. Partial Application

### Question

Fix some arguments inside a function and return a new function for the remaining arguments.

### Code

```js
function partial(fn) {
  var fixedArgs = Array.prototype.slice.call(arguments, 1);

  return function () {
    var remainingArgs = Array.prototype.slice.call(arguments);
    return fn.apply(this, fixedArgs.concat(remainingArgs));
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

var multiplyByTwo = partial(multiply, 2);

console.log(multiplyByTwo(3, 4));
```

### Output

```js
24
```

### Explanation

The first argument is fixed as `2`.

The returned function accepts the remaining arguments.

---

# Asynchronous JavaScript And Promises

## 1. Promise.all Polyfill

### Question

Recreate native `Promise.all`.

### Code

```js
function customPromiseAll(promises) {
  return new Promise(function (resolve, reject) {
    var result = [];
    var completed = 0;

    if (promises.length === 0) {
      resolve(result);
      return;
    }

    for (var i = 0; i < promises.length; i++) {
      (function (index) {
        Promise.resolve(promises[index])
          .then(function (value) {
            result[index] = value;
            completed++;

            if (completed === promises.length) {
              resolve(result);
            }
          })
          .catch(function (error) {
            reject(error);
          });
      })(i);
    }
  });
}

customPromiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log);
```

### Output

```js
[1, 2]
```

### Explanation

Resolve only when all promises are fulfilled.

Reject immediately if any promise fails.

---

## 2. Promise.race Polyfill

### Question

Return the result or error of the first promise that settles.

### Code

```js
function customPromiseRace(promises) {
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(resolve)
        .catch(reject);
    }
  });
}

customPromiseRace([
  new Promise(function (resolve) {
    setTimeout(function () {
      resolve('first');
    }, 500);
  }),
  new Promise(function (resolve) {
    setTimeout(function () {
      resolve('second');
    }, 1000);
  })
]).then(console.log);
```

### Output

```js
'first'
```

### Explanation

Whichever promise settles first decides the final result.

---

## 3. Async Auto-Retry

### Question

Retry a failing asynchronous action a specific number of times.

### Code

```js
async function retryAsync(fn, attempts) {
  var lastError;

  for (var i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

var count = 0;

function unstableApi() {
  return new Promise(function (resolve, reject) {
    count++;

    if (count < 3) {
      reject('Failed');
    } else {
      resolve('Success');
    }
  });
}

retryAsync(unstableApi, 3).then(console.log).catch(console.log);
```

### Output

```js
'Success'
```

### Explanation

Try the async function.

If it fails, try again until attempts are over.

---

## 4. Asynchronous Queue Or Pool

### Question

Run async tasks with a maximum concurrency limit.

### Code

```js
function asyncPool(tasks, limit) {
  return new Promise(function (resolve, reject) {
    var results = [];
    var running = 0;
    var index = 0;
    var completed = 0;

    function runNext() {
      if (completed === tasks.length) {
        resolve(results);
        return;
      }

      while (running < limit && index < tasks.length) {
        var currentIndex = index;
        var task = tasks[currentIndex];

        index++;
        running++;

        task()
          .then(function (result) {
            results[currentIndex] = result;
            running--;
            completed++;
            runNext();
          })
          .catch(reject);
      }
    }

    runNext();
  });
}

var tasks = [
  function () {
    return Promise.resolve('Task 1');
  },
  function () {
    return Promise.resolve('Task 2');
  },
  function () {
    return Promise.resolve('Task 3');
  }
];

asyncPool(tasks, 2).then(console.log);
```

### Output

```js
['Task 1', 'Task 2', 'Task 3']
```

### Explanation

Only `limit` number of tasks can run at the same time.

When one task finishes, the next task starts.

---

## 5. Sleep Or Delay Helper

### Question

Pause code execution for a specific duration using Promise and `setTimeout`.

### Code

```js
function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function run() {
  console.log('Start');
  await sleep(1000);
  console.log('After 1 second');
}

run();
```

### Explanation

`sleep` returns a promise that resolves after the given time.

---

# Native Polyfills And Data Structures

## 1. Custom Array map, filter, and reduce

### Question

Write custom prototype implementations of `map`, `filter`, and `reduce`.

### Code

```js
Array.prototype.customMap = function (callback) {
  var result = [];

  for (var i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};

Array.prototype.customFilter = function (callback) {
  var result = [];

  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

Array.prototype.customReduce = function (callback, initialValue) {
  var accumulator = initialValue;
  var startIndex = 0;

  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for (var i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

console.log([1, 2, 3].customMap(function (num) {
  return num * 2;
}));

console.log([1, 2, 3, 4].customFilter(function (num) {
  return num > 2;
}));

console.log([1, 2, 3].customReduce(function (sum, num) {
  return sum + num;
}, 0));
```

### Output

```js
[2, 4, 6]
[3, 4]
6
```

### Explanation

These methods loop through the array and call the callback manually.

---

## 2. Linked List Implementation

### Question

Create a basic linked list with insertion, removal, and traversal.

### Code

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(value) {
    var newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    var current = this.head;

    while (current.next !== null) {
      current = current.next;
    }

    current.next = newNode;
  }

  remove(value) {
    if (this.head === null) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    var current = this.head;

    while (current.next !== null && current.next.value !== value) {
      current = current.next;
    }

    if (current.next !== null) {
      current.next = current.next.next;
    }
  }

  print() {
    var result = [];
    var current = this.head;

    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }
}

var list = new LinkedList();
list.insert(10);
list.insert(20);
list.insert(30);
list.remove(20);

console.log(list.print());
```

### Output

```js
[10, 30]
```

### Explanation

Each node stores a value and a pointer to the next node.

---

## 3. Custom Event Emitter

### Question

Build a pub/sub event system with `on`, `off`, and `emit`.

### Code

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }

    var filtered = [];

    for (var i = 0; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i] !== callback) {
        filtered.push(this.events[eventName][i]);
      }
    }

    this.events[eventName] = filtered;
  }

  emit(eventName, data) {
    if (!this.events[eventName]) {
      return;
    }

    for (var i = 0; i < this.events[eventName].length; i++) {
      this.events[eventName][i](data);
    }
  }
}

var emitter = new EventEmitter();

function greet(name) {
  console.log('Hello ' + name);
}

emitter.on('welcome', greet);
emitter.emit('welcome', 'Paras');
emitter.off('welcome', greet);
emitter.emit('welcome', 'Amit');
```

### Output

```js
'Hello Paras'
```

### Explanation

`on` registers a function.

`emit` calls all registered functions.

`off` removes a function from the event list.

---

# Quick Revision Summary

## Array Methods Used

- `push()`
- `includes()`
- `concat()`
- `filter()`
- `map()`
- `reduce()`
- `sort()`
- `flat()`

## String Methods Used

- `split()`
- `join()`
- `toLowerCase()`
- `toUpperCase()`
- `includes()`
- `slice()`
- `trim()`
- `sort()`

## Object Methods Used

- `Object.keys()`
- `Object.entries()`
- `Object.assign()`
- `hasOwnProperty()`
- object spread syntax
- `for...in`

## Common Interview Tips

- First explain the simple brute-force idea.
- Then write clean code.
- Then explain with one example.
- Mention edge cases if interviewer asks.
- Avoid jumping directly to complex optimization.
- Use meaningful variable names.
- Always return something from the function.

## Common Edge Cases To Think About

- empty array
- empty string
- duplicate values
- uppercase/lowercase letters
- spaces inside strings
- negative numbers
- array with one element
- string with one character
- object with no keys
- missing object property
- duplicate keys while merging objects

## Final Practice Checklist

Practice these without looking at the solution:

- reverse array
- find largest number
- remove duplicates
- second largest number
- frequency counter
- flatten array
- missing number
- move zeros
- two sum
- merge sorted arrays
- find duplicates
- intersection of arrays
- union of arrays
- rotate array
- pair with given sum
- remove falsy values
- chunk array
- maximum subarray sum
- sort array without sort
- group array of objects
- reverse string
- palindrome
- count vowels
- remove duplicate characters
- first non-repeating character
- anagram
- longest word
- character frequency
- capitalize words
- reverse words
- unique characters
- longest substring without repeating characters
- compress string
- count words
- remove spaces
- digits only string
- most frequent character
- replace spaces with hyphen
- toggle case
- count word occurrence
- count object keys
- check object property
- convert object to array
- merge objects
- find highest object value
- recursive reverse string
- clean palindrome checker
- first unique character index
- truncate string
- fibonacci series
- prime number checker
- FizzBuzz
- factorial
- deep clone object
- deep equality comparison
- object inversion
- filter collection
- generic group by
- query string parser
- object flattening
- debounce
- throttle
- currying
- memoize
- once
- compose
- partial application
- Promise.all polyfill
- Promise.race polyfill
- async auto-retry
- async queue or pool
- sleep/delay helper
- custom map/filter/reduce
- linked list
- event emitter
