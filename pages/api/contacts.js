export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validate the input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Simulate sending an email
    console.log('Sending email:', { name, email, message });
    res.status(200).json({ message: 'Email sent successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}