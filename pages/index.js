import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch('/api/contact', {  // Corrected API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully!');
      } else {
        setStatus(result.error || 'Failed to send message. Please try again.');
      }

      console.log(result); // Logs response for debugging
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        
        <button type="submit">Send</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
