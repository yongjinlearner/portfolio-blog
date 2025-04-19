const comment = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

async function loadComments() {
    console.log("Loading in comments...")
    try {
        console.log("I'm now gonna fetch comments")
      const response = await fetch(`/api/showComment/${blogId}`); // Fetch comments from the backend
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      console.log("Response from fetch", response)
      const comments = await response.json(); // Parse the JSON response
      commentList.innerHTML = ''; // Clear any existing comments

      comments.reverse();
      
      // Loop through the comments and add them to the commentList
      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
        <div class="comment-header">
          <p><strong>${comment.author}</strong></p>
          <p><em>${comment.date}</em></p>
        </div>
          <p class="comment-content">${comment.content}</p>
          <hr>
        `;
        commentList.appendChild(commentElement);
      });
        console.log("Comments loaded successfully", comments)
    } catch (error) {
      console.error('Error loading comments:', error);
      commentList.innerHTML = '<p>Failed to load comments. Please try again later.</p>';
    }
  }

document.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(comment);
  const data = Object.fromEntries(formData.entries());
  const jsonData = JSON.stringify(data);
  console.log("jsonData", jsonData)

  fetch(`/api/sendComment/${blogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      comment.reset();
      alert("Comment submitted successfully!");
      loadComments()
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Error submitting comment.");
    });
});

document.addEventListener('DOMContentLoaded', loadComments)