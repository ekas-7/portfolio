import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Code, Palette, Server, Database, Settings, ExternalLink } from 'lucide-react';
import IconCloud from './ui/icon-cloud';

// Badge Component
const Badge = ({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Types for Skill and Category
type Skill = {
  name: string;
  slug: string;
  description?: string;
  url?: string;
};

type Category = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  skills: Skill[];
};

// Skills Data
const skillsByCategory: Record<string, Category> = {
  frontend: {
    title: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces',
    icon: Code,
    skills: [
      { name: 'TypeScript', slug: 'typescript', description: 'Static typing for JavaScript', url: 'https://www.typescriptlang.org/' },
      { name: 'React', slug: 'react', description: 'UI component library', url: 'https://reactjs.org/' },
      { name: 'Next.js', slug: 'nextdotjs', description: 'React framework for production', url: 'https://nextjs.org/' },
      { name: 'HTML5', slug: 'html5', description: 'Markup language for the web' },
      { name: 'CSS3', slug: 'css3', description: 'Styling language for the web' },
      { name: 'JavaScript', slug: 'javascript', description: 'Core web programming language' },
    ],
  },
  backend: {
    title: 'Backend Development',
    description: 'Creating scalable server-side applications',
    icon: Server,
    skills: [
      { name: 'Node.js', slug: 'nodedotjs', description: 'JavaScript runtime', url: 'https://nodejs.org/' },
      { name: 'Express', slug: 'express', description: 'Web framework for Node.js', url: 'https://expressjs.com/' },
      { name: 'Java', slug: 'java', description: 'Enterprise programming language', url: 'https://www.java.com/' },
    ],
  },
  database: {
    title: 'Database & Cloud',
    description: 'Managing data and cloud infrastructure',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', slug: 'postgresql', description: 'Open-source SQL database', url: 'https://www.postgresql.org/' },
      { name: 'Prisma', slug: 'prisma', description: 'Next-gen ORM', url: 'https://www.prisma.io/' },
      { name: 'AWS', slug: 'amazonaws', description: 'Cloud computing platform', url: 'https://aws.amazon.com/' },
      { name: 'Firebase', slug: 'firebase', description: 'App development platform', url: 'https://firebase.google.com/' },
    ],
  },
  tools: {
    title: 'DevOps & Tools',
    description: 'Streamlining development workflow',
    icon: Settings,
    skills: [
      { name: 'Docker', slug: 'docker', description: 'Container platform', url: 'https://www.docker.com/' },
      { name: 'Git', slug: 'git', description: 'Version control system', url: 'https://git-scm.com/' },
      { name: 'GitHub', slug: 'github', description: 'Code hosting platform', url: 'https://github.com/' },
      { name: 'VS Code', slug: 'visualstudiocode', description: 'Code editor', url: 'https://code.visualstudio.com/' },
    ],
  },
  deployment: {
    title: 'Deployment & Testing',
    description: 'Ensuring quality and reliability',
    icon: Server,
    skills: [
      { name: 'Nginx', slug: 'nginx', description: 'Web server', url: 'https://nginx.org/' },
      { name: 'Vercel', slug: 'vercel', description: 'Deployment platform', url: 'https://vercel.com/' },
      { name: 'Jest', slug: 'jest', description: 'Testing framework', url: 'https://jestjs.io/' },
    ],
  },
  design: {
    title: 'Design',
    description: 'Creating user experiences',
    icon: Palette,
    skills: [
      { name: 'Figma', slug: 'figma', description: 'Design tool', url: 'https://www.figma.com/' },
    ],
  },
};

// Skill Card Component
const SkillCard = ({ category }: { category: Category }) => {
  const CategoryIcon = category.icon;

  return (
    <div className="p-6 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-800/70 hover:to-gray-900/70 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <CategoryIcon className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-gray-100">{category.title}</h3>
      </div>
      <p className="text-sm text-gray-400 mb-4">{category.description}</p>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <div key={skill.slug} className="group relative">
            <Badge
              className="bg-gray-700 text-gray-100 hover:bg-blue-600/20 hover:text-blue-400 transition-colors cursor-pointer group"
            >
              <span>{skill.name}</span>
              {skill.url && (
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              )}
            </Badge>
            {skill.description && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-gray-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {skill.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const { theme, setTheme } = useTheme();
  const allSlugs = Object.values(skillsByCategory)
    .flatMap((category) => category.skills)
    .map((skill) => skill.slug);

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const categories = Object.values(skillsByCategory);

  // Split categories into two groups
  const firstHalf = categories.slice(0, 3);
  const secondHalf = categories.slice(3);

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#05101D] to-[#0A1A2F] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl bg-gradient-to-r from-emerald-400 to-indigo-400 font-extrabold tracking-tight text-transparent bg-clip-text">
            My Skills
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A comprehensive overview of my technical expertise and tools I work with
          </p>
        </div>

        {/* First Half of Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {firstHalf.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>

        {/* Icon Cloud */}
        <div className="rounded-xl p-8 flex items-center justify-center backdrop-blur-sm mb-8">
          <IconCloud iconSlugs={allSlugs} />
        </div>

        {/* Second Half of Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondHalf.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
