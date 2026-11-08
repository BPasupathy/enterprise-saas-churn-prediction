from pathlib import Path
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "raw" / "enterprise_saas_churn_synthetic.csv"
OUT.parent.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(42)
n = 3000

industry = rng.choice(["Financial Services","Healthcare","Retail","Technology","Manufacturing","Telecom"], n, p=[.18,.16,.18,.22,.14,.12])
region = rng.choice(["North America","Europe","APAC","LATAM"], n, p=[.42,.27,.23,.08])
tier = rng.choice(["Enterprise","Mid-Market","SMB"], n, p=[.35,.40,.25])
tenure = rng.integers(3,85,n)
arr = np.where(tier=="Enterprise",rng.lognormal(14.1,.55,n),np.where(tier=="Mid-Market",rng.lognormal(12.4,.5,n),rng.lognormal(10.8,.45,n))).astype(int)
seats = np.maximum(10,(arr/rng.uniform(700,1600,n)).astype(int))
util = np.clip(rng.beta(5,3,n),.05,1)
dau = np.clip(.12+.72*util+rng.normal(0,.13,n),.02,1)
modules = np.clip(np.rint(util*8+rng.normal(0,1.4,n)),1,10).astype(int)
api = np.maximum(0,(util*12000+rng.normal(0,2600,n))).astype(int)
qbr = rng.integers(0,5,n)
csat = np.clip(np.rint(2.1+2.5*util+rng.normal(0,.9,n)),1,5).astype(int)
kpi = np.clip(util*.75+rng.normal(.12,.18,n),0,1)
workflows = np.maximum(0,(modules*9+rng.normal(0,12,n))).astype(int)
support = np.maximum(0,rng.poisson(3,n)+(util<.35)*3+(csat<3)*2).astype(int)
renewal = rng.integers(0,181,n)

# Synthetic label mechanism: lower adoption, engagement and value realization increase simulated risk.
logit = (-.5 + 5*(.5-util) + 2.5*(.35-dau) + .8*(3-csat) + .4*(2-qbr) + 1.5*(.35-kpi) + .025*support - .006*renewal + .5*(tier=="SMB") + .25*(tenure<12))
probability = 1/(1+np.exp(-logit))
churn = rng.binomial(1,probability)

df = pd.DataFrame({
    "account_id":[f"SAAS-{i:05d}" for i in range(1,n+1)],
    "industry":industry,"region":region,"customer_tier":tier,
    "tenure_months":tenure,"annual_recurring_revenue_usd":arr,"licensed_seats":seats,
    "license_utilization_pct":np.round(util*100,1),"dau_mau_ratio":np.round(dau,3),
    "active_modules":modules,"monthly_api_calls":api,"qbrs_attended_last_4":qbr,
    "csat_score":csat,"kpi_milestones_achieved_pct":np.round(kpi*100,1),
    "automated_workflows":workflows,"support_cases_last_90d":support,
    "days_to_renewal":renewal,"churned":churn
})
for col in ["csat_score","qbrs_attended_last_4","kpi_milestones_achieved_pct","monthly_api_calls"]:
    df.loc[rng.choice(n,int(.025*n),replace=False),col] = np.nan
df.to_csv(OUT,index=False)
print(f"Generated {len(df):,} synthetic accounts at {OUT}")
print(f"Simulated churn prevalence: {df['churned'].mean():.1%}")
