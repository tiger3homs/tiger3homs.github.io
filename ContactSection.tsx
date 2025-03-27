import React from 'react';

interface ContactSectionProps {
  t: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
  };
  handleSubmit: (e: React.FormEvent) => void;
  formData: {
    name: string;
    email: string;
    message: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ t, handleSubmit, formData, handleInputChange }) => {
  return (
    <section className="container mx-auto px-4 py-16 bg-gray-800/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{t.title}</h2>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              {t.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t.namePlaceholder}
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              {t.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t.emailPlaceholder}
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              {t.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t.messagePlaceholder}
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {t.submitButton}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
