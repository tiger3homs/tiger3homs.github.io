import { useState } from 'react';
import { Github, Facebook, Mail, Instagram } from 'lucide-react';
import emailjs from 'emailjs-com'; // Import emailjs
import { translations } from './translations';
import Logo from './components/Logo';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection'; // Import ContactSection

type Language = 'en' | 'ar' | 'sv';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'tiger3homs@gmail.com',
      name: formData.name,
      email: formData.email,
    };

    emailjs
      .send('service_bdj14o3', 'template_2e2nikq', templateParams, 'UBLU57PsLej7OB6PR')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => setLang('en')} 
          className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang('sv')} 
          className={`px-2 py-1 rounded ${lang === 'sv' ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          SV
        </button>
        <button 
          onClick={() => setLang('ar')} 
          className={`px-2 py-1 rounded ${lang === 'ar' ? 'bg-blue-500' : 'bg-gray-700'} font-arabic`}
        >
          ع
        </button>
      </div>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <Logo />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">{t.role}</p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/tiger3homs" className="hover:text-blue-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="mailto:tiger3homs@gmail.com" className="hover:text-blue-400 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://facebook.com/tiger3homs" className="hover:text-blue-400 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com/obajda.s" className="hover:text-blue-400 transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <ProjectsSection 
        title={t.projects.title} 
        projects={[
          {
            title: t.projects.project1.title,
            description: t.projects.project1.description,
            tags: t.projects.project1.tags,
            githubLink: "https://github.com/tiger3homs/project1",
            liveLink: "https://tiger3homs.github.io/project1/"
          },
          {
            title: t.projects.project2.title,
            description: t.projects.project2.description,
            tags: t.projects.project2.tags,
            githubLink: "https://github.com/tiger3homs/project2",
            liveLink: "https://tiger3homs.github.io/project2/"
          }
        ]}
      />

      

      {/* About Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">{t.about.title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {t.about.description}
          </p>
        </div>
      </section>

{/* Contact Section */}
<ContactSection t={t.contact} handleSubmit={handleSubmit} formData={formData} handleInputChange={handleInputChange} />

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

export default App;
