jquery.stretch plugin
=====================

This plugin allows vertically stretched layouts, with one or more parts
taking up all remaining space. It strives to do only that and leave
anything else to the user.

How does it work?
-----------------

Include the coffee or javascript files in your page, then you get access
to the stretch funtion like that:

Assuming html like that:

    html  
      head  
        title  
      body  
        #main
          #stretch-me  
          #footer

    $("#main").stretch({
      heightProvider: window // we don't want to use body's height
    }); // this stretches the main div to the window
                          // height
    $("#stretch-me").stretch() // this stretches stretch-me, but keeps the
                               // footer untouched.

The #footer will keep it's height, defined by css or not, but the
 #stretch-me element will now expand as much as the viewport allows.
This pushes the footer to the bottom of the window.

If you want to keep it that way, if the user resizes his window, you
need to make this clear:

    var applyLayout = function() {
      $("#main").stretch();
      ...
    }
    applyLayout();
    $(window).resize(applyLayout);

jquery.stretch accepts an options object
----------------------------------------

  - *heightProvider:* The (usually) parent object that provides the
    total height. Defaults to the actual parent element, but in case of
    the body element, in most cases you will want to pass _window_.
  - *mode:* Accepts "height" and "min-height" (or anything else that can
    receive an int, but no guarantee for that!).
  - *fixOverflow:* elements with margins within other elements will
    "leak" their margin to the outside of the container, so
jquery.stretch will fix this by adding "overflow: auto" to stretched
elements. If you do not want this behavior, set it to _false_.

Please help!
------------
I am terrible at writing tests (I don't). So if you test this out and do
this by writing unit tests, I'd be terribly glad, if you would provide
them to me. Just fork this project, clone it, work it and request a
merge!
