Literally Canvas Core v0.6.0
=======================

Literally Canvas is an extensible, open source (BSD-licensed), HTML5 drawing
widget. It has no external dependencies.

This is the core libary which provides an interface for drawing on the canvas.

Get help on our mailing list by sending an email to
[literallycanvas+subscribe@googlegroups.com](mailto:literallycanvas+subscribe@googlegroups.com)
or by visiting [Google Groups](https://groups.google.com/forum/#!forum/literallycanvas).

### [Full documentation](http://literallycanvas.com)

### [Main Repo](https://github.com/literallycanvas/literallycanvas)

### [Examples](http://github.com/literallycanvas/literallycanvas-demos)

Along with the CSS, JS, and image assets, this is all it takes:

```html
<div class="literally"></div>
<script type="text/javascript">
  const drawingEl = document.querySelector('.literally');
  const lc = new LiterallyCanvas(drawingEl, {
    ...LiterallyCanvas.defaultOptions,
    defaultStrokeWidth: 10,
    backgroundColor: '#FFF',
  });
</script>
```

State of the project
--------------------

No one is maintaining this project. If you report a bug, the ticket will be a
helpful place for discussion, but no one will fix it unless you submit a pull
request. Feature requests will likewise be ignored.

Pull requests will be merged promptly if they are basically OK.

Developing
----------

Setup: `yarn install --dev`

Watching and serving: `gulp dev`

Go to `demo/simple.html` to see a simple pencil drawing example.