// src/app/contact/page.js
import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <p className="text-lg">
        If you&apos;d like to get in touch, please email me at <a href="mailto:your-email@example.com" className="text-blue-500">your-email@example.com</a>.
      </p>
    </div>
  );
};

export default ContactPage;
