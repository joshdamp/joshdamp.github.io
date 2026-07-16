import { memo, useMemo, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import './Practicum.css';

const Practicum = memo(() => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'projects', 'takeaways'

  const metaDetails = useMemo(() => [
    { label: 'Role', value: 'Observability Intern' },
    { label: 'Host Establishment', value: 'Globe Telecom Inc.' },
    { label: 'Division / Team', value: 'Service Operations, Observability Team' },
    { label: 'Supervisor', value: 'RJ Mendiola (VP of Operations)' },
    { label: 'Inclusive Dates', value: 'June 1 – July 27, 2026' },
    { label: 'Hours Rendered', value: '480 Hours' }
  ], []);

  const trainingPhases = useMemo(() => [
    {
      phase: 'Phase A: Onboarding',
      hours: '120h',
      focus: 'LGTM Stack Telemetry',
      details: 'Trained on Grafana Loki, Mimir, and Tempo. Configured local Python environments and Wireless ADB.'
    },
    {
      phase: 'Phase B: Auditing',
      hours: '80h',
      focus: 'Network & CGNAT Routing',
      details: 'Audited cellular subnet routing and investigated Carrier-Grade NAT traversal issues.'
    },
    {
      phase: 'Phase C: Development',
      hours: '256h',
      focus: 'FastAPI Backend & Probes',
      details: 'Built the FastAPI backend, Streamlit controls, diagnostic probes, and configured database schemas.'
    },
    {
      phase: 'Phase D: Delivery',
      hours: '24h',
      focus: 'Runbooks & Presentation',
      details: 'Authored design runbooks and presented MTTR latency benchmarks to operations VP.'
    }
  ], []);

  const cesvDiagnostics = useMemo(() => [
    {
      title: 'SMS Loopback Latency',
      description: 'Measures end-to-end SMS transit speed using Android and iOS shortcut loops.'
    },
    {
      title: 'USSD Balance Inquiry',
      description: 'Invokes terminal USSD commands to verify billing database responsiveness.'
    },
    {
      title: 'DNS Resolution Testing',
      description: 'Measures lookup latency using cellular DNS servers to flag carrier issues.'
    },
    {
      title: 'HTTPS Secure Testing',
      description: 'Validates secure TLS/SSL handshake speeds to core Globe subscriber portals.'
    },
    {
      title: 'Download Speed Probe',
      description: 'Measures downlink throughput over cellular carriers using a 10MB payload.'
    },
    {
      title: 'Pre-flight ADB Utility',
      description: 'CLI tool to verify path and socket connection stability before diagnostic runs.'
    }
  ], []);

  const projectHelioDetails = useMemo(() => [
    {
      title: 'Ingestion Webhook',
      details: 'FastAPI webhook receiving real-time Alertmanager telemetry rules.'
    },
    {
      title: 'PostgreSQL Mapping',
      details: 'Database schema mapping telemetry alerts to user-facing frontend services.'
    },
    {
      title: 'Admin Override Gateway',
      details: 'JWT-secured operations dashboard allowing manual status state changes.'
    },
    {
      title: 'Kubernetes Expiry CronJob',
      details: 'Background job that automatically expires manual overrides after 2 hours.'
    }
  ], []);

  return (
    <div className="practicum-container">
      
      {/* 1. Main Header Title */}
      <section className="section-inner pt-16 pb-8 text-center">
        <ScrollReveal enableBlur={true} blurStrength={6} y={20} duration={0.8}>
          <span className="subtitle-brand-centered">Practicum Engagement</span>
          <h1 className="practicum-main-title font-poppins">Globe Telecom</h1>
        </ScrollReveal>
      </section>

      {/* 2. Interactive Navigation Tabs */}
      <section className="section-inner pb-12 flex justify-center">
        <ScrollReveal enableBlur={true} y={10} duration={0.6}>
          <div className="tab-menu">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`tab-menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('projects')} 
              className={`tab-menu-item ${activeTab === 'projects' ? 'active' : ''}`}
            >
              Initiatives
            </button>
            <button 
              onClick={() => setActiveTab('takeaways')} 
              className={`tab-menu-item ${activeTab === 'takeaways' ? 'active' : ''}`}
            >
              Takeaways
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Tab Contents */}
      <div className="tab-content-wrapper pb-28">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <ScrollReveal enableBlur={true} y={20} duration={0.8}>
            <div className="section-inner space-y-20">
              
              {/* Split Hero Banner */}
              <div className="split-hero">
                <div className="hero-left">
                  <div className="hero-intro">
                    <h2 className="hero-subtitle font-poppins">Observability & Systems Automation</h2>
                    <p className="hero-desc">
                      A 480-hour engineering practicum inside Globe Telecom's Observability Team. Focused on automating network diagnostic hardware and building status page orchestration microservices.
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="meta-grid">
                    {metaDetails.map((item, idx) => (
                      <div key={idx} className="meta-item">
                        <span className="meta-label">{item.label}</span>
                        <p className="meta-value">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero-right">
                  <div className="glass-card">
                    <div className="logo-frame">
                      <img 
                        src="/images/globetel.png" 
                        alt="Globe Telecom Logo" 
                        className="globe-logo"
                      />
                    </div>
                    <div className="glass-card-info">
                      <h3 className="card-comp-name font-poppins">Globe Telecom Inc.</h3>
                      <p className="card-comp-sub">Host Organization</p>
                      <p className="card-comp-dept">Service Operations Division</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Context */}
              <div className="context-split border-t border-custom pt-16">
                <div className="editorial-item">
                  <span className="meta-label">Enterprise Context</span>
                  <h3 className="editorial-title font-poppins">Globe IT Landscape</h3>
                  <p className="editorial-desc">
                    Globe operates massive telecommunications and mobile data network infrastructures. Maintaining operational availability is managed by the Service Operations Division.
                  </p>
                </div>

                <div className="editorial-item">
                  <span className="meta-label">Observability Strategy</span>
                  <h3 className="editorial-title font-poppins">"Shift-Left" Philosophy</h3>
                  <p className="editorial-desc">
                    The Observability Team maintains **Clairvoyance**, Globe's unified telemetry hub built on the Grafana LGTM Stack. The team champions "Shift-Left" telemetry early in development cycles.
                  </p>
                </div>
              </div>

              {/* Timeline phases */}
              <div className="timeline-section border-t border-custom pt-16">
                <h3 className="timeline-section-title font-poppins">Internship Timeline</h3>
                <div className="timeline-clean-flow">
                  {trainingPhases.map((phase, idx) => (
                    <div key={idx} className="timeline-flow-item">
                      <div className="timeline-flow-header">
                        <span className="flow-hours">{phase.hours}</span>
                        <span className="flow-phase-tag">Phase 0{idx + 1}</span>
                      </div>
                      <h4 className="flow-title font-poppins">{phase.phase}</h4>
                      <p className="flow-focus">{phase.focus}</p>
                      <p className="flow-details">{phase.details}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollReveal>
        )}

        {/* TAB 2: INITIATIVES */}
        {activeTab === 'projects' && (
          <ScrollReveal enableBlur={true} y={20} duration={0.8}>
            <div className="section-inner space-y-24">
              
              {/* CESV */}
              <div className="initiative-block">
                <div className="editorial-item max-w-3xl mb-12">
                  <span className="meta-label">Initiative #01</span>
                  <h2 className="initiative-title font-poppins">Customer Experience Simulation & Validation (CESV)</h2>
                  <p className="editorial-desc">
                    Automates connectivity diagnostics directly from a subscriber perspective. The service coordinates physical test devices over Wireless ADB to execute diagnostic tests and log performance data.
                  </p>
                </div>

                {/* Diagnostics Grid - Editorial Design */}
                <div className="diag-editorial-grid">
                  {cesvDiagnostics.map((diag, idx) => (
                    <div key={idx} className="editorial-grid-item">
                      <span className="grid-item-index">0{idx + 1}</span>
                      <h4 className="grid-item-title font-poppins">{diag.title}</h4>
                      <p className="grid-item-desc">{diag.description}</p>
                    </div>
                  ))}
                </div>

                {/* CGNAT Roadblock Box */}
                <div className="cgnat-clean-box mt-12">
                  <h4 className="cgnat-clean-title font-mono uppercase">
                    Scaling Roadblock: Carrier-Grade NAT (CGNAT)
                  </h4>
                  <p className="cgnat-clean-desc">
                    Cellular networks block incoming sockets, preventing command pushes to ADB. Pivoted architecture to outbound polling client agents executing inside Termux (HTTP GET /agent/jobs).
                  </p>
                </div>
              </div>

              {/* Project Helio */}
              <div className="initiative-block border-t border-custom pt-16">
                <div className="editorial-item max-w-3xl mb-12">
                  <span className="meta-label">Initiative #02</span>
                  <h2 className="initiative-title font-poppins">Project Helio: Status Page Automation</h2>
                  <p className="editorial-desc">
                    An automated incident mapper that parses alerts routed from Clairvoyance (Alertmanager webhooks) to publish service degradation status changes to external dashboards.
                  </p>
                </div>

                {/* Components Grid */}
                <div className="helio-editorial-grid">
                  {projectHelioDetails.map((item, idx) => (
                    <div key={idx} className="editorial-grid-item">
                      <span className="grid-item-index">0{idx + 1}</span>
                      <h4 className="grid-item-title font-poppins">{item.title}</h4>
                      <p className="grid-item-desc">{item.details}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollReveal>
        )}

        {/* TAB 3: TAKEAWAYS */}
        {activeTab === 'takeaways' && (
          <ScrollReveal enableBlur={true} y={20} duration={0.8}>
            <div className="section-inner">
              <div className="outcomes-editorial-grid">
                
                {/* Tech Skills */}
                <div className="outcomes-column">
                  <h3 className="outcomes-header font-mono uppercase tracking-wider">
                    Technical Skills Gained
                  </h3>
                  <div className="editorial-list">
                    <div className="editorial-list-item">
                      <h4 className="list-item-title font-poppins">LGTM Telemetry Management</h4>
                      <p className="list-item-desc">
                        Grafana Loki streams, metrics aggregation in Mimir, distributed tracing in Tempo, and Alertmanager routing.
                      </p>
                    </div>
                    <div className="editorial-list-item">
                      <h4 className="list-item-title font-poppins">API Engineering & Schemas</h4>
                      <p className="list-item-desc">
                        FastAPI microservices, path protection via JWT headers, and SQLAlchemy mapping with Postgres.
                      </p>
                    </div>
                    <div className="editorial-list-item">
                      <h4 className="list-item-title font-poppins">Mobile Infrastructure Automation</h4>
                      <p className="list-item-desc">
                        Hardware diagnostic triggers using ADB shell parameters, terminal queries, and script builders.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Takeaways */}
                <div className="outcomes-column">
                  <h3 className="outcomes-header font-mono uppercase tracking-wider">
                    Engineering Takeaways
                  </h3>
                  <div className="editorial-list">
                    <div className="editorial-list-item">
                      <h4 className="list-item-title font-poppins">Hardening for Production</h4>
                      <p className="list-item-desc">
                        Local configurations are only the baseline. Production systems must traverse NAT boundaries and network instability.
                      </p>
                    </div>
                    <div className="editorial-list-item">
                      <h4 className="list-item-title font-poppins">Automated Task Safeguards</h4>
                      <p className="list-item-desc">
                        Microservice scheduling failsafes (like Kubernetes CronJobs) are necessary to automatically expire overrides.
                      </p>
                    </div>
                    <div className="editorial-list-item">
                      <h4 className="list-item-title font-poppins">Deliverable Integrity</h4>
                      <p className="list-item-desc">
                        Comprehensive operational design sheets and runbooks are vital to sustain system maintainability in large teams.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        )}

      </div>

    </div>
  );
});

Practicum.displayName = 'Practicum';

export default Practicum;
