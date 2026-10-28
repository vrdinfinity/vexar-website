// Colours the product names: VexarGrid in green, VexarGo in berry.
(() => {
  const pattern = /VexarGrid|VexarGo/g;
  const skip = new Set(['SCRIPT','STYLE','TITLE','OPTION','TEXTAREA','NOSCRIPT']);
  const wrap = root => {
    const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
      acceptNode: node => !skip.has(node.parentElement?.tagName) && !node.parentElement?.closest('.brand-name') && /Vexar(Grid|Go)/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      const display = getComputedStyle(parent).display;
      const flexLike = /flex|grid/.test(display);
      const fragment = flexLike ? document.createElement('span') : document.createDocumentFragment();
      let last = 0;
      node.nodeValue.replace(pattern,(match,offset) => {
        fragment.append(node.nodeValue.slice(last,offset));
        const span = document.createElement('span');
        span.className = `brand-name brand-${match === 'VexarGrid' ? 'grid' : 'go'}`;
        span.textContent = match;
        fragment.append(span);
        last = offset + match.length;
      });
      fragment.append(node.nodeValue.slice(last));
      if (flexLike) fragment.className = 'brand-text';
      node.replaceWith(fragment);
    });
  };
  let queued = false;
  const run = () => { queued = false; observer.disconnect(); wrap(document.body); observer.observe(document.body,{childList:true,subtree:true,characterData:true}); };
  const observer = new MutationObserver(() => { if (!queued) { queued = true; requestAnimationFrame(run); } });
  run();
})();
