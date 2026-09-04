# JavaScript 200 Coding Problems

A reference collection of classic JavaScript coding problems commonly asked in interviews — each with a solution, explanation, and example.

Problems are numbered continuously and grouped by topic:

1. **Strings** (1–87)
2. **Arrays** (88–177)
3. **Numbers & Math, Objects & Data Structures, Functions** (178–200)

---

## Strings

### 1. Reverse a String
```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}
```

**Explanation:** Split into characters, reverse the array, join back together.

**Example:** `reverseString('hello')` → `'olleh'`

### 2. Check for Palindrome
```javascript
function isPalindrome(str) {
  const s = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  return s === s.split('').reverse().join('');
}
```

**Explanation:** Normalize the string (strip non-alphanumerics, lowercase), then compare to its reverse.

**Example:** `isPalindrome('A man, a plan, a canal: Panama')` → `true`

### 3. Check for Anagram
```javascript
function isAnagram(a, b) {
  const norm = s => s.toLowerCase().split('').sort().join('');
  return norm(a) === norm(b);
}
```

**Explanation:** Sort the letters of both strings and compare.

**Example:** `isAnagram('listen', 'silent')` → `true`

### 4. Count Vowels in a String
```javascript
function countVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}
```

**Example:** `countVowels('Hello World')` → `3`

### 5. Capitalize First Letter of Each Word
```javascript
function capitalizeWords(str) {
  return str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}
```

**Example:** `capitalizeWords('hello world')` → `'Hello World'`

### 6. Find the First Non-Repeating Character
```javascript
function firstUniqueChar(str) {
  for (let ch of str) {
    if (str.indexOf(ch) === str.lastIndexOf(ch)) return ch;
  }
  return null;
}
```

**Example:** `firstUniqueChar('swiss')` → `'w'`

### 7. Count Character Frequency
```javascript
function charFrequency(str) {
  const freq = {};
  for (let ch of str) freq[ch] = (freq[ch] || 0) + 1;
  return freq;
}
```

**Example:** `charFrequency('hello')` → `{h:1, e:1, l:2, o:1}`

### 8. Word Frequency Counter
```javascript
function wordFrequency(str) {
  const words = str.toLowerCase().match(/\w+/g) || [];
  return words.reduce((acc, w) => {
    acc[w] = (acc[w] || 0) + 1;
    return acc;
  }, {});
}
```

**Example:** `wordFrequency('the cat and the dog')` → `{the:2, cat:1, and:1, dog:1}`

### 9. Reverse Words in a Sentence
```javascript
function reverseWords(str) {
  return str.trim().split(/\s+/).reverse().join(' ');
}
```

**Example:** `reverseWords('Hello World Again')` → `'Again World Hello'`

### 10. Check if Two Strings are Rotations of Each Other
```javascript
function isRotation(a, b) {
  return a.length === b.length && (a + a).includes(b);
}
```

**Example:** `isRotation('waterbottle', 'erbottlewat')` → `true`

### 11. String Compression (Run-Length Encoding)
```javascript
function compress(str) {
  let result = '';
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      result += str[i] + count;
      count = 1;
    }
  }
  return result.length < str.length ? result : str;
}
```

**Example:** `compress('aaabbc')` → `'a3b2c1'`

### 12. Remove Duplicate Characters from a String
```javascript
function removeDuplicateChars(str) {
  return [...new Set(str)].join('');
}
```

**Example:** `removeDuplicateChars('mississippi')` → `'misp'`

### 13. Longest Common Prefix
```javascript
function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}
```

**Example:** `longestCommonPrefix(['flower','flow','flight'])` → `'fl'`

### 14. Longest Palindromic Substring
```javascript
function longestPalindrome(s) {
  let result = '';
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return s.slice(l + 1, r);
  };
  for (let i = 0; i < s.length; i++) {
    const odd = expand(i, i);
    const even = expand(i, i + 1);
    if (odd.length > result.length) result = odd;
    if (even.length > result.length) result = even;
  }
  return result;
}
```

**Example:** `longestPalindrome('babad')` → `'bab'` (or `'aba'`)

### 15. Longest Substring Without Repeating Characters
```javascript
function longestUniqueSubstring(s) {
  const seen = new Map();
  let start = 0, max = 0;
  for (let i = 0; i < s.length; i++) {
    if (seen.has(s[i]) && seen.get(s[i]) >= start) start = seen.get(s[i]) + 1;
    seen.set(s[i], i);
    max = Math.max(max, i - start + 1);
  }
  return max;
}
```

**Example:** `longestUniqueSubstring('abcabcbb')` → `3` (`'abc'`)

### 16. Group Anagrams
```javascript
function groupAnagrams(words) {
  const map = new Map();
  for (const w of words) {
    const key = w.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return [...map.values()];
}
```

**Example:** `groupAnagrams(['eat','tea','tan','ate','nat','bat'])` → `[['eat','tea','ate'],['tan','nat'],['bat']]`

### 17. Find All Permutations of a String
```javascript
function permutations(str) {
  if (str.length <= 1) return [str];
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const rest = str.slice(0, i) + str.slice(i + 1);
    for (const p of permutations(rest)) result.push(str[i] + p);
  }
  return result;
}
```

**Example:** `permutations('abc')` → `['abc','acb','bac','bca','cab','cba']`

### 18. Check if a String is a Subsequence of Another
```javascript
function isSubsequence(sub, str) {
  let i = 0;
  for (const ch of str) {
    if (sub[i] === ch) i++;
  }
  return i === sub.length;
}
```

**Example:** `isSubsequence('ace', 'abcde')` → `true`

### 19. Check if a String Has All Unique Characters
```javascript
function hasAllUniqueChars(str) {
  return new Set(str).size === str.length;
}
```

**Example:** `hasAllUniqueChars('abcdef')` → `true`

### 20. Convert String to camelCase
```javascript
function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, ch) => (ch ? ch.toUpperCase() : ''));
}
```

**Example:** `toCamelCase('background-color')` → `'backgroundColor'`

### 21. Convert String to snake_case
```javascript
function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}
```

**Example:** `toSnakeCase('backgroundColor')` → `'background_color'`

### 22. Convert String to kebab-case
```javascript
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}
```

**Example:** `toKebabCase('backgroundColor')` → `'background-color'`

### 23. Find the Longest Word in a Sentence
```javascript
function longestWord(sentence) {
  return sentence.split(' ').reduce((a, b) => (b.length > a.length ? b : a), '');
}
```

**Example:** `longestWord('The quick brown fox')` → `'quick'`

### 24. Reverse Only the Vowels in a String
```javascript
function reverseVowels(str) {
  const isVowel = c => 'aeiouAEIOU'.includes(c);
  const arr = str.split('');
  let l = 0, r = arr.length - 1;
  while (l < r) {
    if (!isVowel(arr[l])) { l++; continue; }
    if (!isVowel(arr[r])) { r--; continue; }
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++; r--;
  }
  return arr.join('');
}
```

**Example:** `reverseVowels('hello')` → `'holle'`

### 25. Reverse Each Word's Letters (Keep Word Order)
```javascript
function reverseLettersInWords(str) {
  return str.split(' ').map(w => w.split('').reverse().join('')).join(' ');
}
```

**Example:** `reverseLettersInWords('Hello World')` → `'olleH dlroW'`

### 26. Convert Integer to Roman Numeral
```javascript
function intToRoman(num) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
}
```

**Example:** `intToRoman(1994)` → `'MCMXCIV'`

### 27. Convert Roman Numeral to Integer
```javascript
function romanToInt(s) {
  const vals = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = vals[s[i]], next = vals[s[i + 1]];
    total += next > cur ? -cur : cur;
  }
  return total;
}
```

**Example:** `romanToInt('MCMXCIV')` → `1994`

### 28. Count Occurrences of a Substring
```javascript
function countOccurrences(str, sub) {
  if (!sub) return 0;
  let count = 0, pos = 0;
  while ((pos = str.indexOf(sub, pos)) !== -1) { count++; pos += sub.length; }
  return count;
}
```

**Example:** `countOccurrences('ababab', 'ab')` → `3`

### 29. Check if Two Strings are One Edit Distance Apart
```javascript
function isOneEditDistance(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  const [shorter, longer] = a.length < b.length ? [a, b] : [b, a];
  let i = 0, foundDiff = false;
  for (; i < shorter.length; i++) {
    if (shorter[i] !== longer[i]) {
      return longer.length === shorter.length
        ? shorter.slice(i + 1) === longer.slice(i + 1)
        : shorter.slice(i) === longer.slice(i + 1);
    }
  }
  return longer.length - shorter.length === 1;
}
```

**Example:** `isOneEditDistance('cat', 'cats')` → `true`

### 30. Find the Longest Common Substring
```javascript
function longestCommonSubstring(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  let max = 0, end = 0;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > max) { max = dp[i][j]; end = i; }
      }
    }
  }
  return a.slice(end - max, end);
}
```

**Example:** `longestCommonSubstring('abcdef', 'zbcdf')` → `'bcd'`

### 31. Check if a String Can Be Rearranged into a Palindrome
```javascript
function canFormPalindrome(str) {
  const freq = {};
  for (const ch of str.replace(/\s/g, '').toLowerCase()) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  const oddCounts = Object.values(freq).filter(n => n % 2 !== 0).length;
  return oddCounts <= 1;
}
```

**Example:** `canFormPalindrome('carrace')` → `true` (rearranges to `'racecar'`)

### 32. Implement strStr() — Naive Substring Search
```javascript
function strStr(haystack, needle) {
  if (needle === '') return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.slice(i, i + needle.length) === needle) return i;
  }
  return -1;
}
```

**Example:** `strStr('hello', 'll')` → `2`

### 33. Collapse Multiple Spaces into One
```javascript
function collapseSpaces(str) {
  return str.trim().replace(/\s+/g, ' ');
}
```

**Example:** `collapseSpaces('  hello    world  ')` → `'hello world'`

### 34. Find the Most Frequent Character in a String
```javascript
function mostFrequentChar(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  return Object.keys(freq).reduce((a, b) => (freq[a] >= freq[b] ? a : b));
}
```

**Example:** `mostFrequentChar('abracadabra')` → `'a'`

### 35. Convert a Sentence to Pig Latin
```javascript
function toPigLatin(sentence) {
  return sentence
    .split(' ')
    .map(word => {
      const vowels = 'aeiouAEIOU';
      if (vowels.includes(word[0])) return word + 'way';
      const idx = [...word].findIndex(c => vowels.includes(c));
      return idx === -1 ? word + 'ay' : word.slice(idx) + word.slice(0, idx) + 'ay';
    })
    .join(' ');
}
```

**Example:** `toPigLatin('hello world')` → `'ellohay orldway'`

### 36. Add Thousand Separators to a Number String
```javascript
function addThousandSeparators(numStr) {
  const [intPart, decPart] = String(numStr).split('.');
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}
```

**Example:** `addThousandSeparators('1234567')` → `'1,234,567'`

### 37. Validate an IPv4 Address String
```javascript
function isValidIPv4(str) {
  const parts = str.split('.');
  if (parts.length !== 4) return false;
  return parts.every(p => /^\d{1,3}$/.test(p) && Number(p) <= 255 && String(Number(p)) === p);
}
```

**Example:** `isValidIPv4('192.168.1.1')` → `true`

### 38. Length of the Last Word
```javascript
function lengthOfLastWord(s) {
  const words = s.trim().split(/\s+/);
  return words[words.length - 1].length;
}
```

**Example:** `lengthOfLastWord('  Hello World  ')` → `5`

### 39. Add Two Numbers Represented as Strings
```javascript
function addStrings(a, b) {
  let i = a.length - 1, j = b.length - 1, carry = 0;
  let result = '';
  while (i >= 0 || j >= 0 || carry) {
    const sum = (+a[i] || 0) + (+b[j] || 0) + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);
    i--; j--;
  }
  return result;
}
```

**Example:** `addStrings('123', '77')` → `'200'`

### 40. Multiply Two Numbers Represented as Strings
```javascript
function multiplyStrings(a, b) {
  const result = Array(a.length + b.length).fill(0);
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      const mul = (a[i] - '0') * (b[j] - '0');
      const sum = mul + result[i + j + 1];
      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }
  return result.join('').replace(/^0+(?=\d)/, '');
}
```

**Example:** `multiplyStrings('123', '456')` → `'56088'`

### 41. Compare Version Numbers
```javascript
function compareVersion(v1, v2) {
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const x = a[i] || 0, y = b[i] || 0;
    if (x !== y) return x > y ? 1 : -1;
  }
  return 0;
}
```

**Example:** `compareVersion('1.01', '1.001')` → `0`

### 42. String to Integer (atoi)
```javascript
function myAtoi(str) {
  const match = str.trim().match(/^[+-]?\d+/);
  if (!match) return 0;
  const num = Number(match[0]);
  return Math.max(-(2 ** 31), Math.min(num, 2 ** 31 - 1));
}
```

**Example:** `myAtoi('   -42abc')` → `-42`

### 43. Integer to String (Without Built-in Conversion)
```javascript
function intToStr(n) {
  if (n === 0) return '0';
  const sign = n < 0 ? '-' : '';
  n = Math.abs(n);
  let digits = '';
  while (n > 0) {
    digits = String.fromCharCode(48 + (n % 10)) + digits;
    n = Math.floor(n / 10);
  }
  return sign + digits;
}
```

**Example:** `intToStr(-582)` → `'-582'`

### 44. Validate a Number String (Decimal/Exponent)
```javascript
function isValidNumber(s) {
  return /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s.trim());
}
```

**Example:** `isValidNumber('-3.14e10')` → `true`

### 45. Decode a Run-Length Encoded String
```javascript
function decodeRLE(str) {
  return str.replace(/([a-zA-Z])(\d+)/g, (_, ch, count) => ch.repeat(Number(count)));
}
```

**Example:** `decodeRLE('a3b2c1')` → `'aaabbc'`

### 46. Minimum Window Substring
```javascript
function minWindow(s, t) {
  if (!t) return '';
  const need = {};
  for (const ch of t) need[ch] = (need[ch] || 0) + 1;
  let required = Object.keys(need).length, formed = 0;
  const windowCounts = {};
  let l = 0, best = [Infinity, 0, 0];
  for (let r = 0; r < s.length; r++) {
    const ch = s[r];
    windowCounts[ch] = (windowCounts[ch] || 0) + 1;
    if (need[ch] && windowCounts[ch] === need[ch]) formed++;
    while (formed === required) {
      if (r - l + 1 < best[0]) best = [r - l + 1, l, r];
      const lch = s[l];
      windowCounts[lch]--;
      if (need[lch] && windowCounts[lch] < need[lch]) formed--;
      l++;
    }
  }
  return best[0] === Infinity ? '' : s.slice(best[1], best[2] + 1);
}
```

**Example:** `minWindow('ADOBECODEBANC', 'ABC')` → `'BANC'`

### 47. Word Pattern Match
```javascript
function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  const p2w = {}, w2p = {};
  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i], w = words[i];
    if ((p2w[p] && p2w[p] !== w) || (w2p[w] && w2p[w] !== p)) return false;
    p2w[p] = w; w2p[w] = p;
  }
  return true;
}
```

**Example:** `wordPattern('abba', 'dog cat cat dog')` → `true`

### 48. Find All Anagram Substring Start Indices
```javascript
function findAnagramIndices(s, p) {
  const need = Array(26).fill(0);
  for (const ch of p) need[ch.charCodeAt(0) - 97]++;
  const window = Array(26).fill(0);
  const result = [];
  for (let i = 0; i < s.length; i++) {
    window[s.charCodeAt(i) - 97]++;
    if (i >= p.length) window[s.charCodeAt(i - p.length) - 97]--;
    if (i >= p.length - 1 && window.every((v, idx) => v === need[idx])) {
      result.push(i - p.length + 1);
    }
  }
  return result;
}
```

**Example:** `findAnagramIndices('cbaebabacd', 'abc')` → `[0, 6]`

### 49. Word Break (Can String Be Segmented)
```javascript
function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}
```

**Example:** `wordBreak('leetcode', ['leet', 'code'])` → `true`

### 50. Count Distinct Substrings
```javascript
function countDistinctSubstrings(s) {
  const set = new Set();
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) set.add(s.slice(i, j));
  }
  return set.size;
}
```

**Example:** `countDistinctSubstrings('aba')` → `5` (`'a','b','ab','ba','aba'`)

### 51. Zigzag Conversion
```javascript
function zigzagConvert(s, numRows) {
  if (numRows === 1) return s;
  const rows = Array.from({ length: numRows }, () => '');
  let row = 0, dir = -1;
  for (const ch of s) {
    rows[row] += ch;
    if (row === 0 || row === numRows - 1) dir = -dir;
    row += dir;
  }
  return rows.join('');
}
```

**Example:** `zigzagConvert('PAYPALISHIRING', 3)` → `'PAHNAPLSIIGYIR'`

### 52. Longest Prefix That Is Also a Suffix (KMP Table)
```javascript
function longestPrefixSuffix(s) {
  const lps = Array(s.length).fill(0);
  let len = 0, i = 1;
  while (i < s.length) {
    if (s[i] === s[len]) { lps[i++] = ++len; }
    else if (len > 0) { len = lps[len - 1]; }
    else { lps[i++] = 0; }
  }
  return s.slice(0, lps[s.length - 1]);
}
```

**Example:** `longestPrefixSuffix('ababab')` → `'abab'`

### 53. Basic Text Justification
```javascript
function fullJustify(words, maxWidth) {
  const lines = [];
  let line = [], len = 0;
  for (const w of words) {
    if (len + line.length + w.length > maxWidth) {
      for (let i = 0; i < maxWidth - len; i++) {
        line[i % (line.length - 1 || 1)] += ' ';
      }
      lines.push(line.join(''));
      line = []; len = 0;
    }
    line.push(w); len += w.length;
  }
  lines.push(line.join(' ').padEnd(maxWidth));
  return lines;
}
```

**Example:** `fullJustify(['This','is','an','example'], 16)` → justified lines array

### 54. Check Unique Characters Using Bit Manipulation
```javascript
function hasUniqueCharsBitwise(str) {
  let checker = 0;
  for (const ch of str) {
    const bit = ch.charCodeAt(0) - 97;
    if (checker & (1 << bit)) return false;
    checker |= (1 << bit);
  }
  return true;
}
```

**Example:** `hasUniqueCharsBitwise('abcdef')` → `true`

### 55. Shortest Palindrome by Prepending Characters
```javascript
function shortestPalindrome(s) {
  const rev = s.split('').reverse().join('');
  const combined = s + '#' + rev;
  const lps = Array(combined.length).fill(0);
  let len = 0, i = 1;
  while (i < combined.length) {
    if (combined[i] === combined[len]) lps[i++] = ++len;
    else if (len > 0) len = lps[len - 1];
    else lps[i++] = 0;
  }
  return rev.slice(0, s.length - lps[combined.length - 1]) + s;
}
```

**Example:** `shortestPalindrome('aacecaaa')` → `'aaacecaaa'`

### 56. Count Total Palindromic Substrings
```javascript
function countPalindromicSubstrings(s) {
  let count = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { count++; l--; r++; }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}
```

**Example:** `countPalindromicSubstrings('aaa')` → `6`

### 57. Excel Column Title to Number
```javascript
function titleToNumber(s) {
  let result = 0;
  for (const ch of s) result = result * 26 + (ch.charCodeAt(0) - 64);
  return result;
}
```

**Example:** `titleToNumber('AB')` → `28`

### 58. Number to Excel Column Title
```javascript
function numberToTitle(n) {
  let result = '';
  while (n > 0) {
    n--;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result;
}
```

**Example:** `numberToTitle(28)` → `'AB'`

### 59. Find the Longest Repeating Substring
```javascript
function longestRepeatingSubstring(s) {
  const n = s.length;
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  let maxLen = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (s[i - 1] === s[j - 1] && dp[i - 1][j - 1] < j - i) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        maxLen = Math.max(maxLen, dp[i][j]);
      }
    }
  }
  return maxLen;
}
```

**Example:** `longestRepeatingSubstring('banana')` → `2` (`'an'`)

### 60. Permutation in String (Check if s2 Contains a Permutation of s1)
```javascript
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = Array(26).fill(0);
  for (const ch of s1) need[ch.charCodeAt(0) - 97]++;
  const window = Array(26).fill(0);
  for (let i = 0; i < s2.length; i++) {
    window[s2.charCodeAt(i) - 97]++;
    if (i >= s1.length) window[s2.charCodeAt(i - s1.length) - 97]--;
    if (window.every((v, idx) => v === need[idx])) return true;
  }
  return false;
}
```

**Example:** `checkInclusion('ab', 'eidbaooo')` → `true`

### 61. Reverse a String Recursively
```javascript
function reverseRecursive(str) {
  if (str.length <= 1) return str;
  return reverseRecursive(str.slice(1)) + str[0];
}
```

**Example:** `reverseRecursive('hello')` → `'olleh'`

### 62. Buddy Strings (One Swap Makes Equal)
```javascript
function buddyStrings(a, b) {
  if (a.length !== b.length) return false;
  if (a === b) return new Set(a).size < a.length;
  const diffs = [];
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diffs.push(i);
  return diffs.length === 2 && a[diffs[0]] === b[diffs[1]] && a[diffs[1]] === b[diffs[0]];
}
```

**Example:** `buddyStrings('ab', 'ba')` → `true`

### 63. Find the Added Letter Between Two Strings
```javascript
function findAddedLetter(s, t) {
  const code = [...t].reduce((a, c) => a + c.charCodeAt(0), 0) -
               [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
  return String.fromCharCode(code);
}
```

**Example:** `findAddedLetter('abcd', 'abcde')` → `'e'`

### 64. Ransom Note (Can Construct from Magazine)
```javascript
function canConstruct(ransomNote, magazine) {
  const freq = {};
  for (const ch of magazine) freq[ch] = (freq[ch] || 0) + 1;
  for (const ch of ransomNote) {
    if (!freq[ch]) return false;
    freq[ch]--;
  }
  return true;
}
```

**Example:** `canConstruct('aa', 'aab')` → `true`

### 65. Isomorphic Strings
```javascript
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const map1 = {}, map2 = {};
  for (let i = 0; i < s.length; i++) {
    if (map1[s[i]] === undefined && map2[t[i]] === undefined) {
      map1[s[i]] = t[i]; map2[t[i]] = s[i];
    } else if (map1[s[i]] !== t[i] || map2[t[i]] !== s[i]) {
      return false;
    }
  }
  return true;
}
```

**Example:** `isIsomorphic('egg', 'add')` → `true`

### 66. Caesar Cipher Encode/Decode
```javascript
function caesarCipher(str, shift) {
  return str.replace(/[a-zA-Z]/g, ch => {
    const base = ch === ch.toUpperCase() ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
  });
}
```

**Example:** `caesarCipher('abc', 3)` → `'def'`

### 67. Count Vowel Substrings
```javascript
function countVowelSubstrings(word) {
  const vowels = new Set('aeiou');
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    const seen = new Set();
    for (let j = i; j < word.length; j++) {
      if (!vowels.has(word[j])) break;
      seen.add(word[j]);
      if (seen.size === 5) count++;
    }
  }
  return count;
}
```

**Example:** `countVowelSubstrings('aeiouu')` → `2`

### 68. Count Binary Substrings (Equal Grouped 0s and 1s)
```javascript
function countBinarySubstrings(s) {
  let prevRun = 0, curRun = 1, count = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) curRun++;
    else { prevRun = curRun; curRun = 1; }
    if (prevRun >= curRun) count++;
  }
  return count;
}
```

**Example:** `countBinarySubstrings('00110011')` → `6`

### 69. Minimum Deletions to Make a Palindrome
```javascript
function minDeletionsToPalindrome(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = s[i] === s[j] ? dp[i + 1][j - 1] : 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][n - 1];
}
```

**Example:** `minDeletionsToPalindrome('abcda')` → `2`

### 70. Repeated Substring Pattern
```javascript
function repeatedSubstringPattern(s) {
  return (s + s).slice(1, -1).includes(s);
}
```

**Example:** `repeatedSubstringPattern('abab')` → `true`

### 71. Find the First Repeated Word in a String
```javascript
function firstRepeatedWord(str) {
  const seen = new Set();
  for (const word of str.toLowerCase().match(/\w+/g) || []) {
    if (seen.has(word)) return word;
    seen.add(word);
  }
  return null;
}
```

**Example:** `firstRepeatedWord('the cat and the dog')` → `'the'`

### 72. Longest Substring with At Most K Distinct Characters
```javascript
function longestSubstringKDistinct(s, k) {
  const freq = {};
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    freq[s[r]] = (freq[s[r]] || 0) + 1;
    while (Object.keys(freq).length > k) {
      freq[s[l]]--;
      if (freq[s[l]] === 0) delete freq[s[l]];
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}
```

**Example:** `longestSubstringKDistinct('eceba', 2)` → `3` (`'ece'`)

### 73. Convert snake_case to camelCase
```javascript
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, ch) => ch.toUpperCase());
}
```

**Example:** `snakeToCamel('background_color')` → `'backgroundColor'`

### 74. Check Strobogrammatic String
```javascript
function isStrobogrammatic(num) {
  const map = { '0':'0','1':'1','6':'9','8':'8','9':'6' };
  let l = 0, r = num.length - 1;
  while (l <= r) {
    if (!map[num[l]] || map[num[l]] !== num[r]) return false;
    l++; r--;
  }
  return true;
}
```

**Example:** `isStrobogrammatic('69')` → `true`

### 75. Tokenize a String by Multiple Delimiters
```javascript
function tokenize(str, delimiters) {
  const pattern = new RegExp(`[${delimiters.map(d => `\\${d}`).join('')}]+`);
  return str.split(pattern).filter(Boolean);
}
```

**Example:** `tokenize('a,b;c d', [',', ';', ' '])` → `['a','b','c','d']`

### 76. Longest Repeating Character Replacement
```javascript
function characterReplacement(s, k) {
  const freq = {};
  let l = 0, maxFreq = 0, result = 0;
  for (let r = 0; r < s.length; r++) {
    freq[s[r]] = (freq[s[r]] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[s[r]]);
    while (r - l + 1 - maxFreq > k) {
      freq[s[l]]--;
      l++;
    }
    result = Math.max(result, r - l + 1);
  }
  return result;
}
```

**Example:** `characterReplacement('AABABBA', 1)` → `4`

### 77. Levenshtein Edit Distance
```javascript
function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}
```

**Example:** `editDistance('horse', 'ros')` → `3`

### 78. Find All Substrings of a Given Length
```javascript
function substringsOfLength(str, len) {
  const result = [];
  for (let i = 0; i <= str.length - len; i++) result.push(str.slice(i, i + len));
  return result;
}
```

**Example:** `substringsOfLength('abcdef', 3)` → `['abc','bcd','cde','def']`

### 79. Valid Palindrome II (Allow Removing One Character)
```javascript
function validPalindromeII(s) {
  const isPalin = (l, r) => {
    while (l < r) { if (s[l] !== s[r]) return false; l++; r--; }
    return true;
  };
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return isPalin(l + 1, r) || isPalin(l, r - 1);
    l++; r--;
  }
  return true;
}
```

**Example:** `validPalindromeII('abca')` → `true` (remove `'b'` or `'c'`)

### 80. Find Common Characters Among Multiple Strings
```javascript
function commonChars(words) {
  let common = [...words[0]];
  for (let i = 1; i < words.length; i++) {
    const chars = [...words[i]];
    common = common.filter(ch => {
      const idx = chars.indexOf(ch);
      if (idx === -1) return false;
      chars.splice(idx, 1);
      return true;
    });
  }
  return common;
}
```

**Example:** `commonChars(['bella','label','roller'])` → `['e','l','l']`

### 81. Convert a String to Title Case
```javascript
function toTitleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, ch => ch.toUpperCase());
}
```

**Example:** `toTitleCase('the great gatsby')` → `'The Great Gatsby'`

### 82. Find the Longest Uncommon Subsequence
```javascript
function findLUSlength(a, b) {
  if (a === b) return -1;
  return Math.max(a.length, b.length);
}
```

**Example:** `findLUSlength('aba', 'cdc')` → `3`

### 83. Sort Characters by Frequency
```javascript
function frequencySort(s) {
  const freq = {};
  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
  return Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a])
    .map(ch => ch.repeat(freq[ch]))
    .join('');
}
```

**Example:** `frequencySort('tree')` → `'eert'` (or `'eetr'`)

### 84. Custom Sort String (Sort by Order of Another String)
```javascript
function customSortString(order, s) {
  const rank = {};
  for (let i = 0; i < order.length; i++) rank[order[i]] = i;
  return s.split('').sort((a, b) => (rank[a] ?? 999) - (rank[b] ?? 999)).join('');
}
```

**Example:** `customSortString('cba', 'abcd')` → `'cbad'`

### 85. Check if All Characters Have the Same Frequency
```javascript
function allSameFrequency(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  const counts = new Set(Object.values(freq));
  return counts.size === 1;
}
```

**Example:** `allSameFrequency('aabbcc')` → `true`

### 86. Remove Duplicate Letters (Keep Lexicographically Smallest Result)
```javascript
function removeDuplicateLetters(s) {
  const lastIndex = {};
  for (let i = 0; i < s.length; i++) lastIndex[s[i]] = i;
  const stack = [];
  const seen = new Set();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (seen.has(ch)) continue;
    while (stack.length && stack[stack.length - 1] > ch && lastIndex[stack[stack.length - 1]] > i) {
      seen.delete(stack.pop());
    }
    stack.push(ch);
    seen.add(ch);
  }
  return stack.join('');
}
```

**Example:** `removeDuplicateLetters('cbacdcbc')` → `'acdb'`

### 87. Multiply a String Number by 2
```javascript
function doubleStringNumber(numStr) {
  return addStrings(numStr, numStr);
}
```

**Example:** `doubleStringNumber('123')` → `'246'`

---

## Arrays

### 88. Find the Largest Number in an Array
```javascript
function findLargest(arr) {
  return arr.reduce((max, n) => (n > max ? n : max), arr[0]);
}
```

**Explanation:** `reduce` avoids call-stack issues that `Math.max(...arr)` can hit on huge arrays.

**Example:** `findLargest([3, 7, 2, 9, 4])` → `9`

### 89. Find the Second Largest Number
```javascript
function secondLargest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique[1];
}
```

**Example:** `secondLargest([3, 7, 2, 9, 4])` → `7`

### 90. Remove Duplicates from an Array
```javascript
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
```

**Example:** `removeDuplicates([1,2,2,3,3,3])` → `[1,2,3]`

### 91. Flatten a Nested Array
```javascript
function flatten(arr) {
  return arr.reduce(
    (flat, item) => flat.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );
}
```

**Example:** `flatten([1,[2,[3,4],5]])` → `[1,2,3,4,5]`

### 92. Find Missing Number in a Sequence (1 to n)
```javascript
function findMissing(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
```

**Example:** `findMissing([1,2,4,5], 5)` → `3`

### 93. Two Sum
```javascript
function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(arr[i], i);
  }
  return [];
}
```

**Example:** `twoSum([2,7,11,15], 9)` → `[0,1]`

### 94. Chunk an Array into Groups of Size N
```javascript
function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
```

**Example:** `chunkArray([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]`

### 95. Rotate an Array by K Positions
```javascript
function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n;
  return [...arr.slice(-k), ...arr.slice(0, n - k)];
}
```

**Example:** `rotateArray([1,2,3,4,5], 2)` → `[4,5,1,2,3]`

### 96. Find Intersection of Two Arrays
```javascript
function intersection(a, b) {
  const setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}
```

**Example:** `intersection([1,2,3],[2,3,4])` → `[2,3]`

### 97. Move All Zeros to the End
```javascript
function moveZeros(arr) {
  const nonZeros = arr.filter(n => n !== 0);
  const zeros = arr.length - nonZeros.length;
  return [...nonZeros, ...Array(zeros).fill(0)];
}
```

**Example:** `moveZeros([0,1,0,3,12])` → `[1,3,12,0,0]`

### 98. Find Pairs with a Given Sum
```javascript
function findPairs(arr, sum) {
  const seen = new Set();
  const pairs = [];
  for (const n of arr) {
    const complement = sum - n;
    if (seen.has(complement)) pairs.push([complement, n]);
    seen.add(n);
  }
  return pairs;
}
```

**Example:** `findPairs([1,5,7,-1,5], 6)` → `[[1,5],[7,-1],[1,5]]`

### 99. Bubble Sort
```javascript
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    }
  }
  return a;
}
```

**Example:** `bubbleSort([5,3,8,1])` → `[1,3,5,8]`

### 100. Quick Sort
```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const [pivot, ...rest] = arr;
  const left = rest.filter(n => n < pivot);
  const right = rest.filter(n => n >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

**Example:** `quickSort([5,3,8,1])` → `[1,3,5,8]`

### 101. Binary Search
```javascript
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

**Explanation:** Requires a sorted array; halves the search space each iteration.

**Example:** `binarySearch([1,3,5,7,9], 7)` → `3`

### 102. Find the Maximum Subarray Sum (Kadane's Algorithm)
```javascript
function maxSubArraySum(arr) {
  let maxSoFar = arr[0], maxEndingHere = arr[0];
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}
```

**Example:** `maxSubArraySum([-2,1,-3,4,-1,2,1,-5,4])` → `6`

### 103. Three Sum (Find All Triplets that Sum to Zero)
```javascript
function threeSum(arr) {
  const nums = [...arr].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        result.push([nums[i], nums[l], nums[r]]);
        while (nums[l] === nums[l + 1]) l++;
        while (nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return result;
}
```

**Example:** `threeSum([-1,0,1,2,-1,-4])` → `[[-1,-1,2],[-1,0,1]]`

### 104. Merge Two Sorted Arrays
```javascript
function mergeSorted(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    result.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  return [...result, ...a.slice(i), ...b.slice(j)];
}
```

**Example:** `mergeSorted([1,3,5], [2,4,6])` → `[1,2,3,4,5,6]`

### 105. Find the Union of Two Arrays
```javascript
function union(a, b) {
  return [...new Set([...a, ...b])];
}
```

**Example:** `union([1,2,3], [3,4,5])` → `[1,2,3,4,5]`

### 106. Find the Majority Element (Boyer-Moore Voting)
```javascript
function majorityElement(arr) {
  let count = 0, candidate = null;
  for (const n of arr) {
    if (count === 0) candidate = n;
    count += n === candidate ? 1 : -1;
  }
  return candidate;
}
```

**Explanation:** Finds the element appearing more than n/2 times in O(n) time, O(1) space.

**Example:** `majorityElement([2,2,1,1,1,2,2])` → `2`

### 107. Find Both Missing and Duplicate Number
```javascript
function findMissingAndDuplicate(arr) {
  const n = arr.length;
  const seen = new Set();
  let duplicate = null;
  let sum = 0;
  for (const num of arr) {
    if (seen.has(num)) duplicate = num;
    seen.add(num);
    sum += num;
  }
  const expectedSum = (n * (n + 1)) / 2;
  const missing = expectedSum - (sum - duplicate);
  return { missing, duplicate };
}
```

**Example:** `findMissingAndDuplicate([1,2,2,4])` → `{missing: 3, duplicate: 2}`

### 108. Find the Equilibrium Index
```javascript
function equilibriumIndex(arr) {
  const total = arr.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (leftSum === total - leftSum - arr[i]) return i;
    leftSum += arr[i];
  }
  return -1;
}
```

**Example:** `equilibriumIndex([-7,1,5,2,-4,3,0])` → `3`

### 109. Rearrange Positive and Negative Numbers Alternately
```javascript
function rearrangeAlternate(arr) {
  const pos = arr.filter(n => n >= 0);
  const neg = arr.filter(n => n < 0);
  const result = [];
  let i = 0, j = 0;
  while (i < pos.length || j < neg.length) {
    if (i < pos.length) result.push(pos[i++]);
    if (j < neg.length) result.push(neg[j++]);
  }
  return result;
}
```

**Example:** `rearrangeAlternate([1,-2,3,-4,5])` → `[1,-2,3,-4,5]`

### 110. Find the Longest Consecutive Sequence
```javascript
function longestConsecutive(arr) {
  const set = new Set(arr);
  let longest = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let length = 1;
      while (set.has(n + length)) length++;
      longest = Math.max(longest, length);
    }
  }
  return longest;
}
```

**Example:** `longestConsecutive([100,4,200,1,3,2])` → `4` (`1,2,3,4`)

### 111. Find a Peak Element
```javascript
function findPeakElement(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] > arr[mid + 1]) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

**Explanation:** A peak is greater than its neighbors; binary search finds one in O(log n).

**Example:** `findPeakElement([1,2,3,1])` → `2` (index of value `3`)

### 112. Merge Overlapping Intervals
```javascript
function mergeIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1];
    if (sorted[i][0] <= last[1]) last[1] = Math.max(last[1], sorted[i][1]);
    else result.push(sorted[i]);
  }
  return result;
}
```

**Example:** `mergeIntervals([[1,3],[2,6],[8,10],[15,18]])` → `[[1,6],[8,10],[15,18]]`

### 113. Find Minimum in a Rotated Sorted Array
```javascript
function findMinRotated(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] > arr[hi]) lo = mid + 1;
    else hi = mid;
  }
  return arr[lo];
}
```

**Example:** `findMinRotated([4,5,6,7,0,1,2])` → `0`

### 114. Search in a Rotated Sorted Array
```javascript
function searchRotated(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[lo] <= arr[mid]) {
      if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
```

**Example:** `searchRotated([4,5,6,7,0,1,2], 0)` → `4`

### 115. Generate All Subsets (Power Set)
```javascript
function powerSet(arr) {
  return arr.reduce((subsets, n) => subsets.concat(subsets.map(s => [...s, n])), [[]]);
}
```

**Example:** `powerSet([1,2])` → `[[],[1],[2],[1,2]]`

### 116. Generate All Permutations of an Array
```javascript
function permuteArray(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  arr.forEach((n, i) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of permuteArray(rest)) result.push([n, ...p]);
  });
  return result;
}
```

**Example:** `permuteArray([1,2,3])` → `[[1,2,3],[1,3,2],[2,1,3],...]`

### 117. Trapping Rain Water
```javascript
function trapRainWater(heights) {
  let left = 0, right = heights.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (heights[left] < heights[right]) {
      leftMax = Math.max(leftMax, heights[left]);
      water += leftMax - heights[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, heights[right]);
      water += rightMax - heights[right];
      right--;
    }
  }
  return water;
}
```

**Example:** `trapRainWater([0,1,0,2,1,0,1,3,2,1,2,1])` → `6`

### 118. Product of Array Except Self
```javascript
function productExceptSelf(arr) {
  const n = arr.length;
  const result = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) { result[i] = left; left *= arr[i]; }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) { result[i] *= right; right *= arr[i]; }
  return result;
}
```

**Explanation:** Computed without division, using prefix and suffix products.

**Example:** `productExceptSelf([1,2,3,4])` → `[24,12,8,6]`

### 119. Find the K Largest Elements
```javascript
function kLargest(arr, k) {
  return [...arr].sort((a, b) => b - a).slice(0, k);
}
```

**Example:** `kLargest([3,1,5,9,2], 2)` → `[9,5]`

### 120. Find K Closest Elements to a Target
```javascript
function kClosest(arr, target, k) {
  return [...arr]
    .sort((a, b) => Math.abs(a - target) - Math.abs(b - target))
    .slice(0, k)
    .sort((a, b) => a - b);
}
```

**Example:** `kClosest([1,2,3,4,5], 3, 2)` → `[2,3]`

### 121. Sort an Array of 0s, 1s, and 2s (Dutch National Flag)
```javascript
function sortColors(arr) {
  let low = 0, mid = 0, high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] === 0) { [arr[low], arr[mid]] = [arr[mid], arr[low]]; low++; mid++; }
    else if (arr[mid] === 1) mid++;
    else { [arr[mid], arr[high]] = [arr[high], arr[mid]]; high--; }
  }
  return arr;
}
```

**Example:** `sortColors([2,0,2,1,1,0])` → `[0,0,1,1,2,2]`

### 122. Find the Difference Between Two Arrays
```javascript
function arrayDifference(a, b) {
  const setB = new Set(b);
  return a.filter(x => !setB.has(x));
}
```

**Example:** `arrayDifference([1,2,3,4], [2,4])` → `[1,3]`

### 123. Check if an Array is Sorted
```javascript
function isSorted(arr) {
  return arr.every((val, i) => i === 0 || arr[i - 1] <= val);
}
```

**Example:** `isSorted([1,2,3,4])` → `true`

### 124. Find All Duplicate Elements in an Array
```javascript
function findDuplicates(arr) {
  const seen = new Set();
  const dupes = new Set();
  for (const n of arr) {
    if (seen.has(n)) dupes.add(n);
    seen.add(n);
  }
  return [...dupes];
}
```

**Example:** `findDuplicates([1,2,3,2,4,3])` → `[2,3]`

### 125. Find the Smallest Missing Positive Integer
```javascript
function firstMissingPositive(arr) {
  const set = new Set(arr);
  let i = 1;
  while (set.has(i)) i++;
  return i;
}
```

**Example:** `firstMissingPositive([3,4,-1,1])` → `2`

### 126. Shuffle an Array (Fisher-Yates)
```javascript
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
```

**Explanation:** Produces an unbiased random permutation in O(n) time.

**Example:** `shuffle([1,2,3,4,5])` → e.g. `[3,1,5,2,4]`

### 127. Rotate a Matrix 90 Degrees (Clockwise)
```javascript
function rotateMatrix(matrix) {
  const n = matrix.length;
  const result = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[j][n - 1 - i] = matrix[i][j];
    }
  }
  return result;
}
```

**Example:** `rotateMatrix([[1,2],[3,4]])` → `[[3,1],[4,2]]`

### 128. Merge Sort
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const merged = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    merged.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...merged, ...left.slice(i), ...right.slice(j)];
}
```

**Example:** `mergeSort([5,2,8,1,9])` → `[1,2,5,8,9]`

### 129. Insertion Sort
```javascript
function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
    a[j + 1] = key;
  }
  return a;
}
```

**Example:** `insertionSort([5,2,8,1,9])` → `[1,2,5,8,9]`

### 130. Selection Sort
```javascript
function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
    [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
}
```

**Example:** `selectionSort([5,2,8,1,9])` → `[1,2,5,8,9]`

### 131. Counting Sort
```javascript
function countingSort(arr) {
  const max = Math.max(...arr);
  const counts = Array(max + 1).fill(0);
  for (const n of arr) counts[n]++;
  const result = [];
  counts.forEach((count, val) => { for (let i = 0; i < count; i++) result.push(val); });
  return result;
}
```

**Example:** `countingSort([4,2,2,8,3,3,1])` → `[1,2,2,3,3,4,8]`

### 132. Find the Kth Smallest Element
```javascript
function kthSmallest(arr, k) {
  return [...arr].sort((a, b) => a - b)[k - 1];
}
```

**Example:** `kthSmallest([7,10,4,3,20,15], 3)` → `7`

### 133. Find Median of Two Sorted Arrays
```javascript
function findMedianSortedArrays(a, b) {
  const merged = [...a, ...b].sort((x, y) => x - y);
  const mid = Math.floor(merged.length / 2);
  return merged.length % 2 === 0 ? (merged[mid - 1] + merged[mid]) / 2 : merged[mid];
}
```

**Example:** `findMedianSortedArrays([1,3], [2])` → `2`

### 134. Container With Most Water
```javascript
function maxArea(heights) {
  let l = 0, r = heights.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, Math.min(heights[l], heights[r]) * (r - l));
    if (heights[l] < heights[r]) l++; else r--;
  }
  return max;
}
```

**Example:** `maxArea([1,8,6,2,5,4,8,3,7])` → `49`

### 135. Find Elements Appearing More Than N/3 Times
```javascript
function majorityElementII(arr) {
  let c1 = 0, c2 = 0, cand1 = null, cand2 = null;
  for (const n of arr) {
    if (cand1 === n) c1++;
    else if (cand2 === n) c2++;
    else if (c1 === 0) { cand1 = n; c1 = 1; }
    else if (c2 === 0) { cand2 = n; c2 = 1; }
    else { c1--; c2--; }
  }
  return [cand1, cand2].filter(c => arr.filter(n => n === c).length > arr.length / 3);
}
```

**Example:** `majorityElementII([1,1,1,3,3,2,2,2])` → `[1,2]`

### 136. Find a Subarray With a Given Sum (Non-negative Numbers)
```javascript
function subarrayWithSum(arr, target) {
  let start = 0, sum = 0;
  for (let end = 0; end < arr.length; end++) {
    sum += arr[end];
    while (sum > target && start < end) { sum -= arr[start]; start++; }
    if (sum === target) return arr.slice(start, end + 1);
  }
  return [];
}
```

**Example:** `subarrayWithSum([1,4,20,3,10,5], 33)` → `[20,3,10]`

### 137. Maximum Product Subarray
```javascript
function maxProductSubarray(arr) {
  let maxProd = arr[0], minProd = arr[0], result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const n = arr[i];
    const candidates = [n, maxProd * n, minProd * n];
    maxProd = Math.max(...candidates);
    minProd = Math.min(...candidates);
    result = Math.max(result, maxProd);
  }
  return result;
}
```

**Example:** `maxProductSubarray([2,3,-2,4])` → `6`

### 138. Merge K Sorted Arrays
```javascript
function mergeKSortedArrays(arrays) {
  return arrays.reduce((merged, arr) => mergeSorted(merged, arr), []);
}
function mergeSorted(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) result.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return [...result, ...a.slice(i), ...b.slice(j)];
}
```

**Example:** `mergeKSortedArrays([[1,4,5],[1,3,4],[2,6]])` → `[1,1,2,3,4,4,5,6]`

### 139. Longest Increasing Subsequence (Length)
```javascript
function lengthOfLIS(arr) {
  const tails = [];
  for (const n of arr) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1; else hi = mid;
    }
    tails[lo] = n;
  }
  return tails.length;
}
```

**Example:** `lengthOfLIS([10,9,2,5,3,7,101,18])` → `4`

### 140. Count Inversions in an Array
```javascript
function countInversions(arr) {
  let count = 0;
  function sort(a) {
    if (a.length <= 1) return a;
    const mid = Math.floor(a.length / 2);
    const left = sort(a.slice(0, mid));
    const right = sort(a.slice(mid));
    const merged = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) merged.push(left[i++]);
      else { merged.push(right[j++]); count += left.length - i; }
    }
    return [...merged, ...left.slice(i), ...right.slice(j)];
  }
  sort(arr);
  return count;
}
```

**Example:** `countInversions([2,4,1,3,5])` → `3`

### 141. Find Leaders in an Array
```javascript
function findLeaders(arr) {
  const leaders = [];
  let maxFromRight = -Infinity;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] > maxFromRight) { leaders.unshift(arr[i]); maxFromRight = arr[i]; }
  }
  return leaders;
}
```

**Explanation:** A leader is greater than every element to its right.

**Example:** `findLeaders([16,17,4,3,5,2])` → `[17,5,2]`

### 142. Maximum Sum Subarray of Fixed Size K
```javascript
function maxSumSubarrayK(arr, k) {
  let sum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    max = Math.max(max, sum);
  }
  return max;
}
```

**Example:** `maxSumSubarrayK([2,1,5,1,3,2], 3)` → `9`

### 143. Find All Subarrays with Sum Equal to K
```javascript
function subarraysWithSumK(arr, k) {
  const prefixCount = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of arr) {
    sum += n;
    count += prefixCount.get(sum - k) || 0;
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}
```

**Example:** `subarraysWithSumK([1,1,1], 2)` → `2`

### 144. Rearrange Array in Max-Min Form
```javascript
function maxMinArrange(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const result = [];
  let l = 0, r = sorted.length - 1;
  while (l <= r) {
    if (l !== r) result.push(sorted[r--], sorted[l++]);
    else result.push(sorted[l++]);
  }
  return result;
}
```

**Example:** `maxMinArrange([1,2,3,4,5])` → `[5,1,4,2,3]`

### 145. Three Sum Closest
```javascript
function threeSumClosest(arr, target) {
  const nums = [...arr].sort((a, b) => a - b);
  let closest = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (Math.abs(sum - target) < Math.abs(closest - target)) closest = sum;
      if (sum < target) l++;
      else if (sum > target) r--;
      else return sum;
    }
  }
  return closest;
}
```

**Example:** `threeSumClosest([-1,2,1,-4], 1)` → `2`

### 146. Next Permutation
```javascript
function nextPermutation(arr) {
  let i = arr.length - 2;
  while (i >= 0 && arr[i] >= arr[i + 1]) i--;
  if (i >= 0) {
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) j--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  let l = i + 1, r = arr.length - 1;
  while (l < r) { [arr[l], arr[r]] = [arr[r], arr[l]]; l++; r--; }
  return arr;
}
```

**Example:** `nextPermutation([1,2,3])` → `[1,3,2]`

### 147. Previous Permutation
```javascript
function previousPermutation(arr) {
  let i = arr.length - 2;
  while (i >= 0 && arr[i] <= arr[i + 1]) i--;
  if (i >= 0) {
    let j = arr.length - 1;
    while (arr[j] >= arr[i]) j--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  let l = i + 1, r = arr.length - 1;
  while (l < r) { [arr[l], arr[r]] = [arr[r], arr[l]]; l++; r--; }
  return arr;
}
```

**Example:** `previousPermutation([1,3,2])` → `[1,2,3]`

### 148. Wiggle Sort an Array
```javascript
function wiggleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    if ((i % 2 === 0) === (a[i] > a[i + 1])) {
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
    }
  }
  return a;
}
```

**Example:** `wiggleSort([3,5,2,1,6,4])` → `[3,5,1,6,2,4]` (pattern varies)

### 149. Best Time to Buy and Sell Stock (Single Transaction)
```javascript
function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    maxProfit = Math.max(maxProfit, p - minPrice);
  }
  return maxProfit;
}
```

**Example:** `maxProfit([7,1,5,3,6,4])` → `5`

### 150. Best Time to Buy and Sell Stock II (Multiple Transactions)
```javascript
function maxProfitMultiple(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
}
```

**Example:** `maxProfitMultiple([7,1,5,3,6,4])` → `7`

### 151. Find Common Elements in Three Sorted Arrays
```javascript
function commonInThreeSorted(a, b, c) {
  let i = 0, j = 0, k = 0;
  const result = [];
  while (i < a.length && j < b.length && k < c.length) {
    if (a[i] === b[j] && b[j] === c[k]) { result.push(a[i]); i++; j++; k++; }
    else if (a[i] <= b[j] && a[i] <= c[k]) i++;
    else if (b[j] <= a[i] && b[j] <= c[k]) j++;
    else k++;
  }
  return result;
}
```

**Example:** `commonInThreeSorted([1,5,10,20], [6,7,10,20], [3,8,10,20])` → `[10,20]`

### 152. Find the Row with Maximum Number of 1s in a Binary Matrix
```javascript
function rowWithMaxOnes(matrix) {
  let maxRow = 0, maxCount = -1;
  matrix.forEach((row, i) => {
    const count = row.filter(v => v === 1).length;
    if (count > maxCount) { maxCount = count; maxRow = i; }
  });
  return maxRow;
}
```

**Example:** `rowWithMaxOnes([[0,1],[1,1]])` → `1`

### 153. Search in a 2D Sorted Matrix
```javascript
function searchMatrix(matrix, target) {
  if (!matrix.length) return false;
  let row = 0, col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] > target) col--;
    else row++;
  }
  return false;
}
```

**Example:** `searchMatrix([[1,4,7],[2,5,8],[3,6,9]], 5)` → `true`

### 154. Set Matrix Zeroes
```javascript
function setZeroes(matrix) {
  const rows = new Set(), cols = new Set();
  matrix.forEach((row, i) => row.forEach((val, j) => { if (val === 0) { rows.add(i); cols.add(j); } }));
  matrix.forEach((row, i) => row.forEach((_, j) => { if (rows.has(i) || cols.has(j)) matrix[i][j] = 0; }));
  return matrix;
}
```

**Example:** `setZeroes([[1,1,1],[1,0,1],[1,1,1]])` → `[[1,0,1],[0,0,0],[1,0,1]]`

### 155. Spiral Traversal of a Matrix
```javascript
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    if (top <= bottom) { for (let i = right; i >= left; i--) result.push(matrix[bottom][i]); bottom--; }
    if (left <= right) { for (let i = bottom; i >= top; i--) result.push(matrix[i][left]); left++; }
  }
  return result;
}
```

**Example:** `spiralOrder([[1,2,3],[4,5,6],[7,8,9]])` → `[1,2,3,6,9,8,7,4,5]`

### 156. Find Elements Not Appearing in the Array (In-Place Marking)
```javascript
function findDisappearedNumbers(arr) {
  const a = [...arr];
  for (const n of a) {
    const idx = Math.abs(n) - 1;
    if (a[idx] > 0) a[idx] = -a[idx];
  }
  return a.reduce((res, v, i) => { if (v > 0) res.push(i + 1); return res; }, []);
}
```

**Example:** `findDisappearedNumbers([4,3,2,7,8,2,3,1])` → `[5,6]`

### 157. Count Pairs with Given Difference
```javascript
function countPairsWithDiff(arr, diff) {
  const set = new Set(arr);
  let count = 0;
  for (const n of arr) if (set.has(n + diff)) count++;
  return count;
}
```

**Example:** `countPairsWithDiff([1,5,3,4,2], 2)` → `3`

### 158. Sort an Array According to Another Array's Order
```javascript
function relativeSort(arr1, arr2) {
  const rank = {};
  arr2.forEach((n, i) => rank[n] = i);
  return [...arr1].sort((a, b) => {
    const ra = rank[a] ?? Infinity, rb = rank[b] ?? Infinity;
    return ra !== rb ? ra - rb : a - b;
  });
}
```

**Example:** `relativeSort([2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6])` → `[2,2,2,1,4,3,3,9,6,7,19]`

### 159. Maximum Circular Subarray Sum
```javascript
function maxCircularSubarraySum(arr) {
  const kadane = a => {
    let max = a[0], cur = a[0];
    for (let i = 1; i < a.length; i++) { cur = Math.max(a[i], cur + a[i]); max = Math.max(max, cur); }
    return max;
  };
  const total = arr.reduce((a, b) => a + b, 0);
  const maxNormal = kadane(arr);
  const minSub = kadane(arr.map(n => -n));
  const maxWrap = total + minSub;
  return maxWrap === 0 ? maxNormal : Math.max(maxNormal, maxWrap);
}
```

**Example:** `maxCircularSubarraySum([5,-3,5])` → `10`

### 160. Minimum Number of Jumps to Reach the End
```javascript
function minJumps(arr) {
  if (arr.length <= 1) return 0;
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    farthest = Math.max(farthest, i + arr[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
      if (curEnd >= arr.length - 1) break;
    }
  }
  return jumps;
}
```

**Example:** `minJumps([2,3,1,1,4])` → `2`

### 161. Check if Array Can Be Divided into Pairs with Sum Divisible by K
```javascript
function canArrangePairs(arr, k) {
  const remCount = {};
  for (const n of arr) {
    const rem = ((n % k) + k) % k;
    remCount[rem] = (remCount[rem] || 0) + 1;
  }
  for (const rem in remCount) {
    const complement = (k - rem) % k;
    if (remCount[rem] !== remCount[complement]) return false;
  }
  return true;
}
```

**Example:** `canArrangePairs([1,2,3,4,5,6], 7)` → `true`

### 162. Smallest Subarray with Sum Greater Than a Given Value
```javascript
function smallestSubarrayWithSum(arr, target) {
  let l = 0, sum = 0, minLen = Infinity;
  for (let r = 0; r < arr.length; r++) {
    sum += arr[r];
    while (sum > target) {
      minLen = Math.min(minLen, r - l + 1);
      sum -= arr[l];
      l++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
```

**Example:** `smallestSubarrayWithSum([1,4,45,6,0,19], 51)` → `3`

### 163. Rearrange Array So arr[i] Becomes arr[arr[i]]
```javascript
function rearrangeArrIndex(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) arr[i] += (arr[arr[i]] % n) * n;
  for (let i = 0; i < n; i++) arr[i] = Math.floor(arr[i] / n);
  return arr;
}
```

**Example:** `rearrangeArrIndex([3,2,0,1])` → `[1,0,3,2]`

### 164. Find the Duplicate Number (Floyd's Cycle Detection)
```javascript
function findDuplicateFloyd(arr) {
  let slow = arr[0], fast = arr[0];
  do { slow = arr[slow]; fast = arr[arr[fast]]; } while (slow !== fast);
  slow = arr[0];
  while (slow !== fast) { slow = arr[slow]; fast = arr[fast]; }
  return slow;
}
```

**Example:** `findDuplicateFloyd([1,3,4,2,2])` → `2`

### 165. Maximum Sum of Non-Adjacent Elements (House Robber)
```javascript
function houseRobber(arr) {
  let prev = 0, curr = 0;
  for (const n of arr) {
    [prev, curr] = [curr, Math.max(curr, prev + n)];
  }
  return curr;
}
```

**Example:** `houseRobber([2,7,9,3,1])` → `12`

### 166. Count Subarrays with Exactly K Odd Numbers
```javascript
function subarraysWithKOdds(arr, k) {
  const atMost = (limit) => {
    let l = 0, count = 0, odds = 0;
    for (let r = 0; r < arr.length; r++) {
      if (arr[r] % 2 !== 0) odds++;
      while (odds > limit) { if (arr[l] % 2 !== 0) odds--; l++; }
      count += r - l + 1;
    }
    return count;
  };
  return atMost(k) - atMost(k - 1);
}
```

**Example:** `subarraysWithKOdds([1,1,2,1,1], 3)` → `2`

### 167. Largest Rectangle in a Histogram
```javascript
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] >= h) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}
```

**Example:** `largestRectangleArea([2,1,5,6,2,3])` → `10`

### 168. Rotate an Array In-Place (Juggling Algorithm)
```javascript
function rotateInPlace(arr, k) {
  const n = arr.length;
  k %= n;
  const gcdVal = (a, b) => (b === 0 ? a : gcdVal(b, a % b));
  const sets = gcdVal(n, k);
  for (let i = 0; i < sets; i++) {
    let temp = arr[i], j = i;
    while (true) {
      const d = (j + k) % n;
      if (d === i) break;
      arr[j] = arr[d];
      j = d;
    }
    arr[j] = temp;
  }
  return arr;
}
```

**Example:** `rotateInPlace([1,2,3,4,5,6,7], 3)` → `[5,6,7,1,2,3,4]`

### 169. Find Second Smallest and Second Largest in One Pass
```javascript
function secondSmallestAndLargest(arr) {
  let min1 = Infinity, min2 = Infinity, max1 = -Infinity, max2 = -Infinity;
  for (const n of arr) {
    if (n < min1) { min2 = min1; min1 = n; } else if (n < min2 && n !== min1) min2 = n;
    if (n > max1) { max2 = max1; max1 = n; } else if (n > max2 && n !== max1) max2 = n;
  }
  return { secondSmallest: min2, secondLargest: max2 };
}
```

**Example:** `secondSmallestAndLargest([1,2,4,7,7,5])` → `{secondSmallest: 2, secondLargest: 5}`

### 170. Check if One Array Is a Subset of Another
```javascript
function isSubsetArray(arr1, arr2) {
  const set1 = new Set(arr1);
  return arr2.every(n => set1.has(n));
}
```

**Example:** `isSubsetArray([1,2,3,4,5], [2,4])` → `true`

### 171. Find Missing Ranges Between Bounds
```javascript
function findMissingRanges(nums, lower, upper) {
  const result = [];
  let prev = lower - 1;
  for (let i = 0; i <= nums.length; i++) {
    const cur = i < nums.length ? nums[i] : upper + 1;
    if (cur - prev >= 2) {
      result.push(cur - prev === 2 ? `${prev + 1}` : `${prev + 1}->${cur - 1}`);
    }
    prev = cur;
  }
  return result;
}
```

**Example:** `findMissingRanges([0,1,3,50,75], 0, 99)` → `['2','4->49','51->74','76->99']`

### 172. Find Pythagorean Triplets in an Array
```javascript
function hasPythagoreanTriplet(arr) {
  const squares = arr.map(n => n * n).sort((a, b) => a - b);
  for (let i = squares.length - 1; i >= 2; i--) {
    let l = 0, r = i - 1;
    while (l < r) {
      if (squares[l] + squares[r] === squares[i]) return true;
      if (squares[l] + squares[r] < squares[i]) l++; else r--;
    }
  }
  return false;
}
```

**Example:** `hasPythagoreanTriplet([3,1,4,6,5])` → `true` (3,4,5)

### 173. Segregate Even and Odd Numbers
```javascript
function segregateEvenOdd(arr) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    while (arr[l] % 2 === 0 && l < r) l++;
    while (arr[r] % 2 !== 0 && l < r) r--;
    if (l < r) { [arr[l], arr[r]] = [arr[r], arr[l]]; l++; r--; }
  }
  return arr;
}
```

**Example:** `segregateEvenOdd([12,34,45,9,8,90,3])` → `[12,34,90,8,45,9,3]` (order may vary)

### 174. Maximum Average Subarray of Size K
```javascript
function findMaxAverage(arr, k) {
  let sum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    max = Math.max(max, sum);
  }
  return max / k;
}
```

**Example:** `findMaxAverage([1,12,-5,-6,50,3], 4)` → `12.75`

### 175. Merge Two Arrays into an Alternating Sequence
```javascript
function alternateMerge(a, b) {
  const result = [];
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (i < a.length) result.push(a[i]);
    if (i < b.length) result.push(b[i]);
  }
  return result;
}
```

**Example:** `alternateMerge([1,3,5], [2,4,6,8])` → `[1,2,3,4,5,6,8]`

### 176. Find Elements That Appear Exactly Once (Others Appear Twice)
```javascript
function findSingleNumber(arr) {
  return arr.reduce((xor, n) => xor ^ n, 0);
}
```

**Explanation:** XOR cancels out pairs, leaving only the number that appears once.

**Example:** `findSingleNumber([4,1,2,1,2])` → `4`

### 177. Compute the Running Sum of an Array
```javascript
function runningSum(arr) {
  const result = [];
  let sum = 0;
  for (const n of arr) { sum += n; result.push(sum); }
  return result;
}
```

**Example:** `runningSum([1,2,3,4])` → `[1,3,6,10]`

---

## Numbers & Math

### 178. Find Factorial of a Number
```javascript
function factorial(n) {
  if (n < 0) return null;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
```

**Explanation:** Iterative approach avoids call-stack depth issues with large `n`.

**Example:** `factorial(5)` → `120`

### 179. Check if a Number is Prime
```javascript
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

**Example:** `isPrime(17)` → `true`

### 180. Fibonacci Sequence (up to n terms)
```javascript
function fibonacci(n) {
  const seq = [0, 1];
  for (let i = 2; i < n; i++) seq.push(seq[i - 1] + seq[i - 2]);
  return seq.slice(0, n);
}
```

**Example:** `fibonacci(6)` → `[0, 1, 1, 2, 3, 5]`

### 181. FizzBuzz
```javascript
function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push('FizzBuzz');
    else if (i % 3 === 0) out.push('Fizz');
    else if (i % 5 === 0) out.push('Buzz');
    else out.push(String(i));
  }
  return out;
}
```

**Example:** `fizzBuzz(5)` → `['1','2','Fizz','4','Buzz']`

### 182. Check if a Number is an Armstrong Number
```javascript
function isArmstrong(n) {
  const digits = String(n).split('');
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(+d, power), 0);
  return sum === n;
}
```

**Example:** `isArmstrong(153)` → `true` (1³+5³+3³ = 153)

### 183. Greatest Common Divisor (GCD)
```javascript
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
```

**Example:** `gcd(48, 18)` → `6`

### 184. Least Common Multiple (LCM)
```javascript
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
```

**Example:** `lcm(4, 6)` → `12`

### 185. Check if a Number is a Power of Two
```javascript
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
```

**Example:** `isPowerOfTwo(16)` → `true`

### 186. Sum of Digits
```javascript
function sumOfDigits(n) {
  return String(Math.abs(n)).split('').reduce((a, d) => a + Number(d), 0);
}
```

**Example:** `sumOfDigits(1234)` → `10`

### 187. Reverse an Integer
```javascript
function reverseInt(n) {
  const sign = Math.sign(n);
  return sign * Number(String(Math.abs(n)).split('').reverse().join(''));
}
```

**Example:** `reverseInt(-1234)` → `-4321`

### 188. Check Perfect Number
```javascript
function isPerfectNumber(n) {
  let sum = 0;
  for (let i = 1; i < n; i++) if (n % i === 0) sum += i;
  return sum === n;
}
```

**Example:** `isPerfectNumber(28)` → `true` (1+2+4+7+14=28)

---

## Objects & Data Structures

### 189. Deep Clone an Object
```javascript
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// For objects with functions/dates/Maps, use structuredClone(obj) instead.
```

**Example:** `deepClone({a:1, b:{c:2}})` → new object, independent of original

### 190. Merge Two Objects
```javascript
function mergeObjects(a, b) {
  return { ...a, ...b };
}
```

**Example:** `mergeObjects({a:1}, {b:2})` → `{a:1, b:2}`

### 191. Check if an Object is Empty
```javascript
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
```

**Example:** `isEmptyObject({})` → `true`

### 192. Group Array of Objects by a Property
```javascript
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    (acc[group] = acc[group] || []).push(item);
    return acc;
  }, {});
}
```

**Example:** `groupBy([{type:'a'},{type:'b'},{type:'a'}], 'type')` → `{a:[...], b:[...]}`

### 193. Implement a Simple Stack
```javascript
class Stack {
  #items = [];
  push(item) { this.#items.push(item); }
  pop() { return this.#items.pop(); }
  peek() { return this.#items[this.#items.length - 1]; }
  isEmpty() { return this.#items.length === 0; }
}
```

**Example:** `const s = new Stack(); s.push(1); s.push(2); s.pop(); // 2`

### 194. Implement a Simple Queue
```javascript
class Queue {
  #items = [];
  enqueue(item) { this.#items.push(item); }
  dequeue() { return this.#items.shift(); }
  front() { return this.#items[0]; }
  isEmpty() { return this.#items.length === 0; }
}
```

**Example:** `const q = new Queue(); q.enqueue(1); q.enqueue(2); q.dequeue(); // 1`

### 195. Check Balanced Parentheses
```javascript
function isBalanced(str) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of str) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (')]}'.includes(ch)) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}
```

**Example:** `isBalanced('{[()]}')` → `true`

---

## Functions & Higher-Order Concepts

### 196. Debounce Function
```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**Explanation:** Delays execution until the calling stops for `delay` ms — useful for search inputs, resize handlers.

### 197. Throttle Function
```javascript
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

**Explanation:** Ensures `fn` runs at most once per `limit` ms — useful for scroll handlers.

### 198. Currying a Function
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, [...args, ...more]);
  };
}
// const add = curry((a, b, c) => a + b + c);
// add(1)(2)(3) === 6
```

**Example:** `curry((a,b,c) => a+b+c)(1)(2)(3)` → `6`

### 199. Implement a Simple `memoize` Function
```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

**Explanation:** Caches results of expensive calls by their arguments, so repeat calls skip recomputation.

### 200. Implement Your Own `Array.prototype.map`
```javascript
function customMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}
```

**Example:** `customMap([1,2,3], x => x * 2)` → `[2,4,6]`

---

*This collection contains 200 distinct JavaScript coding problems spanning strings, arrays, numbers, objects, data structures, and functional patterns for interview practice.*
