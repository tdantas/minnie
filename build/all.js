function debounce(e,t){var n;return function(){var r=this,o=arguments,a=function(){e.apply(r,o)};clearTimeout(n),n=setTimeout(a,t)}}function borderify(e){var t,n,r;return function(o){t&&(t.style.border=r||"",t.onclick=n);var a=o.clientX,l=o.clientY;t=document.elementFromPoint(a,l),r=t.style.border,t.style.border=e,n=t.onclick,t.onclick=captureElementData}}function captureElementData(e){e.stopPropagation(),e.preventDefault();var t=e.target,n={};n.id=t.id;var r=elementAttributeSelector(t)||"",o=walkTree(t);n.selector=o+r,console.log("--------------------------------------------"),console.log(n),window.minnie=n,console.log("--------------------------------------------")}function elementAttributeSelector(e){{var t="",n=Array.prototype.slice.apply(e.attributes);n.forEach(function(e){e&&"class"!=e.name&&"style"!=e.name&&(t=t+"["+e.name+'="'+e.value+'"]')})}return t}function walkTree(e,t){if(t=t||[],e&&e.id&&(t.unshift("#"+e.id),e=null),!e)return t.join(" > ");var n=e.tagName.toLowerCase();return e.className&&(n+=e.className.trim().replace(/(^|\s+)/g,".")),t.unshift(n),walkTree(e.parentElement,t)}document.onmousemove=debounce(borderify("solid black"),50);