import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useMemo, useState } from "react";
import { Transaction as TransactionType } from "../../../types";
import "./index.css";
import { Transaction } from "./item";

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

const Expenses = () => {
  const { isLoading, income, expenses } = useTransactions();

  if (isLoading || !expenses) {
    // TODO: loading state
    return null;
  }

  return (
    <table aria-label="Expenses">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

const Income = () => {
  const { isLoading, income, expenses } = useTransactions();

  if (isLoading || !income) {
    // TODO: loading state
    return null;
  }

  return (
    <table aria-label="Income">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {income.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

export const TransactionHistory = () => {
  return (
    <>
      <h1 className="align-left">Transaction History</h1>
      <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <Expenses />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <Income />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

function useTransactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null
  );

  const income = useMemo(() => {
    if (isLoading) {
      return null;
    }

    return transactions?.filter(isIncome);
  }, [isLoading, transactions]);

  const expenses = useMemo(() => {
    if (isLoading) {
      return null;
    }

    return transactions?.filter(isExpense);
  }, [isLoading, transactions]);

  useEffect(() => {
    // Stop reloading the transactions if they already exist.
    // TODO: confirm if this is correct, or if data should always
    // be refetched.
    if (transactions) {
      return;
    }

    setIsLoading(true);

    fetch("/api/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        return response.json();
      })
      .then((transactionsData) => {
        setTransactions(transactionsData);
      })
      .catch((e) => {
        // TODO: log this error
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { income, expenses, isLoading };
}
