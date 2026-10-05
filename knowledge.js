// Knowledge base for the portfolio chatbot.
// Each chunk is one self-contained fact set. Keep chunks short and specific:
// Cohere Rerank picks the best few per question, so narrow chunks = sharper answers.
// Edit this file whenever the resume changes.

const KNOWLEDGE = [
  // ---------- Identity & contact ----------
  { id: 'identity', title: 'Who Prathamesh is',
    text: 'Prathamesh Damle is a Databricks Certified Data Engineer with 4+ years of experience designing cloud-native data platforms, Spark pipelines, and lakehouse architectures. Over the past year he extended this into agentic AI, building autonomous pipelines and dark-factory-level workflows in production at Pythian. He is based in Mumbai, Maharashtra, India and works remotely.' },
  { id: 'contact', title: 'Contact details',
    text: 'Email: damlesprathamesh@gmail.com. Phone: +91 9867058318. LinkedIn: linkedin.com/in/prathamesh-damle. GitHub: github.com/dprathamesh. Location: Mumbai, India.' },
  { id: 'current-role', title: 'Current job',
    text: 'Prathamesh currently works at Pythian as a Data Engineer (Agentic AI), remote from India, since April 2026. He also works as a Teaching Assistant at the Canadian Institute of AI (CiAI) / DataSosi Edtech.' },
  { id: 'opportunities', title: 'What he is looking for',
    text: 'Prathamesh is focused on agentic AI in production data engineering: autonomous pipelines, agent governance, gate boundary architecture, and lakehouse platforms on Databricks and GCP. He is pursuing a DBA (Doctorate of Business Administration) in AI/ML, supported by Pythian\'s tuition benefit programme, researching governance frameworks for autonomous AI systems. He is open to speaking, writing, and collaboration on agentic AI governance and data platform modernization.' },

  // ---------- Pythian ----------
  { id: 'pythian-overview', title: 'Pythian role overview',
    text: 'At Pythian (April 2026 - Present, Data Engineer - Agentic AI, remote India), Prathamesh integrates agentic AI directly into client production data pipelines, building autonomous workflows that handle data movement, transformation and decision-making. The goal is dark-factory-level autonomy: the pipeline governs itself and human involvement is reserved for decisions machines cannot yet handle reliably.' },
  { id: 'pythian-deal-pipeline', title: 'Six-agent deal intelligence pipeline',
    text: 'At Pythian, Prathamesh built a 6-agent autonomous deal intelligence pipeline: Scout agent -> News, Finance, Jobs and Partner agents -> Evaluator -> Verifier. It monitors 300 companies overnight on GCP, detects buying signals, identifies decision-makers and delivers a ranked prospect list every morning. It has generated over $35 million in weighted sales pipeline at under $200 per month in operating cost.' },
  { id: 'gate-boundary', title: 'Gate boundary architecture / Verifier agent',
    text: 'Gate boundary architecture is Prathamesh\'s design pattern where a Verifier agent enforces a strict output contract before anything propagates downstream to the database or to other agents. It catches invalid scores and malformed outputs so bad results never cascade across agents. His principle: automate detection, never automate acceptance. The agent finds the problem; the human decides what the system learns from it. This is also the core subject of his doctoral research.' },
  { id: 'tsql-migration', title: 'TSQL to DBSQL agentic migration',
    text: 'At Pythian, Prathamesh built a TSQL-to-DBSQL agentic migration system. The agent translates legacy SQL Server stored procedures into Databricks SQL, verifies them against live Databricks infrastructure, and routes uncertain cases to human review instead of resolving ambiguity on its own.' },
  { id: 'articles', title: 'Published articles',
    text: 'Prathamesh has authored four articles published through Pythian: (1) intent verification and agentic AI governance in autonomous pipelines, (2) Spec-Driven Development (SDD) as an agent governance layer, (3) RAG failure modes in production data systems, and (4) metadata contracts that make RAG pipelines operable at scale.' },

  // ---------- Koantek ----------
  { id: 'koantek', title: 'Koantek role',
    text: 'At Koantek, a Databricks partner company (January 2026 - April 2026, Data Engineer, remote India), Prathamesh migrated legacy ETL to Databricks lakehouse solutions using PySpark, Delta Lake, Auto Loader and Databricks Workflows; performance-tuned Spark jobs (SparkSQL, DataFrame API, partitioning, Z-ordering, compaction); built CI/CD and GitOps pipelines with GitLab and Jenkins plus Terraform IaC modules; established data-quality frameworks (Great Expectations concepts) and observability (lineage, SLA alerts); led stakeholder discovery; and completed Databricks and GenAI certifications.' },

  // ---------- Mercor ----------
  { id: 'mercor', title: 'Mercor LLM evaluation work',
    text: 'At Mercor (October 2025 - December 2025, Generalist Evaluation Expert, remote), Prathamesh improved LLM task accuracy from 67% to 91% by creating 500+ reasoning-evaluation prompts, discovery queries and systematic error taxonomies for model fine-tuning. He built evaluation pipelines and metrics for RAG systems, defining failure modes and automated scoring that were used to improve retrieval and reduce hallucinations in production models.' },

  // ---------- Capgemini ----------
  { id: 'capgemini-overview', title: 'Capgemini role',
    text: 'At Capgemini (September 2021 - December 2024, Mumbai, India) Prathamesh was a Data Engineer / Associate (Python Lead) on the GE Lighting (Savant Company) project. He moved from SAP Business Objects and Data Services administration to leading the full migration of legacy SAP BODS infrastructure to a PySpark-based pipeline.' },
  { id: 'capgemini-migration', title: 'Capgemini SAP BODS migration',
    text: 'At Capgemini, Prathamesh migrated 25+ SAP BODS pipelines to cloud-ready Python/PySpark jobs orchestrated by Apache Airflow, implementing CDC, SCD Type II and partition strategies to handle 10M+ records per day and reducing latency by about 40%. He architected dimensional data models and production schemas, implemented schema evolution and versioning, automated data-quality checks and SLA-based alerting.' },
  { id: 'capgemini-devops', title: 'Capgemini CI/CD and other work',
    text: 'At Capgemini, Prathamesh built end-to-end CI/CD pipelines (unit/integration tests, Dockerized runs, GitLab CI) for automated Airflow DAG and Spark job deployments. He also worked with Redshift, built Flask APIs with AWS connectivity, ran sentiment analysis with NLP on CRM data, designed 25 ETL jobs moving warehouse data to HANA custom tables, delivered 20+ WebI reports, and ran POCs for Tableau, SAP Lumira and AWS Copy/Unload.' },

  // ---------- Teaching ----------
  { id: 'ciai-ta', title: 'Teaching at Canadian Institute of AI',
    text: 'Prathamesh is a Teaching Assistant at the Canadian Institute of AI (CiAI) / DataSosi Edtech, working under Professor Mark Lokanan. He builds tutorial courses on large language models, agentic system design, RAG pipelines and AI automation tooling (Make.com, n8n) distributed to learners globally, and has run boot camps on RAG systems and agentic workflow design for practitioners.' },
  { id: 'suny-ta', title: 'Teaching at SUNY Buffalo',
    text: 'During his Master\'s, Prathamesh was a Teaching Assistant for the SQL / Data Modification Query Language course at SUNY Buffalo (July 2025 - December 2025) under Dr. Shamsad Parvin, grading, holding office hours and supporting course instruction.' },

  // ---------- Entrepreneurship ----------
  { id: 'teraluna', title: 'Teraluna Tech Ventures',
    text: 'Prathamesh co-founded Teraluna Tech Ventures (vlink) LLP in his second year of engineering (February 2018 - June 2021) as Founder/Director. It built a blockchain-backed "hiring score" platform (like a credit score) to reduce offer shopping and dishonest hiring practices, closed high-ticket clients, delivered workforce to conglomerates and unicorns, and ran weekly technology workshops for grad students.' },
  { id: 'vardhan', title: 'Vardhan NGO',
    text: 'Prathamesh co-founded Vardhan, an NGO bringing gamified education to under-resourced schools near Mumbai.' },

  // ---------- Education ----------
  { id: 'ms-buffalo', title: 'Master\'s degree',
    text: 'Prathamesh holds an MS in Computer Science (AI/ML track) from the State University of New York at Buffalo (January 2025 - December 2025), completed in about 10 months on an accelerated credit load with a 3.98/4.0 GPA while carrying three concurrent research projects.' },
  { id: 'be-pillai', title: 'Bachelor\'s degree',
    text: 'Prathamesh holds a B.E. in Electronics and Telecommunication Engineering from Pillai College of Engineering, Mumbai University (August 2017 - June 2021), graduating 5th in rank with an 8.80 CGPA. He published a research paper at the CTFC national conference that also appeared in an IEEE magazine edition.' },

  // ---------- Research projects ----------
  { id: 'vadclip', title: 'VadCLIP fall detection research',
    text: 'Prathamesh extended VadCLIP (Video Anomaly Detection with CLIP) to detect falls as anomalies in video. He built an active-learning loop with Deep SVDD and used Focal Loss to handle severe class imbalance (only 2.67% fall frames across 171 training videos), reaching 97.6% AUC. Tech: Python, PyTorch, CLIP, OpenCV. Code: github.com/dprathamesh/Fall-Detection-using-OpenAI-CLIP.' },
  { id: 'graph-partition', title: 'Graph partitioning algorithm',
    text: 'Prathamesh designed a tree-based dynamic programming algorithm from scratch for graph partitioning because no existing algorithm could be adapted. He built the groupsneeded[v][t] recurrence, which traces optimal community assignments through a tree with explicit merge and no-merge decisions at every node.' },
  { id: 'pbpk', title: 'PBPK pharmacokinetic modelling',
    text: 'Prathamesh fit a Physiologically Based Pharmacokinetic (PBPK) model to mavoglurant data using nlmixr2 in R (SAEM/FOCEi), then applied a PyTorch Variational Autoencoder to discover latent patient phenotypes from individual random effects. He also modelled Alzheimer\'s biomarkers (ABETA, TAU, PTAU) and MS antioxidant enzymes with PK/PD differential equations on a 48K-row longitudinal dataset.' },
  { id: 'cloud-etl-lead', title: 'Cloud ETL modernization lead project',
    text: 'Prathamesh led a 5-person team to modernize SAP ETL into cloud microservices and Spark jobs on AWS with Airflow, adding CI/CD, monitoring and PyTorch inference in the pipeline. Result: about 80% infrastructure cost reduction and about 8 operations hours saved per week.' },
  { id: 'smart-attendance', title: 'Smart attendance system / Smart India Hackathon',
    text: 'Prathamesh led an MTCNN-based touchless automated attendance system (Python, SQLite) that works in crowded, low-light and moving environments. It placed 4th at the Smart India Hackathon, a national competition, and the work was published in IEEE.' },
  { id: 'tdsp', title: 'Transportation Data Science Project',
    text: 'In the Explorer Transportation Data Science Project (Northeast Big Data Innovation Hub and National Student Data Corps, October 2024 - January 2025, with the US DOT Federal Highway Administration), Prathamesh processed and engineered features from 1.8 million NYC collision records, automating cleaning that raised usable data from about 60% to 95%, and built ML models and a dashboard to predict crash likelihood at intersections. Code: github.com/dprathamesh/Transportation-Data-Science-Project.' },
  { id: 'other-projects', title: 'Other projects',
    text: 'Other projects include a Power BI dashboard collection (sales analytics, KPI tracking, DAX), an ML/AI algorithm library from the Boston Institute of Analytics (github.com/dprathamesh/BIA-ML), SUNY Buffalo coursework repos for Machine Learning and Data-Intensive Computing, an NGO volunteer management website, IoT home automation and game development projects.' },

  // ---------- Skills ----------
  { id: 'skills-languages', title: 'Programming languages',
    text: 'Languages and frameworks: Python (expert, 4+ years), PySpark and SparkSQL (expert), SQL (expert), R (intermediate, used for nlmixr2 pharmacokinetic modelling), Java (basic).' },
  { id: 'skills-cloud', title: 'Cloud and big data skills',
    text: 'Cloud and big data: Databricks (Delta Lake, Auto Loader, Workflows, Unity Catalog; Databricks Certified Data Engineer), GCP (BigQuery, Dataproc, Dataflow), AWS (S3, EMR, Redshift), Snowflake.' },
  { id: 'skills-orchestration', title: 'Orchestration, ETL and DevOps skills',
    text: 'Orchestration and ETL: Apache Airflow, DBT concepts, CDC and SCD patterns, batch and streaming design. DevOps and IaC: Git/GitHub/GitLab, GitOps practices, GitLab CI/CD, Jenkins, Docker, Terraform. Data quality: Great Expectations concepts, lineage, SLA alerting and observability.' },
  { id: 'skills-agentic', title: 'Agentic AI and LLM skills',
    text: 'Agentic AI and LLM: LangChain, LangGraph, OpenAI APIs, RAG system design, Spec-Driven Development (SDD), agent orchestration and gate boundary architecture, Make.com, n8n, Supabase, pgvector, prompt engineering, LLM evaluation frameworks.' },

  // ---------- Certifications ----------
  { id: 'certifications', title: 'Certifications',
    text: 'Certifications: Databricks Certified Data Engineer and Databricks GenAI certifications (2026); Machine Learning Specialization, Stanford Online / Andrew Ng (2024); Data Structures and Algorithms, Amazon (2024); Advanced Data Structures in Java, UC San Diego (2024); Machine Learning, Data Science & AI, Boston Institute of Analytics (2024); Data Structures & Algorithms, University of Colorado Boulder (2023); Google Data Analytics Professional Certificate (2023); SAP Analytics Cloud Practitioner, Snowflake Essentials and L0 Architect (2021-2024).' },

  // ---------- Research interests / DBA ----------
  { id: 'dba-research', title: 'Doctoral research interests',
    text: 'Prathamesh is pursuing a DBA in Artificial Intelligence and Machine Learning, supported by Pythian\'s tuition benefit programme. His research asks how to design, formalise and govern gate boundaries in autonomous agent systems: how to define what an agent is authorised to decide, how to design agreement metrics that surface uncertainty before it propagates, and how human judgment transfers progressively into a system until autonomous (dark-factory) operation is responsible rather than merely convenient. He notes only about 16% of organisations that deploy AI productionise it correctly, and sees the gap as governance, not capability.' },

  // ---------- Personal ----------
  { id: 'personal', title: 'Personal interests',
    text: 'Outside work Prathamesh plays badminton, has tutored maths, created content, and spent years volunteering. His drive comes from solving real problems, which started with wanting to build a pay-per-session platform for students at his uncle\'s coaching centre.' },
];

module.exports = { KNOWLEDGE };
