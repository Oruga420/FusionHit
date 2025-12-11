import BlueNebula from './components/BlueNebula';
import DownloadButton from './components/DownloadButton';

const resume = {
  name: 'Alejandro De La Mora',
  role: 'AI Solutions Architect & Senior Engineer',
  summary:
    'AI Solutions Architect and Senior Engineer with a strong background in Python, Backend Development, and Generative AI. Specializes in building scalable, production-grade AI systems, including RAG architectures, Agentic Workflows, and custom MCP servers on AWS and GCP. Proven ability to drive technical innovation, having shipped over 120 AI applications and achieved over $1M in operational savings through intelligent automation. Experienced in leading technical adoption (47% to 97%) and architecting low-latency solutions for regulated environments.',
  contact: {
    phone: '+1 437 243 3693',
    email: 'alex@seshwithfriends.org',
    linkedin: 'https://www.linkedin.com/in/amorac/',
    website: 'http://www.eloruga.com',
    github: 'https://github.com/Oruga420',
  },
  expertise: [
    'Python',
    'Next.js',
    'Node.js',
    'Large Language Models (OpenAI, Anthropic, Gemini)',
    'RAG',
    'Agentic Workflows',
    'Model Context Protocol (MCP)',
    'LangChain concepts',
    'AWS (EC2, Lambda)',
    'Google Cloud Platform',
    'Vercel',
    'CI/CD pipelines',
    'Salesforce (Agentforce, Apex)',
    'QA Engineering',
    'Data Modeling',
    'API Integration',
  ],
  experience: [
    {
      company: 'Assent',
      title: 'AI Solutions Architect',
      location: '',
      dates: 'Feb 2025 - Present',
      bullets: [
        'Designed and deployed a robust GenAI stack using OpenAI, Anthropic, and Gemini models. Built custom MCP servers to safely expose internal tools and data to AI agents.',
        'Developed complex, multi-step agentic workflows that autonomously handle compliance processes, replacing over 20,000 man-hours of manual labor in a single year.',
        'Increased internal AI adoption from 47% to 97% by delivering reliable, auditable, and secure tools. Achieved over $1M in savings through productivity gains and automation.',
        'Implemented live RAG connections for chatbots, ensuring high fidelity in data retrieval for regulated compliance data.',
      ],
    },
    {
      company: 'Sesh | Ai Solutions',
      title: 'AI Solutions Architect',
      location: '',
      dates: 'Nov 2021 - Present',
      bullets: [
        'Architected and shipped over 120 GenAI applications and 90+ chatbots to production across 30 different clients.',
        'Connected AI models with diverse backend systems (Salesforce, Internal APIs, Zapier) to create seamless automation pipelines for small to medium businesses.',
        'Lead a community of 100+ developers and enthusiasts, teaching best practices for AI engineering and backend integration through tutorials and open office hours.',
      ],
    },
    {
      company: 'Online Business Systems',
      title: 'Salesforce Consultant',
      location: '',
      dates: 'Jun 2024 - Nov 2024',
      bullets: [
        'Focused on Agentforce implementation, defining prompts, actions, and data access layers to create functional AI copilots for enterprise clients.',
        'Wired AI assistants into existing sales and service backends, ensuring agents enhanced rather than disrupted established workflows.',
      ],
    },
    {
      company: 'Globalization Partners',
      title: 'Salesforce Manager & AI Lead',
      location: '',
      dates: 'Nov 2018 - Nov 2023',
      bullets: [
        "Built 'GIA', the company's internal chatbot, and pioneered GenAI-powered workflows for Jira and development assistance.",
        'Managed a Salesforce environment with 1,000+ users, overseeing complex integrations and data security while introducing early AI/LLM features to the roadmap.',
      ],
    },
  ],
  education: [
    {
      degree: 'Ingenieria en Sistemas (Systems Engineering)',
      school: 'Universidad Marista de MAcrida',
      dates: '2004 - 2007',
    },
  ],
};

function ContactList({ contact }) {
  return (
    <div className="contact">
      <h3>Reach Out</h3>
      <ul>
        <li>{contact.phone}</li>
        <li>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={contact.website} target="_blank" rel="noreferrer">
            Website
          </a>
        </li>
        <li>
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="card hero">
        <BlueNebula />
        <div className="floating-badge">Eye-candy WebGL blue waves</div>
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 10 }}>
          <h1>{resume.name}</h1>
          <div className="role">{resume.role}</div>
          <p className="summary">{resume.summary}</p>
          <DownloadButton />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ContactList contact={resume.contact} />
        </div>
      </section>

      <section className="section card">
        <h2>Areas of Expertise</h2>
        <div className="pill-row">
          {resume.expertise.map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section card">
        <h2>Work Experience</h2>
        <div className="experience">
          {resume.experience.map((job) => (
            <div key={`${job.company}-${job.dates}`} className="job-card">
              <div className="job-header">
                <div className="job-title">
                  {job.title} | {job.company}
                </div>
                <div className="job-meta">{job.dates}</div>
              </div>
              <ul className="bullets">
                {job.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section card">
        <h2>Education</h2>
        <div className="education">
          {resume.education.map((edu) => (
            <div key={edu.degree} className="edu-card">
              <div className="job-title">{edu.degree}</div>
              <div className="job-meta">
                {edu.school} | {edu.dates}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
