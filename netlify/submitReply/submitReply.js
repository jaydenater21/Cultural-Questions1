document.getElementById('submitPost').addEventListener('click', async function() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const culture = document.getElementById('culture').value;
    const message = document.getElementById('message').value;

    const postData = { name, title, culture, message };

    try {
      const result = await response.json();
      if (response.ok) {
          alert(result.message);
          loadPosts(); // Reload posts after submitting
      } else {
          alert(result.error || 'Unknown error');
      }
  } catch (error) {
      console.error('Error parsing response:', error);
      alert('Failed to submit post');
  }
  

