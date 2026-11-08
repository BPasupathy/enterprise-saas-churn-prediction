# Dataset

The dataset is generated locally by `scripts/generate_synthetic_dataset.py` and contains 3,000 simulated enterprise SaaS accounts. It is synthetic teaching data, not real customer telemetry or an industry benchmark. The churn outcome is generated from a transparent probability mechanism involving adoption, engagement, satisfaction, value realization and support indicators. Do not use the generated metrics for customer decisions.

Run `python scripts/generate_synthetic_dataset.py` from the repository root before running the notebooks. The generator uses random seed 42 and writes `data/raw/enterprise_saas_churn_synthetic.csv`.
