/* */ 
;modjewel.define("weinre/target/ElementHighlighterDivs2", function(require, exports, module) { // Generated by CoffeeScript 1.8.0
var ColorBorder, ColorContent, ColorMargin, ColorPadding, ElementHighlighter, ElementHighlighterDivs2, px,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ElementHighlighter = require('./ElementHighlighter');

ColorMargin = 'rgba(246, 178, 107, 0.66)';

ColorBorder = 'rgba(255, 229, 153, 0.66)';

ColorPadding = 'rgba(147, 196, 125, 0.55)';

ColorContent = 'rgba(111, 168, 220, 0.66)';

ColorBorder = 'rgba(255, 255, 153, 0.40)';

ColorPadding = 'rgba(  0, 255,   0, 0.20)';

ColorContent = 'rgba(  0,   0, 255, 0.30)';

module.exports = ElementHighlighterDivs2 = (function(_super) {
  __extends(ElementHighlighterDivs2, _super);

  function ElementHighlighterDivs2() {
    return ElementHighlighterDivs2.__super__.constructor.apply(this, arguments);
  }

  ElementHighlighterDivs2.prototype.createHighlighterElement = function() {
    this.hElement1 = document.createElement("weinreHighlighter");
    this.hElement1.style.position = 'absolute';
    this.hElement1.style.overflow = 'hidden';
    this.hElement2 = document.createElement("weinreHighlighter");
    this.hElement2.style.position = 'absolute';
    this.hElement2.style.display = 'block';
    this.hElement2.style.overflow = 'hidden';
    this.hElement1.appendChild(this.hElement2);
    this.hElement1.style.borderTopStyle = 'solid';
    this.hElement1.style.borderLeftStyle = 'solid';
    this.hElement1.style.borderBottomStyle = 'solid';
    this.hElement1.style.borderRightStyle = 'solid';
    this.hElement1.style.borderTopColor = ColorMargin;
    this.hElement1.style.borderLeftColor = ColorMargin;
    this.hElement1.style.borderBottomColor = ColorMargin;
    this.hElement1.style.borderRightColor = ColorMargin;
    this.hElement1.style.backgroundColor = ColorBorder;
    this.hElement2.style.borderTopStyle = 'solid';
    this.hElement2.style.borderLeftStyle = 'solid';
    this.hElement2.style.borderBottomStyle = 'solid';
    this.hElement2.style.borderRightStyle = 'solid';
    this.hElement2.style.borderTopColor = ColorPadding;
    this.hElement2.style.borderLeftColor = ColorPadding;
    this.hElement2.style.borderBottomColor = ColorPadding;
    this.hElement2.style.borderRightColor = ColorPadding;
    this.hElement2.style.backgroundColor = ColorContent;
    this.hElement1.style.outline = 'black solid thin';
    return this.hElement1;
  };

  ElementHighlighterDivs2.prototype.redraw = function(metrics) {
    this.hElement1.style.top = px(metrics.y);
    this.hElement1.style.left = px(metrics.x);
    this.hElement1.style.height = px(metrics.height);
    this.hElement1.style.width = px(metrics.width);
    this.hElement1.style.borderTopWidth = px(metrics.marginTop);
    this.hElement1.style.borderLeftWidth = px(metrics.marginLeft);
    this.hElement1.style.borderBottomWidth = px(metrics.marginBottom);
    this.hElement1.style.borderRightWidth = px(metrics.marginRight);
    this.hElement2.style.top = px(metrics.borderTop);
    this.hElement2.style.left = px(metrics.borderLeft);
    this.hElement2.style.bottom = px(metrics.borderBottom);
    this.hElement2.style.right = px(metrics.borderRight);
    this.hElement2.style.borderTopWidth = px(metrics.paddingTop);
    this.hElement2.style.borderLeftWidth = px(metrics.paddingLeft);
    this.hElement2.style.borderBottomWidth = px(metrics.paddingBottom);
    return this.hElement2.style.borderRightWidth = px(metrics.paddingRight);
  };

  return ElementHighlighterDivs2;

})(ElementHighlighter);

px = function(value) {
  return "" + value + "px";
};

require("../common/MethodNamer").setNamesForClass(module.exports);

});
