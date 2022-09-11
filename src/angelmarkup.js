/*
ANGELMARKUP.JS by Alexander Abraham, a.k.a. "Angel Dollface".
Licensed under the MIT license.
*/

/// Converts a map into a JSON string.
export function toJSON(subject){
    var jsonObject = Object.fromEntries(subject);
    var result = JSON.stringify(jsonObject);
    return result;
}

/// Converts a map into a YAML string
/// and joins each line with "filler".
export function toYAML(subject, filler) {
    var resultList = [];
    for (var [key,value] of subject) {
        var itemString = '"' + key + '": "' + value + '"';
        resultList.push(itemString);
    }
    let result = resultList.join(filler);
    return result;
}

/// Converts a map into a TOML string
/// and joins each line with "filler".
export function toTOML(subject, filler) {
    var resultList = [];
    for (var [key,value] of subject) {
        var itemString = '"' + key + '" = "' + value + '"';
        resultList.push(itemString);
    }
    let result = resultList.join(filler);
    return result;
}

/// Converts a map into an AML string
/// and joins each line with "filler".
export function toAML(subject, filler) {
    var resultList = [];
    for (var [key,value] of subject) {
        var itemString = "'" + key + "' => '" + value + "'";
        resultList.push(itemString);
    }
    let result = resultList.join(filler);
    return result;
}

/// Checks if list "subject" has the index "index".
export function hasIndex(subject, index) {
    let result = false;
    if (index in subject) {
        result = true;
    }
    else {}
    return result;
}

export class Token {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
    toString(){
        var stringRep = this.name + ' : ' + this.value;
        return stringRep;
    }
}

/// A map for tokens the lexer recognises.
export function patternPool() {
    let pool = new Map();
    pool.set("ENTITY", new RegExp("\'(.*)\'"));
    pool.set("ASSIGN", new RegExp("(\=\>)"));
    pool.set("COMMENT", new RegExp("\#(.*)"));
    return pool;
}

/// The actual lexing function: Iterates through all lines
/// and then through all characters and builds a list of tokens
/// while doing so and finally returns this list.
export function lexSrc(sourceCode, pool){
    var lines = sourceCode.split('\n');
    var result = [];
    for (var i = 0; i < lines.length; i++){
        var charList = lines[i].split('');
        var newCharList = [];
        for (var x = 0; x < charList.length; x++) {
            newCharList.push(charList[x]);
            var collectedChars = newCharList.join('');
            for (var [key, value] of pool) {
                if (value.test(collectedChars) === true){
                    newCharList = [];
                    var tokenValue = collectedChars.match(value)[1];
                    var tokenName = key;
                    var token = new Token(tokenName, tokenValue);
                    result.push(token);
                }
                else {}
            }
        }
        
    }
    return result;
}

/// Serializes an AML string into a map.
export function serializeAML(src) {
    var result = new Map();
    var pool = patternPool();
    var tokens = lexSrc(src, pool);
    for (var i = 0; i < tokens.length; i ++) {
        if (tokens[i].name === 'ASSIGN'){
            var lastIndex = i-1;
            var nextIndex = i+1;
            if (lastIndex < tokens.length && nextIndex < tokens.length) {
                var key = tokens[lastIndex].value;
                var value = tokens[nextIndex].value;
                result.set(key,value);
            }
            else {
                console.log('Syntax error!');
            }
        }
        else if (tokens[i].name === 'COMMENT') {}
        else {}
    }
    return result;
}

// Tests all of the functions above.
export function testAll(){
    var testMap = new Map();
    testMap.set('name', 'aml');
    testMap.set('version', '1.0.0');
    var testArray = ['a', 'b', 'c'];
    var amlTestStringPos = "'name' => 'aml'";
    var amlTestStringNeg = "'name' => ";
    var yamlString = toYAML(testMap, '\n');
    var jsonString = toJSON(testMap);
    var tomlString = toTOML(testMap, '\n');
    var amlString = toAML(testMap, '\n');
    var negTest = hasIndex(testArray, 3);
    var posTest = hasIndex(testArray, 2);
    var testToken = new Token('ASSIGN', '=>');
    var tokens = lexSrc(amlTestStringPos, patternPool());
    var serializedPos = serializeAML(amlTestStringPos);
    var serializedNeg = serializeAML(amlTestStringNeg);
    console.log(yamlString);
    console.log(jsonString);
    console.log(tomlString);
    console.log(amlString);
    console.log(negTest);
    console.log(posTest);
    console.log(testToken.name);
    console.log(testToken.value);
    console.log(tokens);
    console.log(serializedPos);
    console.log(serializedNeg);
}

// Exporting all functions
// and classes.
export default {
    toYAML,
    toTOML,
    toAML,
    hasIndex,
    Token,
    patternPool,
    lexSrc,
    serializeAML,
    toJSON,
    testAll
}