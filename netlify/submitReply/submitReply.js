async function submitReply(postId) {
  const message = document.getElementById(`replyMessage-${postId}`).value;

  if (!message) {
      alert('Please enter a reply message.');
      return;
  }

  const replyData = { postId, message };

  try {
      const response = await fetch('/.netlify/functions/submitReply', {
          method: 'POST',
          body: JSON.stringify(replyData),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      const result = await response.json();

      if (response.ok) {
          alert(result.message);
          loadPosts(); // Reload posts after submitting reply
      } else {
          alert(result.error);
      }
  } catch (error) {
      console.error('Error submitting reply:', error);
      alert('Failed to submit reply');
  }
}
