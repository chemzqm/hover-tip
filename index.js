var offset = require ('offset');
var mouseleave = require ('mouseleave');
var mouseenter = require ('mouseenter');
var matches = require ('matches-selector');
var domify = require ('domify');
var css = require ('css');

var styles = window.getComputedStyle;


function HoverTip (el, selector) {
  if (!(this instanceof HoverTip)) return new HoverTip(el, selector);
  this.el = el;
  this.selector = selector;
  this._mouseenter = this.mouseenter.bind(this);
  this._mouseleave = this.mouseleave.bind(this);
  var tip = this.tip = domify('<div class="hover-tip"></div>');
  mouseenter.bind(el, this._mouseenter);
  mouseleave.bind(tip, this._mouseleave);
  document.body.appendChild(tip);
}

module.exports = HoverTip;

HoverTip.prototype.mouseenter = function(e) {
  if (!matches(e.target, this.selector)) return;
  var to = offset(e.target);
  var text = e.target.innerHTML;
  this.tip.innerHTML = text;
  css(this.tip, {
    display: 'block',
    top: to.top,
    left: to.left
  });
  var w = parseInt(styles(this.tip).width, 10);
  var tw = parseInt(styles(e.target).width, 10);
  if (w < tw) {
    this.tip.style.display = 'none';
  }
}

HoverTip.prototype.mouseleave = function(e) {
  this.tip.style.display = 'none';
}

HoverTip.prototype.remove = function() {
  document.body.removeChild(this.tip);
  mouseenter.unbind(this.el, this._mouseenter);
  mouseleave.unbind(this.tip, this._mouseleave);
}
