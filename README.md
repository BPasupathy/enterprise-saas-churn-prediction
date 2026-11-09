# Enterprise SaaS Churn Risk — Capstone Project 24.1

**Author:** Pasupathy Balagurunathan  
**Assignment:** Required Capstone Project 24.1 — Final Report

## Executive summary

This capstone demonstrates a complete analytical workflow for exploring and classifying churn outcomes among enterprise SaaS accounts. It covers business understanding, data quality, exploratory analysis, feature preparation, four classification algorithms, cross-validation, hyperparameter tuning, holdout evaluation, permutation importance and exploratory statistical tests.

**Important data limitation:** The 3,000-account dataset is synthetic and the churn label is generated from a documented simulation mechanism using adoption, engagement, satisfaction, value-realization and support signals. These results demonstrate analytical methods only. They are not evidence of real-world predictive performance, causal relationships or industry churn benchmarks.

## Business problem and research question

Customer churn and downgrade can reduce recurring revenue and customer lifetime value. Customer Success teams need a consistent way to prioritize proactive account reviews.

**Research question:** Can account profile, product adoption, engagement and value-realization indicators distinguish simulated churn outcomes, and which classifier provides the most useful ranking of potentially at-risk accounts?

## Results

The four classifiers were evaluated using stratified 3-fold cross-validation and GridSearchCV. Average Precision (the area under the precision-recall curve, or PR-AUC) was used for model selection because the positive class is the minority class and missed churn cases matter to the retention use case.

### Cross-validation results

| Model | Mean CV Average Precision |
|---|---:|
| Logistic Regression | **0.642** |
| Hist Gradient Boosting | 0.596 |
| Random Forest | 0.593 |
| Decision Tree | 0.526 |

Logistic Regression was selected based on the highest mean cross-validated Average Precision.

### Holdout results

| Model | Precision | Recall | F1 | Average Precision | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.438 | **0.837** | 0.575 | **0.650** | **0.898** |
| Hist Gradient Boosting | **0.667** | 0.457 | 0.542 | 0.621 | 0.884 |
| Random Forest | 0.528 | 0.707 | **0.605** | 0.603 | 0.881 |
| Decision Tree | 0.361 | 0.663 | 0.467 | 0.463 | 0.816 |

Logistic Regression has the highest recall and Average Precision in this run. At the default 0.50 threshold, it identifies approximately 84% of churn-positive holdout accounts, while its 0.438 precision means many flagged accounts are not churn-positive under the simulation. Random Forest has the highest F1, and Hist Gradient Boosting has the highest precision. Threshold selection therefore depends on the cost of missed churn versus the Customer Success capacity required to review flagged accounts.

### Model interpretation

The five strongest permutation-importance signals for the selected model were:

1. License utilization
2. Customer satisfaction (CSAT)
3. Quarterly business review attendance
4. Days to renewal
5. Customer tier

Permutation importance measures the change in holdout Average Precision when a feature is shuffled. It is a model diagnostic, not evidence that a feature causes churn. These patterns are expected to some extent because related signals were used to generate the synthetic target.

## Exploratory statistical findings

Notebook 04 compares selected features between simulated churned and retained accounts and tests categorical associations.

- License utilization, DAU/MAU ratio, CSAT, support case volume and days to renewal differ statistically between the two simulated outcome groups (Mann–Whitney U tests).
- Customer tier has a statistically detectable association with the simulated outcome (chi-square p = 0.0056), but Cramér's V is small (0.059).
- Industry and region are not statistically associated with the simulated outcome in these tests.
- These are exploratory, unadjusted tests on synthetic data. Statistical significance does not imply practical importance or causality.

The detailed results are saved in [inferential_tests.csv](data/processed/inferential_tests.csv).

## Methodology

1. Generate and audit 3,000 synthetic account records; inspect missing values, duplicates and class balance.
2. Explore categorical and continuous variables using labelled visualizations.
3. Exclude account identifiers; stratify the train/test split.
4. Impute missing numeric and categorical values within pipelines; scale numeric variables and one-hot encode categorical variables.
5. Compare Logistic Regression, Decision Tree, Random Forest and HistGradientBoosting.
6. Tune hyperparameters with stratified 3-fold GridSearchCV using Average Precision.
7. Evaluate the selected models on a holdout set using precision, recall, F1, Average Precision and ROC-AUC.
8. Interpret the selected model using permutation importance and run exploratory statistical tests.

## Business recommendations

For a real SaaS business, use product adoption, engagement, customer satisfaction, value-realization and support trends as prompts for structured account reviews—not as automatic churn decisions.

Recommended operational approach:

- Establish consistent account-level definitions for churn, downgrade, renewal and observation windows.
- Prioritize accounts using a combination of risk score, ARR at risk, renewal proximity and Customer Success capacity.
- Trigger targeted reviews to investigate adoption barriers, unresolved support issues and value-realization gaps.
- Record interventions and outcomes so that retention effectiveness can be measured.
- Evaluate incremental retained ARR against intervention cost before scaling the approach.

## Limitations and next steps

- The data and labels are synthetic; model metrics are not evidence of production readiness.
- The target is generated using related input signals, so the exercise tests whether models can recover a known simulation pattern.
- A random train/test split demonstrates the workflow but does not simulate future-period forecasting.
- A production study requires historical customer data with clearly defined observation and churn windows, leakage controls and temporal validation.
- Further work should include probability calibration, segment-level evaluation, threshold selection based on business costs, human review and a controlled pilot measuring incremental retained ARR.

## Repository structure

```text
enterprise-saas-churn-prediction/
├── README.md
├── requirements.txt
├── data/
│   ├── README.md
│   └── processed/
│       ├── cross_validation_results.csv
│       ├── holdout_model_metrics.csv
│       ├── permutation_importance.csv
│       └── inferential_tests.csv
├── scripts/
│   └── generate_synthetic_dataset.py
└── notebooks/
    ├── 01_business_understanding_and_eda.ipynb
    ├── 02_feature_preparation.ipynb
    ├── 03_model_training_and_evaluation.ipynb
    └── 04_inferential_analysis.ipynb
```

## Notebooks

- [01 — Business understanding and exploratory data analysis](notebooks/01_business_understanding_and_eda.ipynb)
- [02 — Feature preparation](notebooks/02_feature_preparation.ipynb)
- [03 — Model training and evaluation](notebooks/03_model_training_and_evaluation.ipynb)
- [04 — Inferential analysis](notebooks/04_inferential_analysis.ipynb)

## Run locally

Install dependencies from `requirements.txt`, then run the notebooks in numerical order from the repository root. Notebook 01 generates the synthetic CSV when it is missing. Notebook 03 writes the model metrics and permutation-importance summaries to `data/processed/`; Notebook 04 writes the inferential test results. EDA and model charts are saved under `images/`.

```bash
python -m pip install -r requirements.txt
jupyter lab
```


## Deploy the interactive dashboard to Vercel

The repository now includes a Next.js dashboard at the project root. It presents the model comparison, holdout metrics, feature-importance signals, statistical findings and links to the executed notebooks and generated artifacts.

**Deploy steps**

1. Push this repository to GitHub (the dashboard is already committed to `main`).
2. Sign in to [Vercel](https://vercel.com/) and select **Add New → Project**.
3. Import `BPasupathy/enterprise-saas-churn-prediction` from GitHub.
4. Keep **Root Directory** as `./`.
5. Select **Next.js** as the framework preset.
6. Use `npm run build` as the build command and leave the output directory at its default.
7. Select **Deploy**.

Vercel will install the dependencies from `package.json` and build the dashboard. The dashboard is a read-only presentation of the committed analysis; model training remains in the Python notebooks and is not run as a live prediction API.

### Dashboard structure

```text
app/
├── globals.css
├── layout.tsx
└── page.tsx
package.json
tsconfig.json
next.config.ts
next-env.d.ts
```

The dashboard links to the source report, notebooks, synthetic dataset, processed metrics and charts in this repository. All results must be interpreted in light of the synthetic-data limitation described above.
