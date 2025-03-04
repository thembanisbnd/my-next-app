export default function ContactForm() {
    return (
        <form id="contactForm">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send</button>
        </form>
    );
}
