# nano-uid

A tiny, speakable unique ID generator.

## Install

```shell
$ npm install nano-uid
```

## Usage

Use `uid.generate(length, callback)` to generate ids.

By default, `nano-uid` uses an in-memory store to make sure it doesn't create duplicates.

```javascript
var uidFactory = require('nano-uid');
var uid = uidFactory();

uid.generate(5, function (err, id) {
  // id will have a length of 5 (or more, if you're out of 5 letter ids!)
  console.log(id);
});
```

### Bring-your-own memory

If you'd like persistent memory storage, you'll need to provide your own *memorizer*. The default, in-memory memorizer can be found at [lib/memorizer.js] – the API is very simple!

### Entropy

If you want no-so speakable ids you can set `uid.entropy` to some number (0-10) is a good range. This will introduce randomness to the generation.

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE