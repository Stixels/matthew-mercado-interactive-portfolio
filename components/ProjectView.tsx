'use client';

import { motion } from 'motion/react';
import { useSystemStore } from '@/store/systemStore';
import { ArrowLeft, Server, Zap, Shield, Activity, ExternalLink, Github, Code2, Database, Terminal } from 'lucide-react';

const PROJECTS: Record<string, any> = {
  core: {
    title: 'Escape Director Client',
    status: 'ACTIVE',
    role: 'Lead Frontend Engineer',
    timeline: '2023 - Present',
    stack: ['Next.js', 'React', 'TypeScript', 'Redis', 'Tailwind CSS'],
    overview: 'A high-performance client application for managing escape room experiences in real-time. Designed to handle concurrent WebSocket connections while maintaining 60fps animations for game masters.',
    architecture: 'Micro-frontend architecture using Next.js App Router, enabling independent deployment of room management modules. State is managed via Zustand and synced via Redis pub/sub.',
    performance: 'Reduced initial load time by 45% through aggressive edge caching and dynamic imports. Websocket latency kept under 50ms globally.',
    tradeoffs: 'Opted for eventual consistency in non-critical metrics (like total historical hints given) to prioritize real-time puzzle state synchronization.',
    scaling: 'Stateless edge functions handle burst traffic during peak booking hours, scaling from 0 to 10,000 concurrent connections seamlessly.',
    color: 'neon-blue'
  },
  data: {
    title: 'Telemetry Service',
    status: 'DEGRADED',
    role: 'Backend Systems Engineer',
    timeline: '2022 - 2023',
    stack: ['Node.js', 'PostgreSQL', 'Kafka', 'Docker', 'AWS'],
    overview: 'Centralized telemetry ingestion service for tracking player progress and puzzle completion rates across multiple physical locations.',
    architecture: 'Event-driven architecture utilizing Kafka for high-throughput, low-latency data ingestion. Data is normalized and stored in partitioned PostgreSQL tables.',
    performance: 'Optimized database indexing improved query performance for complex analytics dashboards by 3x. Handles 50k events/sec peak.',
    tradeoffs: 'Increased infrastructure complexity to ensure zero data loss during network partitions, requiring a dedicated DevOps resource.',
    scaling: 'Horizontally scalable consumer groups process events asynchronously, allowing the ingestion API to remain highly responsive.',
    color: 'neon-purple'
  },
  terminal: {
    title: 'System Logs Analyzer',
    status: 'OFFLINE',
    role: 'Security & DevOps',
    timeline: '2021 - 2022',
    stack: ['Python', 'Elasticsearch', 'Kibana', 'Logstash', 'Bash'],
    overview: 'Advanced log analysis tool for identifying anomalies and potential security breaches in the system. Built to detect unauthorized access attempts in real-time.',
    architecture: 'ELK stack deployment with custom Python scripts for log parsing and enrichment. Machine learning models flag unusual access patterns.',
    performance: 'Implemented tiered storage in Elasticsearch to reduce costs while maintaining fast search for recent logs (under 200ms query time).',
    tradeoffs: 'High resource consumption during peak ingestion periods requires careful capacity planning and aggressive log rotation.',
    scaling: 'Automated index lifecycle management ensures optimal performance as data volume grows, archiving cold data to S3.',
    color: 'neon-green'
  },
  security: {
    title: 'Security Audit Tool',
    status: 'RESTRICTED',
    role: 'Security Engineer',
    timeline: '2020 - 2021',
    stack: ['Go', 'gRPC', 'PostgreSQL', 'Vault', 'Kubernetes'],
    overview: 'Internal tool for automated vulnerability scanning and compliance checking across the entire infrastructure.',
    architecture: 'Microservices architecture written in Go, utilizing gRPC for fast inter-service communication. Secrets managed via HashiCorp Vault.',
    performance: 'Scans 10,000+ endpoints in under 5 minutes using highly concurrent goroutines.',
    tradeoffs: 'Strict security policies occasionally slow down developer velocity, requiring manual overrides for edge cases.',
    scaling: 'Kubernetes auto-scaling ensures scanning capacity matches infrastructure growth.',
    color: 'error-red'
  },
  ai: {
    title: 'AI Core Logic',
    status: 'EXPERIMENTAL',
    role: 'Machine Learning Engineer',
    timeline: '2024 - Present',
    stack: ['PyTorch', 'TensorFlow', 'CUDA', 'Python', 'C++'],
    overview: 'Experimental neural network for predicting player behavior and dynamically adjusting puzzle difficulty in real-time.',
    architecture: 'Custom transformer model trained on historical telemetry data. Inference runs on dedicated GPU clusters.',
    performance: 'Sub-10ms inference time allows for seamless difficulty adjustments without interrupting gameplay.',
    tradeoffs: 'High compute costs and complex model training pipeline require significant ongoing investment.',
    scaling: 'Model quantization and edge deployment strategies are being explored to reduce server load.',
    color: 'neon-blue'
  },
  contact: {
    title: 'Creator Identity',
    status: 'VERIFIED',
    role: 'Full Stack Engineer',
    timeline: 'LIFETIME',
    stack: ['Human', 'Coffee', 'Code', 'Curiosity', 'Persistence'],
    overview: 'I am a software engineer specializing in immersive web experiences and scalable systems. I build things that live on the internet, whether that be websites, applications, or anything in between.',
    architecture: 'Built on a foundation of computer science principles and a passion for creative problem-solving. Always looking for the intersection of design and engineering.',
    performance: 'Consistently delivers high-quality code and innovative solutions under tight deadlines. Thrives in ambiguous environments.',
    tradeoffs: 'Occasionally sacrifices sleep for the perfect animation curve or to fix that one elusive bug.',
    scaling: 'Continuously learning new technologies and expanding skill set to tackle larger challenges. Currently exploring WebGL and Rust.',
    color: 'white'
  }
};

const getIconForSection = (title: string, colorClass: string) => {
  switch (title) {
    case 'Architecture': return <Server className={`text-${colorClass}`} size={24} />;
    case 'Performance': return <Zap className={`text-${colorClass}`} size={24} />;
    case 'Tradeoffs': return <Shield className={`text-${colorClass}`} size={24} />;
    case 'Scaling': return <Activity className={`text-${colorClass}`} size={24} />;
    default: return <Code2 className={`text-${colorClass}`} size={24} />;
  }
};

export default function ProjectView() {
  const { activeProject, returnToHub } = useSystemStore();
  const project = activeProject ? PROJECTS[activeProject] : null;

  if (!project) return null;

  const colorClass = project.color;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 font-sans text-gray-300 relative">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] bg-${colorClass}/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-${colorClass}/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3`} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <button
          onClick={returnToHub}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-12 font-mono text-sm uppercase tracking-wider group"
        >
          <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-1 transition-transform" />
          Return to Database
        </button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-flex items-center px-3 py-1 rounded-full border border-${colorClass}/30 bg-${colorClass}/10 text-${colorClass} text-xs font-mono uppercase mb-6`}
                >
                  <span className={`w-2 h-2 rounded-full bg-${colorClass} mr-2 animate-pulse`} />
                  STATUS: {project.status}
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                  {project.title}
                </h1>
                <p className={`text-xl font-mono text-${colorClass} opacity-80`}>
                  {project.role} <span className="text-gray-600 mx-2">|</span> {project.timeline}
                </p>
              </div>
            </div>

            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mt-8">
              {project.overview}
            </p>
          </header>

          {/* Tech Stack Marquee / Tags */}
          <div className="mb-16 pb-16 border-b border-white/10">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Technologies Deployed</h3>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech: string, i: number) => (
                <motion.span 
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (i * 0.05) }}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-sm hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { title: 'Architecture', content: project.architecture },
              { title: 'Performance', content: project.performance },
              { title: 'Tradeoffs', content: project.tradeoffs },
              { title: 'Scaling', content: project.scaling }
            ].map((section, i) => (
              <motion.section 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="relative"
              >
                <div className={`absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-${colorClass}/50 to-transparent opacity-20`} />
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <div className={`p-2 rounded-lg bg-${colorClass}/10 mr-4`}>
                    {getIconForSection(section.title, colorClass)}
                  </div>
                  {section.title}
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {section.content}
                </p>
              </motion.section>
            ))}
          </div>

          {activeProject === 'contact' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Ready to initiate sequence?</h2>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:matthew@escapedirector.com"
                  className="px-8 py-4 bg-white text-black rounded-full font-bold tracking-wide hover:scale-105 transition-transform flex items-center"
                >
                  <Zap className="mr-2" size={20} />
                  matthew@escapedirector.com
                </a>
                <a
                  href="#"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold tracking-wide hover:bg-white/10 transition-colors flex items-center"
                >
                  <Github className="mr-2" size={20} />
                  GitHub Profile
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
