import { Transaction as TransactionType } from "../../../types";
import { Loading } from "../loading";
import { Transaction } from "./item";

interface TransactionsListProps {
  ariaLabel?: string;
  isLoading?: boolean;
  transactions?: TransactionType[] | null;
}

export const TransactionsList = ({
  isLoading,
  transactions,
  ariaLabel,
}: TransactionsListProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <table aria-label={ariaLabel}>
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};
