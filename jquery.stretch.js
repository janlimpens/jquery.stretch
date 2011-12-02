(function() {
  var $, accumulateHeight, addHeight, difference, expand, expandAll, getSpace, options, stretch;
  var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; };

  $ = jQuery;

  expand = function(elm, height) {
    var mySpace;
    elm = $(elm);
    mySpace = getSpace(elm);
    elm.css(options.mode, height - mySpace);
    if (options.fixOverflow) elm.css("overflow", "auto");
  };

  expandAll = function(elms, totalHeight) {
    var elm, height, _i, _len;
    height = totalHeight / elms.length;
    for (_i = 0, _len = elms.length; _i < _len; _i++) {
      elm = elms[_i];
      expand(elm, height);
    }
  };

  addHeight = function(memo, curr) {
    return memo + $(curr).outerHeight();
  };

  accumulateHeight = function(elms) {
    var elm, h, _i, _len;
    h = 0;
    for (_i = 0, _len = elms.length; _i < _len; _i++) {
      elm = elms[_i];
      h = h + $(elm).outerHeight();
    }
    return h;
  };

  getSpace = function(elm) {
    var aspect, aspects, result, tentativeDim, _i, _len;
    result = 0;
    aspects = ["margin-top", "margin-bottom", "padding-top", "padding-bottom"];
    for (_i = 0, _len = aspects.length; _i < _len; _i++) {
      aspect = aspects[_i];
      tentativeDim = parseInt(elm.css(aspect));
      if (tentativeDim) result += tentativeDim;
    }
    return result;
  };

  difference = function(array1, array2) {
    var value, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = array1.length; _i < _len; _i++) {
      value = array1[_i];
      if (__indexOf.call(array2, value) < 0) _results.push(value);
    }
    return _results;
  };

  options = {};

  stretch = function(userOptions) {
    var fixedHeight, heightProvider, nonVs, parent, parentHeight, self, space;
    self = $(this);
    options = {
      mode: "height",
      fixOverflow: true
    };
    options = $.extend(options, userOptions);
    parent = self.parent();
    space = getSpace(parent);
    heightProvider = $(options.heightProvider || parent);
    parentHeight = heightProvider.height() - space;
    nonVs = difference(parent.children(":visible"), self);
    fixedHeight = accumulateHeight(nonVs);
    return expandAll(self, parentHeight - fixedHeight);
  };

  $.fn.stretch = stretch;

}).call(this);
