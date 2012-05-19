/* 
  jQuery plugin to serialize inputs to javascript object
  https://github.com/rogerz/jquery-serialize-inputs

  Rogerz Zhang <rogerz.zhang@gmail.com>
  2012-05-19
*/

(function ($) {
    $.fn.serializeInputs = function () {
        var inputs = {};
        this.find(":input[name]").each(function () {
            var value, key = this.name, $elem = $(this);
            if ($elem.is(":text,:radio:checked,:checkbox:checked")) {
                value = this.value;
            } else if ($elem.is("select")) {
                value = $elem.find("option:selected").val();
            } else {
                return;
            }

            if ($elem.is(".number")) {
                inputs[key] = Number(value);
            } else if ($elem.is(".string")) {
                inputs[key] = String(value);
            } else if (value === "true") {
                inputs[key] = true;
            } else if (value === "false") {
                inputs[key] = false;
            } else if (value === "null") {
                inputs[key] = null;
            } else if (isNaN(Number(value))) {
                inputs[key] = value;
            } else {
                inputs[key] = Number(value);
            }
        });
        return inputs;
    };
})(jQuery);