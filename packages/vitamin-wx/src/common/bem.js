export function bem(block, element = '', modifier = '') {
  let name = `vc-${block}`;
  if (element) {
    name += `__${element}`;
  }
  if (modifier) {
    name += `--${modifier}`;
  }
  return name;
}
