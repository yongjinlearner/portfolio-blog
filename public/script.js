function clickHamburger() {

  var burgerNav = document.getElementById("burger-nav");
  if (burgerNav.style.display == 'none') {
    burgerNav.style.display = 'flex'
  } else {
    burgerNav.style.display = 'none'
  }
};

var i = 0;
var txt = 'Computer Science @ Cornell'; /* The text */
var speed = 100; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("type-effect").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function blog(blogNum) {
  var blogCode = "blog" + blogNum;
  console.log(blogCode)
  window.location.href = "blogs/blog" + blogNum + ".html";
}

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

const postComment = () => {

}