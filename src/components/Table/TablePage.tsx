import React from "react";
import "./Table.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTypedSelector } from "../../redux/typedHooks/useTypedSelector";
import axios from "axios";
import { BiSolidSave } from "react-icons/bi";
import { FaNapster } from "react-icons/fa";
import { TableCellType } from "../../redux/slices/tableSlice/tableTypes";
import { useAppDispatch } from "../../redux/store";
import { fetchTable } from "../../redux/slices/tableSlice/asyncActions";
import Pagination from "../Pagination/Pagination";

const TablePage = () => {
  const [newCellData, setNewCellData] = React.useState<TableCellType>({
    id: 0,
    name: "",
    email: "",
    birthday_date: "",
    phone_number: "",
  });
  const [openEditName, setOpenEditName] = React.useState<boolean>(false);
  const [openEditEmail, setOpenEditEmail] = React.useState<boolean>(false);
  const [openEditBirthday, setOpenEditBirthday] = React.useState<boolean>(false);
  const [openEditPhone, setOpenEditPhone] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [activePage, setActivePage] = React.useState<number>(0);
  const usersPerPage = 5;

  const { tableData } = useTypedSelector((state) => state.table);
  const dispatch = useAppDispatch();

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = tableData.slice(firstUserIndex, lastUserIndex);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  };

  React.useEffect(() => {
    function getData() {
      dispatch(fetchTable());
    }
    getData();
  }, []);

  const setEditCell = (
    name?: string,
    email?: string,
    id?: number,
    birthday?: string
  ) => {
    name
      ? setOpenEditName(true)
      : email
      ? setOpenEditEmail(true)
      : birthday
      ? setOpenEditBirthday(true)
      : setOpenEditPhone(true);

    const oldCell: any = tableData.find(
      (cell: TableCellType) => cell.id === id
    );
    setNewCellData(oldCell);
  };

  const onChangeCellName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCellData({ ...newCellData, name: e.target.value });
  };
  const onChangeCellEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCellData({ ...newCellData, email: e.target.value });
  };
  const onChangeCellBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCellData({ ...newCellData, birthday_date: e.target.value });
  };
  const onChangeCellPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCellData({ ...newCellData, phone_number: e.target.value });
  };

  const updateNewCell = () => {
    async function updateData() {
      axios
        .put(
          `https://technical-task-api.icapgroupgmbh.com/api/table/${newCellData.id}/`,
          {
            name: newCellData.name,
            email: newCellData.email,
            birthday_date: newCellData.birthday_date
              ? "1984-10-11"
              : newCellData.birthday_date,
            phone_number: newCellData.phone_number,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            alert("Succesful");
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.email) {
            alert("Error: " + error.response.data.email);
          }
          if (error.response.data.birthday_date) {
            alert("Введiть значення в форматi YYYY-MM-DD");
          } else {
          }
        });
    }
    updateData();
    setOpenEditName(false);
    setOpenEditEmail(false);
    setOpenEditBirthday(false);
    setOpenEditPhone(false);
    setNewCellData({
      id: 0,
      name: "",
      email: "",
      birthday_date: "",
      phone_number: "",
    });
    dispatch(fetchTable())
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((tableItem: TableCellType) => (
            <tr key={tableItem.id}>
              {!openEditName ? (
                <td
                  onClick={() =>
                    setEditCell(tableItem.name, "", tableItem.id, "")
                  }
                >
                  <p>{tableItem.name}</p>
                  <span>edit</span>
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    onChange={onChangeCellName}
                    placeholder={tableItem.name}
                  />
                  <BiSolidSave onClick={updateNewCell} />
                </td>
              )}
              {!openEditEmail ? (
                <td>
                  <p>{tableItem.email}</p>
                  <span
                    onClick={() =>
                      setEditCell("", tableItem.email, tableItem.id, "")
                    }
                  >
                    edit
                  </span>
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    onChange={onChangeCellEmail}
                    placeholder={tableItem.email}
                  />
                  <BiSolidSave onClick={updateNewCell} />
                </td>
              )}
              {!openEditBirthday ? (
                <td>
                  <p>{tableItem.birthday_date}</p>
                  <span
                    onClick={() =>
                      setEditCell("", "", tableItem.id, tableItem.birthday_date)
                    }
                  >
                    edit
                  </span>
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    onChange={onChangeCellBirthday}
                    placeholder={tableItem.birthday_date}
                  />
                  <BiSolidSave onClick={updateNewCell} />
                </td>
              )}
              {!openEditPhone ? (
                <td>
                  <p>{tableItem.phone_number}</p>
                  <span onClick={() => setEditCell("", "", tableItem.id, "")}>
                    edit
                  </span>
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    onChange={onChangeCellPhone}
                    placeholder={tableItem.phone_number}
                  />
                  <BiSolidSave onClick={updateNewCell} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <FaNapster />
        <FaNapster />
      </table>
      <Pagination
        activePage={activePage}
        totalUsers={tableData.length}
        usersPerPage={usersPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default TablePage;
