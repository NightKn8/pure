const getNav = document.querySelector(".navigation");

window.onload = () => {
  window.scrollTo(0, 1); // IE HAX
  window.scrollTo(0, 0); // IE HAX
  const year = new Date().getFullYear();
  document.querySelector(".cc").insertAdjacentHTML('afterbegin', `&copy  ${year}`);
  makeNavigation("section", "nav");
  progressBar();
  window.addEventListener('click', (e) => {
    (getComputedStyle(e.target, ':before').getPropertyValue("content")=='"ignore"') ? true : navArr().map((a, i, arr) => (i >= 1 && i < arr.length - 1) ? a.classList.contains('show', a.classList.remove("show")) : a); 
  }, false);
};

window.onscroll = () => {
  progressBar();
};

window.onresize = () => {
  progressBar();
};

navArr = () => {
  return Array.from(getNav.children);
};

goToElem = (elem) => {
  const elemTop = elem.getBoundingClientRect().top;
  window.scrollTo(0, elemTop + pageYOffset - getNav.offsetHeight);
};

progressBar = () => {
  //http://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
  const firstBar = document.getElementsByTagName("progress")[0],
    secondBar = document.getElementsByTagName("progress")[1],
    body = document.body,
    html = document.documentElement,
    getH = window.innerHeight || html.clientHeight || body.clientHeight,
    valAtt = getH + pageYOffset,
    maxAtt = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  firstBar.setAttribute("value", pageYOffset);
  firstBar.setAttribute("max", maxAtt);
  secondBar.setAttribute("value", valAtt);
  secondBar.setAttribute("max", maxAtt);
};

makeNavigation = (...tag) => {
  tag.map((name) => {
    const tagArr = Array.from(document.getElementsByTagName(name));
    tagArr.map((el) => {
      const attribute = el.getAttribute("data-title");
      if (attribute) {
        const li = document.createElement('li');
        li.setAttribute("class", "menuitem md c");
        li.appendChild(document.createTextNode(attribute));
        li.addEventListener('click', () => {
          goToElem(el);
        }, false);
        getNav.insertBefore(li, getNav.childNodes[getNav.children.length]);
      }
    });
  });
  getNav.children[0].addEventListener('click', () => {
    navArr().map((a, i, arr) => (i >= 1 && i < arr.length - 1) ? a.classList.toggle('show') : a);
  }, false);
}