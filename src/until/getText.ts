export const getTextWidth = (content: string, fontSize: string) => {
  const text = document.createElement("span");

  text.style.font = "sans-serif";
  text.style.fontSize = fontSize ? fontSize : "14px";
  text.style.height = 'auto';
  text.style.width = 'auto';
  text.style.position = 'absolute';
  text.style.whiteSpace = 'pre';
  text.style.zIndex = "-1000";
  text.style.opacity = "0"
  text.style.visibility = "hidden";
  text.innerHTML = content ? content : "";

  document.body.appendChild(text);
  // const width = Math.ceil(text.clientWidth);
  const width = text.clientWidth;
  document.body.removeChild(text);

  return width
}