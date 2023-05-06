// function to calculate contrast ratio
export function getContrastRatio(hexcolor) {
  const r = parseInt(hexcolor.substr(1, 2), 16);
  const g = parseInt(hexcolor.substr(3, 2), 16);
  const b = parseInt(hexcolor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq;
}

export function lightenColor(hexColor, lightenBy = 0.15) {
  // Parse the hex color string into RGB components
  let r = parseInt(hexColor.substring(1, 3), 16);
  let g = parseInt(hexColor.substring(3, 5), 16);
  let b = parseInt(hexColor.substring(5, 7), 16);

  // Calculate the new lightened RGB values
  r = Math.round(Math.min(255, r + r * lightenBy));
  g = Math.round(Math.min(255, g + g * lightenBy));
  b = Math.round(Math.min(255, b + b * lightenBy));

  // Convert the new RGB values back to a hex color string
  let newHexColor =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  return newHexColor;
}
