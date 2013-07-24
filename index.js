var o = require('jquery');

function HoverTip (selector) {
  if (!(this instanceof HoverTip)) return new HoverTip(selector);
  this.el = o('table td');
  this._mouseenter = this.mouseenter.bind(this);
  this._mouseleave = this.mouseleave.bind(this);
  this.el.on('mouseenter', this._mouseenter);
  this.el.on('mouseleave', this._mouseleave);
  var tip = this.tip = o('<div class="hover-tip"></div>');
  this.tip.appendTo(document.body);
  this.tip.on('mouseleave', this._mouseleave);
}

module.exports = HoverTip;

HoverTip.prototype.mouseenter = function(e) {
  var target = this.target = o(e.target);
  var to = target.offset();
  var text = target.html();
  this.tip.html(text);
  var w = this.tip.width();
  var tw = target.width();
  if (w > tw) {
    this.tip.css('top', to.top + 'px');
    this.tip.css('left', to.left + 'px');
    this.tip.show();
  }
}

HoverTip.prototype.mouseleave = function(e) {
  var toEl = o(e.toElement)
  if (toEl.is('.hover-tip')) {
    return;
  }
  else {
    this.tip.hide();
  }
}

HoverTip.prototype.remove = function() {
  o(this.tip).remove();
  this.el.off('mouseenter', this._mouseenter);
  this.el.off('mouseleave', this.mouseleave);
  this.tip.off('mouseleave', this._mouseleave);
}
