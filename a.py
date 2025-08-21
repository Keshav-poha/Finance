import plotly.graph_objects as go

# ==== Portfolio (Annualized) ====
portfolio_investment = 600000
portfolio_return = portfolio_investment * 0.10
portfolio_final = portfolio_investment + portfolio_return

# ==== Expenses (Annualized) ====
monthly_expense = 200000
annual_expense = monthly_expense * 12  # 24 lakh
spent = 150000 * 12  # 18 lakh
savings = annual_expense - spent  # 6 lakh

expense_categories = {
    "Rent & Utilities": 40000 * 12,
    "Groceries": 25000 * 12,
    "Transport": 15000 * 12,
    "Dining & Entertainment": 20000 * 12,
    "Shopping": 15000 * 12,
    "Healthcare": 10000 * 12,
    "Subscriptions & Bills": 5000 * 12,
    "Travel & Leisure": 20000 * 12,
}

# ==== Sankey Node Labels ====
labels = [
    "Portfolio", "Investments", "Profit", "Principal", "Final Value",
    "Income", "Expenses", "Savings"
] + list(expense_categories.keys())

# ==== Sankey Flows (Sources → Targets) ====
sources = []
targets = []
values = []

# Portfolio flows
sources += [0, 1, 1, 2]
targets += [1, 2, 3, 4]
values  += [portfolio_investment, portfolio_return, portfolio_investment, portfolio_final]

# Income flows
sources += [5, 6, 6]
targets += [6, 7, 8]
values  += [annual_expense, spent, savings]

# Expense breakdown
for i, (cat, amt) in enumerate(expense_categories.items()):
    sources.append(6)  # Expenses node
    targets.append(len(labels) - len(expense_categories) + i)  # category node
    values.append(amt)

# ==== Sankey Chart ====
fig = go.Figure(go.Sankey(
    node=dict(
        pad=20,
        thickness=25,
        line=dict(color="white", width=0.5),
        label=labels,
        color="rgba(0, 150, 255, 0.8)"
    ),
    link=dict(
        source=sources,
        target=targets,
        value=values,
        color="rgba(200,200,200,0.4)"
    )
))

fig.update_layout(
    title_text="Annual Portfolio & Expense Flow (Sankey Diagram)",
    font=dict(size=12, color="white"),
    plot_bgcolor="black",
    paper_bgcolor="black"
)

fig.show()
