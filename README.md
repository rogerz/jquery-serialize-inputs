jQuery plugin to serialize all **named** inputs, i.e. `$(":input[name]")` to javascript object

* `value` will be serialized as string, number or constants (true, false, null)
* `name` will be used as key name
* add class `"number"`, `"string"` to the element for type casting
* if no type specified in class, string like value will be string, number like will be number and so on
* elements included are: `$(":text,:radio:checked,:checkbox:checked,select option:selected")`
* see example for details, it requires [jQuery](http://jquery.com) and [json2](https://github.com/douglascrockford/JSON-js) to work

https://github.com/rogerz/jquery-serialize-inputs