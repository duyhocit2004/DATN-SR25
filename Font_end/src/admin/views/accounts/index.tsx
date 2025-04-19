import { useEffect } from "react";
import AccountFilter from "./AccountFilter";
import AccountTable from "./AccountTable";
import { useAppDispatch } from "@/store/hooks";
import { fetchAccounts } from "@/store/reducers/adminAccountSlice";

const AccountsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);


  return (
    <div className="list-account-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <AccountFilter />
      </div>

      <AccountTable />
    </div>
  );
};

export default AccountsPage;
