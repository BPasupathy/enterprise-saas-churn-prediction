"use client";

import { useMemo, useState } from "react";

const models = [
  { name: "Logistic Regression", cv: 0.642, precision: 0.438, recall: 0.837, f1: 0.575, ap: 0.650, auc: 0.898, color: "blue" },
  { name: "Hist Gradient Boosting", cv: 0.596, precision: 0.667, recall: 0.457, f1: 0.542, ap: 0.621, auc: 0.884, color: "violet" },
  { name: "Random Forest", cv: 0.593, precision: 0.528, recall: 0.707, f1: 0.605, ap: 0.603, auc: 0.881, color: "teal" },
  { name: "Decision Tree", cv: 0.526, precision: 0.361, recall: 0.663, f1: 0.467, ap: 0.463, auc: 0.816, color: "orange" },
];

const features = [
  { name: "License utilization", score: 0.19 },
  { name: "Customer satisfaction (CSAT)", score: 0.16 },
  { name: "QBR attendance", score: 0.13 },
  { name: "Days to renewal", score: 0.11 },
  { name: "Customer tier", score: 0.08 },
];

const raw = "https://raw.githubusercontent.com/BPasupathy/enterprise-saas-churn-prediction/main";
const repo = "https://github.com/BPasupathy/enterprise-saas-churn-prediction";

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="metric"><span className="metric-label">{label}</span><strong>{value}</strong><span className="metric-note">{note}</span></div>;
}

export default function Home() {
  const [activeMetric, setActiveMetric] = useState<"ap" | "recall" | "auc">("ap");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => models.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())), [search]);
  const metricLabel = activeMetric === "ap" ? "Average Precision" : activeMetric === "recall" ? "Recall" : "ROC-AUC";
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">S</span><span>Signal<span className="brand-muted"> / SaaS Intelligence</span></span></a>
        <nav><a href="#overview">Overview</a><a href="#models">Model performance</a><a href="#insights">Insights</a><a href="#methodology">Methodology</a></nav>
        <a className="repo-link" href={repo} target="_blank" rel="noreferrer">GitHub repository ↗</a>
      </header>

      <section className="hero" id="overview">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> CAPSTONE PROJECT 24.1 <span className="eyebrow-divider">/</span> ANALYTICS OVERVIEW</div>
          <h1>Understand churn.<br/><em>Protect recurring revenue.</em></h1>
          <p className="hero-description">An end-to-end machine learning study exploring the signals associated with enterprise SaaS customer churn and how Customer Success teams can prioritize proactive account reviews.</p>
          <div className="hero-actions"><a className="primary-button" href="#models">Explore model results <span>↘</span></a><a className="text-button" href={repo + "/blob/main/README.md"} target="_blank" rel="noreferrer">Read the project report ↗</a></div>
          <div className="hero-meta"><span>AUTHOR <b>Pasupathy Balagurunathan</b></span><span>DATASET <b>3,000 simulated accounts</b></span></div>
        </div>
        <div className="hero-visual" aria-label="Illustrative churn risk signal visualization">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="orbit orbit-three"></div>
          <div className="visual-core"><span>CHURN</span><strong>RISK</strong><small>INTELLIGENCE</small></div>
          <div className="signal signal-a"><span className="signal-dot"></span><span>ADOPTION</span><b>01</b></div>
          <div className="signal signal-b"><span className="signal-dot"></span><span>ENGAGEMENT</span><b>02</b></div>
          <div className="signal signal-c"><span className="signal-dot"></span><span>VALUE REALIZATION</span><b>03</b></div>
          <div className="visual-caption">SIGNALS → INSIGHTS → ACTION</div>
        </div>
      </section>

      <section className="notice"><span className="notice-icon">i</span><div><strong>Educational simulation — not a production churn model.</strong><p>The 3,000-account dataset and churn labels are synthetic. Results demonstrate analytical methods and do not represent real customer performance, industry benchmarks or causal relationships.</p></div></section>

      <section className="metrics-grid">
        <Metric label="ACCOUNTS ANALYZED" value="3,000" note="Synthetic enterprise SaaS records"/>
        <Metric label="SIMULATED CHURN RATE" value="15.27%" note="Minority-class prediction task"/>
        <Metric label="MODELS EVALUATED" value="04" note="Classification algorithms"/>
        <Metric label="BEST HOLDOUT ROC-AUC" value="0.898" note="Logistic Regression"/>
      </section>

      <section className="section" id="models">
        <div className="section-heading"><div><div className="eyebrow">01 / MODEL PERFORMANCE</div><h2>Compare the classifiers.</h2><p>Stratified 3-fold cross-validation and GridSearchCV were used for model selection. Average Precision was prioritized because churn is the minority class.</p></div><div className="metric-switch"><button className={activeMetric === "ap" ? "selected" : ""} onClick={() => setActiveMetric("ap")}>Avg. precision</button><button className={activeMetric === "recall" ? "selected" : ""} onClick={() => setActiveMetric("recall")}>Recall</button><button className={activeMetric === "auc" ? "selected" : ""} onClick={() => setActiveMetric("auc")}>ROC-AUC</button></div></div>
        <div className="performance-layout">
          <div className="chart-card"><div className="chart-title"><div><span className="small-label">HOLDOUT COMPARISON</span><h3>{metricLabel}</h3></div><span className="chart-unit">SCORE / 1.00</span></div>
            {models.map((m) => <div className="bar-row" key={m.name}><div className="bar-label"><span>{m.name}</span><b>{m[activeMetric].toFixed(3)}</b></div><div className="bar-track"><div className={"bar-fill " + m.color} style={{ width: (m[activeMetric] * 100) + "%" }} /></div></div>)}
            <div className="chart-foot"><span>0.00</span><span>0.25</span><span>0.50</span><span>0.75</span><span>1.00</span></div>
          </div>
          <div className="winner-card"><div className="winner-top"><span className="winner-icon">↗</span><span className="small-label">CROSS-VALIDATION LEADER</span></div><h3>Logistic<br/>Regression</h3><div className="winner-score">0.642 <span>mean CV Average Precision</span></div><p>Selected for the strongest mean cross-validated Average Precision. Its holdout recall is 0.837, making it useful for identifying a broad set of simulated churn-positive accounts.</p><div className="winner-foot">HOLDOUT ROC-AUC <b>0.898</b></div></div>
        </div>
        <div className="table-card"><div className="table-header"><div><span className="small-label">DETAILED RESULTS</span><h3>Holdout metrics by model</h3></div><input aria-label="Filter models" placeholder="Filter models..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="table-scroll"><table><thead><tr><th>MODEL</th><th>PRECISION</th><th>RECALL</th><th>F1 SCORE</th><th>AVG. PRECISION</th><th>ROC-AUC</th></tr></thead><tbody>{filtered.map((m) => <tr key={m.name}><td className="model-name">{m.name}</td><td>{m.precision.toFixed(3)}</td><td>{m.recall.toFixed(3)}</td><td>{m.f1.toFixed(3)}</td><td>{m.ap.toFixed(3)}</td><td>{m.auc.toFixed(3)}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section className="section insights-section" id="insights">
        <div className="section-heading"><div><div className="eyebrow">02 / WHAT THE MODEL LEARNED</div><h2>Signals associated with churn.</h2><p>Permutation importance estimates how much holdout Average Precision changes when each feature is shuffled. It is a model diagnostic, not evidence of causation.</p></div></div>
        <div className="insight-grid">
          <div className="chart-card importance-card"><div className="chart-title"><div><span className="small-label">PERMUTATION IMPORTANCE</span><h3>Top five features</h3></div><span className="chart-unit">RELATIVE IMPACT</span></div>
            {features.map((f, i) => <div className="feature-row" key={f.name}><span className="feature-index">0{i + 1}</span><div className="feature-content"><div className="feature-label"><span>{f.name}</span><b>{f.score.toFixed(2)}</b></div><div className="bar-track"><div className="bar-fill blue" style={{ width: (f.score / 0.2 * 100) + "%" }}/></div></div></div>)}
          </div>
          <div className="insight-notes"><div className="note-item"><span className="note-number">01</span><div><h3>Adoption matters</h3><p>License utilization is the strongest signal in the selected model. Low usage can prompt a review of adoption barriers and unused entitlements.</p></div></div><div className="note-item"><span className="note-number">02</span><div><h3>Experience is visible</h3><p>CSAT and support trends can help Customer Success teams identify accounts that need service recovery or closer engagement.</p></div></div><div className="note-item"><span className="note-number">03</span><div><h3>Renewal timing matters</h3><p>Use renewal proximity and QBR participation to prioritize timely account conversations—not to automate customer decisions.</p></div></div></div>
        </div>
        <div className="stat-strip"><div><span className="small-label">CHI-SQUARE TEST</span><strong>0.0056</strong><span>Customer tier p-value</span></div><div><span className="small-label">CRAMÉR'S V</span><strong>0.059</strong><span>Small association effect</span></div><div><span className="small-label">MANN–WHITNEY U</span><strong>5 signals</strong><span>Statistically different groups</span></div><p>Exploratory, unadjusted statistical tests on simulated data. Statistical significance does not establish practical importance or causality.</p></div>
      </section>

      <section className="section methodology-section" id="methodology">
        <div className="section-heading"><div><div className="eyebrow">03 / ANALYTICAL WORKFLOW</div><h2>From raw data to recommendations.</h2><p>A reproducible notebook-based workflow, with the report and generated artifacts maintained in the same repository.</p></div></div>
        <div className="workflow">
          {[["01","Business understanding & EDA","Audit the dataset, explore class balance, distributions and relationships."],["02","Feature preparation","Clean data, handle missing values, encode categories and prepare train/test splits."],["03","Model training & evaluation","Train four classifiers, tune hyperparameters and evaluate holdout performance."],["04","Inferential analysis","Test group differences and categorical associations; interpret findings with limitations."]].map((step) => <a className="workflow-step" key={step[0]} href={repo + "/blob/main/notebooks/" + (step[0] === "01" ? "01_business_understanding_and_eda.ipynb" : step[0] === "02" ? "02_feature_preparation.ipynb" : step[0] === "03" ? "03_model_training_and_evaluation.ipynb" : "04_inferential_analysis.ipynb")} target="_blank" rel="noreferrer"><span className="step-no">{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div><span className="step-arrow">↗</span></a>)}
        </div>
      </section>

      <section className="recommendation"><div className="eyebrow">04 / BUSINESS APPLICATION</div><h2>Turn risk signals into<br/><em>structured account action.</em></h2><p>For a real SaaS business, combine validated risk indicators with ARR at risk, renewal timing and Customer Success capacity. Use model scores to prompt human-led account reviews, then measure incremental retained ARR against intervention cost.</p><a href={repo + "/blob/main/README.md"} target="_blank" rel="noreferrer">Read recommendations and limitations ↗</a></section>

      <section className="resources"><div><span className="eyebrow">PROJECT RESOURCES</span><h2>Explore the underlying work.</h2></div><div className="resource-links"><a href={repo + "/blob/main/README.md"} target="_blank" rel="noreferrer">Project report <span>↗</span></a><a href={repo + "/tree/main/notebooks"} target="_blank" rel="noreferrer">Executed notebooks <span>↗</span></a><a href={raw + "/data/raw/enterprise_saas_churn_synthetic.csv"} target="_blank" rel="noreferrer">Synthetic dataset <span>↓</span></a><a href={repo + "/tree/main/data/processed"} target="_blank" rel="noreferrer">Processed results <span>↗</span></a><a href={repo + "/tree/main/images"} target="_blank" rel="noreferrer">EDA and model charts <span>↗</span></a></div></section>
      <footer><a className="brand" href="#"><span className="brand-mark">S</span><span>Signal<span className="brand-muted"> / SaaS Intelligence</span></span></a><span>CAPSTONE PROJECT 24.1 · SYNTHETIC DATA · 2026</span><a href={repo} target="_blank" rel="noreferrer">SOURCE ON GITHUB ↗</a></footer>
    </main>
  );
}
