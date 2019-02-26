# production.plugin.js
The plugin handles console.logs based on Cookie variable. 

**CDN URL**
`https://cdn.jsdelivr.net/gh/aleksanderem/production.plugin.js/production.plugin.min.js`

## How to use

 - add this script 
 
 ```
 <head>
 ...
 <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/aleksanderem/production.plugin.js/production.plugin.min.js"></script>
 ...
 any script where the console.log might happen
 </head>
 ``` 
  
  to the `<head>` section as close the top as you can
 - in default, you will see no console.log / warn / info right after you paste it
 - if you need to see console information, add a Cookie 
 
| Cookie name  | Cookie value |
| ------------- | ------------- |
| `debugJS`  | `true`  |

 - if you need to preview what happens in console **without** adding the Cookie, go to dev tools ( in Chrome ), console, and write `console.logArray` ( screenshot : http://prntscr.com/mqat0j )


## What it overwrites?

| Console function | overwrite | saves output |
| ---------------- | --------- | ------------ |
| console.log      | x         | x            |
| console.warn     | x         | x            |
| console.error    | x         | x            |
| console.info     | x         | x            |
| console.debug    | x         | x            |
