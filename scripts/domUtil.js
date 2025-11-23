export function createNode(nodeDescr, data = {}) {
  const el = document.createElement(nodeDescr.tag);
  if (nodeDescr.class) el.className = nodeDescr.class;
  if (nodeDescr.dataKey && data[nodeDescr.dataKey] !== undefined) {
      el.textContent = data[nodeDescr.dataKey];
  } else if (nodeDescr.text) {
      el.textContent = nodeDescr.text;
  }
  if (nodeDescr.attrs) {
      Object.entries(nodeDescr.attrs).forEach(([key, val]) => {
          if (key.endsWith('Key')) {
              const realAttr = key.slice(0, -3);
              if (data[val]) el.setAttribute(realAttr, data[val]);
          } else {
              el.setAttribute(key, val);
          }
      });
  }
  if (nodeDescr.children) {
      nodeDescr.children.forEach(child => el.appendChild(createNode(child, data)));
  }
  return el;
}