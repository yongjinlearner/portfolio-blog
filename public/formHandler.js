const form = document.getElementById('blogEntry')
console.log(form)

form.addEventListener("submit", async (event) => {
    console.log("Listening to the submit event...")
    event.preventDefault();
    const title = document.getElementById("title").value;

    if (!title) {
        alert("Please enter a title")
        return;
    }

    try {
        const response = await fetch("/admin/postBlog", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ title })
        });

        const message = await response.text();
        alert(message);
    } catch (error) {
        console.error("There was an error while calling the backend", error)
    }
});
