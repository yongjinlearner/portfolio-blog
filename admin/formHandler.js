const form = document.getElementById('blogEntry');

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title")

    if (!title) {
        alert("Please enter a title")
        return;
    }

    try {
        const response = await fetch("/admin/postBlog", {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        })
            .then((res) => res.text())
            .then((message) => {
                alert(message)
            })

    } catch (error) {
        console.error("There was an error while calling the backend", error)
    }
})