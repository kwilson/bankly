import { Transaction as TransactionType } from "../../../types";
import { Loading } from "../loading";
import { Transaction } from "./item";

interface TransactionsListProps {
  ariaLabel?: string;
  error?: string | false;
  isLoading?: boolean;
  transactions?: TransactionType[] | null;
}

export const TransactionsList = ({
  ariaLabel,
  error,
  isLoading,
  transactions,
}: TransactionsListProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
      </div>
    )
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
