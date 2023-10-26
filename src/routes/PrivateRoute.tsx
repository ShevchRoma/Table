import React from "react";
import TablePage from "../components/Table/TablePage";
import Login from "../components/Login/Login";
import { useTypedSelector } from "../redux/typedHooks/useTypedSelector";

export const PrivateRoute = () => {
  const { message } = useTypedSelector((state) => state.auth);

  return message ? <TablePage /> : <Login />;
};
