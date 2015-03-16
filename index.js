function debounce(fn, ms) {
  var timeout;

  return function() {
    var ctx = this;
    var args = arguments;

    var later = function() {
      fn.apply(ctx, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  };
}

function borderify(color) {
  var ele;
  var clicky;
  var oldStyle;

  return function(mouseEvent) {
    if (ele) {
      ele.style.border = oldStyle || '';
      ele.onclick = clicky;
    }

    var x = mouseEvent.clientX;
    var y = mouseEvent.clientY;
    ele = document.elementFromPoint(x, y);
    oldStyle = ele.style.border;
    ele.style.border = color;

    clicky = ele.onclick;
    ele.onclick = captureElementData;
  };
}

function captureElementData(clickEvent) {
  clickEvent.stopPropagation();
  clickEvent.preventDefault();

  var target = clickEvent.target;
  var details = {};

  details.id = target.id;
  var attrSelector = elementAttributeSelector(target) || '';
  var selector = walkTree(target);
  details.selector =  selector + attrSelector;

  console.log('--------------------------------------------');
  console.log(details);
  window.minnie = details;
  console.log('--------------------------------------------');
}

function elementAttributeSelector(target) {
  var attrSelector  = '';
  var attributesArray = Array.prototype.slice.apply(target.attributes);

  var atrributeSelector = attributesArray.forEach(function(attr) {
    if ( !attr || attr.name == 'class' || attr.name == 'style')
      return;

    attrSelector = attrSelector + '[' + attr.name + '="' + attr.value + '"]';
  });

  return attrSelector;
}

function walkTree(el, path) {
  path = path || [];

  if (el && el.id) {
    path.unshift('#' + el.id);
    el = null;
  }

  if (!el)
    return path.join(' > ');

  var sel = el.tagName.toLowerCase();
  if (el.className)
    sel += el.className.trim().replace(/(^|\s+)/g, '.');

  path.unshift(sel);
  return walkTree(el.parentElement, path);
}

document.onmousemove = debounce(borderify('solid black'), 50);
