# JavaScript Problem Solving Questions and Answers

This document contains commonly asked JavaScript problem-solving interview questions.

It focuses on:

- 10 array-based questions
- 10 string-based questions
- 5 object-based questions
- Vanilla JavaScript only
- simple logic that is easy to explain in interviews

You can run these examples in:

- browser console
- Node.js
- any online JavaScript editor

---

## Array Problem Solving Questions

## 0. Find missing number without using buil-in method
### Code

```js
function missingNumber(arr){
    var missingFlag = 0;
    var missingValue = 0;
    for(var i=0; i<arr.length; i++){
        missingFlag++;
        if(arr[i] > missingValue && arr[i] > missingFlag) {
            missingValue=arr[i];
        }
    }
    return missingFlag;
}
const result = missingNumber([1,2,3,4,6]);
console.log("___missing value: ", result);
console.log(reverseArray([1, 2, 3, 4, 5]));
```

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
```

### Output

```js
{ apple: 2, banana: 2, orange: 1 }
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
    if (arr2.includes(arr1[i]) && !result.includes(arr1[i])) {
      result.push(arr1[i]);
    }
  }

  return result;
}

console.log(findIntersection([1, 2, 3, 4], [3, 4, 5, 6]));
```

### Output

```js
[3, 4]
```

### Explanation

Loop through the first array and check whether the same value exists in the second array.

Also check `result` so duplicate common values are not added again.

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
function sortArray(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }

  for (var j = 0; j < result.length; j++) {
    for (var k = 0; k < result.length - 1; k++) {
      if (result[k] > result[k + 1]) {
        var temp = result[k];
        result[k] = result[k + 1];
        result[k + 1] = temp;
      }
    }
  }

  return result;
}

console.log(sortArray([5, 2, 8, 1, 3]));
```

### Output

```js
[1, 2, 3, 5, 8]
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
function characterFrequency(str) {
  var frequency = {};

  for (var i = 0; i < str.length; i++) {
    var char = str[i];

    if (char === ' ') {
      continue;
    }

    frequency[char] = (frequency[char] || 0) + 1;
  }

  return frequency;
}

console.log(characterFrequency('hello world'));
```

### Output

```js
{ h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }
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
  var highestName = '';
  var highestScore = -Infinity;

  for (var key in scores) {
    if (scores[key] > highestScore) {
      highestScore = scores[key];
      highestName = key;
    }
  }

  return {
    name: highestName,
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
