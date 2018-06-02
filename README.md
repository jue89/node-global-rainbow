# Global Rainbow 🌈

This module returns rainbow colours based on the amount of milliseconds passed by since 01.01.1970. This may sounds ridiculous but it makes distributed displays for rainbow colours quite easy without any special synchronisation. It just requires your system time to be accurate.

## API

```js
const GlobalRainbow = require('global-rainbow');
const rainbow = new GlobalRainbow([speed]);
```

Create a new instances of the rainbow stuff. The optional parameter ```speed``` determines how many degrees hue are passed by within one second. By default it is set 30, so it will take 12 seconds to display all colours.

### Method: get()

```js
const colour = rainbow.get([offset]);
```

Get some colours. The optional parameter ```offset``` can be a number or an array of numbers. By default it is 0. If offset is omitted or a number, the method will return an array with RGB values. If offset is an array of numbers, the method returns an array of RGB arrays - one for each given offset.
