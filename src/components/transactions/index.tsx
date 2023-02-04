import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useMemo, useState } from "react";
import { Transaction as TransactionType } from "../../../types";
import "./index.css";
import { TransactionsList } from "./list";

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

export const TransactionHistory = () => {
  const { isLoading, income, expenses } = useTransactions();

  return (
    <>
      <h1 className="align-left">Transaction History</h1>
      <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <TransactionsList
            ariaLabel="Expenses"
            isLoading={isLoading}
            transactions={expenses}
          />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <TransactionsList
            ariaLabel="Income"
            isLoading={isLoading}
            transactions={income}
          />
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
