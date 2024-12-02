document.getElementById('submitPost').addEventListener('click', async function() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const culture = document.getElementById('culture').value;
  const message = document.getElementById('message').value;

  const postData = { name, title, culture, message };

  try {
      const response = await fetch('/.netlify/functions/createPost', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      // Check if the response status is OK
      if (!response.ok) {
          throw new Error(`Server returned status code ${response.status}`);
      }

      // Try to parse the JSON response
      const result = await response.json();

      if (result.error) {
          alert(`Error: ${result.error}`);
      } else {
          alert(result.message);  // Success message
          loadPosts(); // Reload posts after submitting
      }
  } catch (error) {
      console.error('Error submitting post:', error);
      alert(`Failed to submit post: ${error.message}`);
  }
});

