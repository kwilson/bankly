import type { Account } from "../../../types";
import { format } from "../../utils/currencyFormatter";
import "./index.css";

type Props = {
  account: Account;
};

export const AccountItem = ({ account }: Props) => {
  return (
    <div className="account">
      <div className="total">Total {account.balance.amount.currency}</div>
      <strong>
        {format(account.balance.amount.value, account.balance.amount.currency)}
      </strong>
    </div>
  );
};
