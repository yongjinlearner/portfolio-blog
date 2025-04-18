function clickHamburger(){  
  
  var burgerNav = document.getElementById("burger-nav");
  if(burgerNav.style.display == 'none') {
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
  var blogCode = "blog"+blogNum;
  console.log(blogCode)
  window.location.href = "blogs/blog"+blogNum+".html";
}

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

async function loadComments() {
  try {
    const res = await fetch(`http://localhost:3000/api/displayComment`);
    const comments = await res.json(); // Get the comments as a JSON array

    const commentsContainer = document.getElementById("comments-container");

    // Loop through the comments and append them to the page
    comments.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      const username = document.createElement("div");
      username.classList.add("username");
      username.textContent = comment.username;

      const content = document.createElement("div");
      content.textContent = comment.content;

      commentDiv.appendChild(username);
      commentDiv.appendChild(content);

      commentsContainer.appendChild(commentDiv);
    });
  } catch (err) {
    console.error("Error loading comments:", err);
  }
}