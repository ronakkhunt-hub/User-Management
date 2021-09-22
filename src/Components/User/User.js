import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

// import { addEmployee, updateEmployee, deleteEmployee } from "../../Actions/Index";
import "./User.css"
import HeaderLink from "../Header/Link";
import { createApi, deleteApi, getUsers, updateApi } from "../../utils/axiosApi";
import { toast, ToastContainer } from "react-toastify";

const User = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [hobby, setHobby] = useState("");
  const [mode, setMode] = useState(null)
  const [selectedId, setSelectedId] = useState("")
  let [getApiData, setApiData] = useState([]);

  // const dispatch = useDispatch();
  const history = useHistory()
  // const employee = useSelector(state => state.EmpReducer.list)

  const forceUpdate = () => {
    getApiData = getApiData.filter((data) => {
      return data.id == selectedId
    })
  }

  const apiDataHandler = async () => {
    const userInfo = await getUsers({
      url: 'api/get-user',
    });
    setApiData(userInfo.data.data);
  }

  useEffect(() => {
    apiDataHandler();
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // const insertEmp = {
      //   id: employee.length + 1,
      //   firstName,
      //   lastName,
      //   email,
      //   // profile,
      //   description,
      //   hobby
      // }

      //   dispatch(addEmployee(insertEmp))
      //   employee.push(insertEmp)
      // } else {
      //   dispatch(updateEmployee({
      //     id: selectedId,
      //     firstName,
      //     lastName,
      //     email,
      //     // profile,
      //     description,
      //     hobby,
      //   }, selectedId))
      // }

      if (mode === 'Add') {
        await createApi({
          url: 'api/create-user',
        }, {
          firstName,
          lastName,
          email,
          description,
          hobby,
          password
        })
        setMode(null)
        forceUpdate()
      } else {
        await updateApi({
          url: `api/update-user/${selectedId}`,
        }, {
          firstName,
          lastName,
          email,
          description,
          hobby
        });
        setMode(null)
      }
    } catch (e) {
      console.log(`e`, e)
    }
  }

  async function deleteEmployeeData(_id) {
    await deleteApi({
      url: `api/delete-user/${_id}`,
    })
    toast('Data deleted successfully');
    setTimeout(() => {
      history.push("/user");
    }, 5000);
    // dispatch(deleteEmployee(id))
  }

  function updateEmployees(employee) {
    setSelectedId(employee._id)
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setHobby(employee.hobby);
    setPassword(employee.password);
    setDescription(employee.description);
    setMode('Edit')
  }

  function handleClickAdd() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setDescription('');
    setHobby('');
    setMode("Add")
  }

  function seprateUserHandle(id) {
    history.push(`/user/${id}`, { isFromParent: true });
  }

  const handleClose = () => {
    setMode(null);
  };

  return (
    <>
      <ToastContainer />
      <HeaderLink />
      <header>
        <div
          style={{
            display: "flex",
            backgroundColor: "#e3e3e3",
            justifyContent: "space-between",
            alignItems: "center",
            height: "75px",
          }}
        >
          <h2 style={{ marginLeft: "10px" }}>Amylesoft Employee</h2>
          <div style={{ marginRight: "40px" }}>
            <Button
              variant="contained"
              type="button"
              color="primary"
              onClick={() => handleClickAdd()}
            >
              Add
            </Button>
          </div>
        </div>
      </header>
      <div className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Profile</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Hobby</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getApiData && getApiData.map((result, i) => (
              <TableRow scope="row" key={i}>
                <TableCell className="label" align="center">
                  {result.firstName && result.firstName[0].toString().toUpperCase()}{result.lastName && result.lastName[0].toString().toUpperCase()}
                </TableCell>
                <TableCell align="center">{result.firstName} {result.lastName}</TableCell>
                <TableCell align="center">{result.email}</TableCell>
                <TableCell align="center"><img align="center" src={result.profile} width="80" height="80" style={{ marginTop: '15px' }} alt="Profile"></img></TableCell>
                <TableCell align="center">{result.description > 100 ? result.description.substring(0, 30).concat("...") : result.description}</TableCell>
                <TableCell align="center">{result.hobby}</TableCell>
                <TableCell align="center">
                  <span onClick={() => seprateUserHandle(result._id)}>
                    <VisibilityIcon style={{ marginRight: '10px' }} />
                  </span>
                  <Button variant="contained"
                    onClick={() => updateEmployees(result)}
                    color="primary">
                    <CreateIcon />
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="outlined"
                    color="primary"
                    onClick={() => deleteEmployeeData(result._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal in here */}
      <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={mode ? true : false}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {mode} Employee
          </DialogTitle>
          <form className="employee_form" onSubmit={(e) => handleSubmit(e)}>
            <DialogContent dividers>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
                autoComplete="off"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                required
                fullWidth
              />


              <TextField
                id="name"
                margin="dense"
                label="Last Name"
                autoComplete="off"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                required
                fullWidth
              />

              <TextField
                id="name"
                margin="dense"
                label="Email Address"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                fullWidth
              />


              <TextField
                id="description"
                margin="dense"
                label="Description"
                autoComplete="off"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                fullWidth
              />

              <TextField
                id="name"
                margin="dense"
                label="Hobby"
                value={hobby}
                autoComplete="off"
                onChange={(e) => setHobby(e.target.value)}
                type="text"
                fullWidth
              />

              <TextField
                id="password"
                margin="dense"
                label="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                fullWidth
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}
export default User;
