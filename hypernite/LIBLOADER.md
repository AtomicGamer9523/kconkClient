# LIBLOADER

## A javascript code injector for browser games

### How to load the injector

```js
((_$p,_$e,_$r)=>{_$e="";_$r=new XMLHttpRequest();_$r.onreadystatechange=()=>{if(_$r.readyState==4&&_$r.status==200){_$e=_$r.responseText}};_$r.open("GET",_$p,false);_$r.send();eval(_$e)})("https://raw.githubusercontent.com/AtomicGamer9523/kconkClient/main/hypernite/LIBLOADER.js");
```

### Use

```js
const myLib = loadJSLIB("https://exmaple.com/myLib.js");
myLib.inject();

// or

loadJSLIB("https://exmaple.com/myLib.js").inject();
```
