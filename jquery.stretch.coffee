$ = jQuery

expand = (elm, height) ->
  elm = $(elm)
  mySpace = getSpace(elm)
  elm.css(options.mode, height - mySpace)
  elm.css("overflow", "auto") if options.fixOverflow
  return

expandAll = (elms, totalHeight) ->
  height = totalHeight / elms.length
  expand(elm, height) for elm in elms
  return

addHeight = (memo, curr) ->
  memo + $(curr).outerHeight()

accumulateHeight = (elms) ->
  h = 0
  for elm in elms
    h = h + $(elm).outerHeight()
  h

getSpace = (elm) ->
  result = 0
  aspects = ["margin-top", "margin-bottom", "padding-top", "padding-bottom"]
  for aspect in aspects
    tentativeDim = parseInt(elm.css(aspect))
    result += tentativeDim if tentativeDim
  result

difference = (array1, array2) ->
 value for value in array1 when value not in array2

options = {}

stretch = (userOptions) ->
  self = $(this)
  options = # need to reset this here or it will be cached from earlier calls
    mode: "height" # might be min-height, too
    fixOverflow: true
  options = $.extend(options, userOptions)
  parent = self.parent()
  space = getSpace(parent) # window never has margins
  heightProvider = $(options.heightProvider or parent)
  parentHeight = heightProvider.height() - space
  nonVs = difference(parent.children(":visible"), self)
  fixedHeight = accumulateHeight(nonVs)
  expandAll(self, parentHeight - fixedHeight)

$.fn.stretch = stretch
