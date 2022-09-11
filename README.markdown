# ANGELMARKUP.JS  :performing_arts: :guitar: :ribbon:

![GitHub CI](https://github.com/angeldollface/angelmarkup.js/actions/workflows/node.yml/badge.svg)

***Simple data storage with no drama in Javascript. :performing_arts: :guitar: :ribbon:***

## ABOUT :books:

Some months ago, I wrote a [framework for blog-oriented static-site generation in Rust](https://github.com/angeldollface/acid) and needed a data format that permits comments. Everything else seemed too complicated, so I wrote a compiler and parser for my own data format, [also in Rust](https://github.com/angeldollface/angelmarkup). This is my re-implementation of the compiler for this data format in Javascript. The data format is called ***Angel Markup*** which is a simplified form of `JSON` that allows comments.

# USAGE :hammer:

### Use ***Angelmarkup.js*** in a Node.js project

To use ***Angelmarkup.js*** in a Node.js project, run this command in your project's root directory:

```bash
$ npm install --save-dev angelmarkup
```

Be sure to also add the `"type":"module"` flag to your project's manifest, `package.json`.

### APIs

***Angelmarkup.js*** offers the following functions:

- `toYAML(subject, filler)`: Converts a map into a YAML string and joins each line with "filler".
- `toTOML(subject, filler)`: Converts a map into a TOML string and joins each line with "filler".
- `toAML(subject, filler)`: Converts a map into an AML string and joins each line with "filler".
- `toJSON(subject)`: Converts a map into a JSON string.
- `hasIndex(subject, index)`: Checks if the list "subject" has the index "index".
- `class Token(name, value)`: A class to represent a token. `name` represents the token's name and `value` represents the parsed string slice corresponding to a regular expression for that type of token.
- `patternPool()`: A function that holds the regular expression patterns that represent statements ***Angelmarkup.js*** understands.
- `lexSrc(source, pool)`: A lexing function to take a string, run my algorithm for lexing, and return a list of tokens. (I deliberately made the arguments customizable for easy re-use.)
- `serializeAML`: A function that parses ***Angel Markup*** statements and serializes them into a map. 
- `testAll()`: Tests all of the above.

### Angel Markup Syntax

***Angel Markup*** is very simple. It is similar to `JSON` and only recognizes one data type. This data type is a string. Here's a small example.

```text
# This is a comment.
# Assigns the value "name" field, the name "max".
'name' => 'max'
```

### Example

Here's a small example:

- 1.) Initialize a new Node.js project with the following command in a directory of your choosing:

```bash
$ npm init -y 
```

- 2.) Install ***Angelmarkup.js*** as a dependency:

```bash
$ npm install --save-dev angelmarkup
```

- 3.) Be sure to add this line to your project's `package.json`:

```JSON
"type":"module",
```

- 4.) Create your `index.js` file and put the following code inside it:

```js
// index.js
import angelmarkup from 'angelmarkup';

function main(){
  // A string of an AML key-value pair.
  var amlTestString = "'name' => 'aml'";
  // The parsed string as a map.
  var serialized = angelmarkup.serializeAML(amlTestString);
  // Printing out the resulting map.
  console.log(serialized);
}

// Calling the "main" function.
main();
```

- 5.) Run the project:

```bash
$ node .
```

- 6.) Should print out this:

```text
Map(1) { 'name' => 'aml' }
```

- 7.) If you're still not sure how to use this, check out the `example` project in the `example` folder.

## CHANGELOG :black_nib:

### Version 1.0.0

- Initial release.
- Upload to GitHub.
- Upload to NPM.

### Version 1.1.0

- Minor fixes.
- Fixed typos.
- Updated documentation.

### Version 1.2.0

- Updated documentation.
- Fixed ***ALL*** typos.
- ***VASTLY*** improved the lexer and parser.
- Fixed the "messy string" bug.

### Version 1.3.0

- Updated documentation.
- Added a `toJSON` method.
- Updated methods for the other formats.

### Version 1.4.0

- Updated documentation.
- Published and uploaded under my new name.

## NOTE :scroll:
- *Angelmarkup.js :performing_arts: :guitar: :ribbon:* by Alexander Abraham :black_heart: a.k.a. *"Angel Dollface" :dolls: :ribbon:*
- Licensed under the MIT license.
