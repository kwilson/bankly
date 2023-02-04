import { render, screen } from "@testing-library/react";
import { rest } from "msw";

import { TransactionHistory } from ".";
import { server } from "../../../jest.setup";
import { transactions } from "../../api/data/transactions";

describe("transaction history", () => {
  test("the expenses tab should be shown by default when loading", async () => {
    server.use(
      rest.get("/api/transactions", (req, res, ctx) =>
        res(ctx.status(200), ctx.json({}), ctx.delay("infinite"))
      )
    );

    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTab = screen.getByRole("tabpanel", {
      name: "Expenses",
    });

    expect(expensesTab).toHaveAttribute("aria-busy", "true");
    expect(expensesTab).toHaveAttribute("aria-live", "polite");

    expect(screen.getByTestId("loader")).toBeVisible();
    expect(screen.queryByRole("table")).toBeNull();
  });

  test("the expenses tab should be shown by default when loaded", async () => {
    server.use(
      rest.get("/api/transactions", (req, res, ctx) =>
        res(ctx.status(200), ctx.json(transactions))
      )
    );

    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTab = screen.getByRole("tabpanel", {
      name: "Expenses",
    });

    const expensesTable = await screen.findByRole("table", {
      name: "Expenses",
    });

    expect(expensesTab).toHaveAttribute("aria-busy", "false");
    expect(expensesTab).toHaveAttribute("aria-live", "polite");

    expect(screen.queryByTestId("loader")).toBeNull();
    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByText("-£20.25")).toBeInTheDocument();
  });

  test("the expenses tab should show an error when the API call fails", async () => {
    server.use(
      rest.get("/api/transactions", (req, res, ctx) => res(ctx.status(500)))
    );

    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTab = screen.getByRole("tabpanel", {
      name: "Expenses",
    });

    expect(await screen.findByRole("alert")).toBeVisible();

    expect(expensesTab).toHaveAttribute("aria-busy", "false");
    expect(expensesTab).toHaveAttribute("aria-live", "polite");

    expect(screen.queryByTestId("loader")).toBeNull();
    expect(screen.queryByRole("table")).toBeNull();
  });

  test.skip("changing between the expenses and income tabs should show different transactions", () => {
    render(<TransactionHistory />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    expect(screen.getByText("-£20.25")).toBeInTheDocument();

    incomeTabTrigger.click();

    expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
    expect(screen.queryByText("-20.25")).not.toBeInTheDocument();
  });
});
