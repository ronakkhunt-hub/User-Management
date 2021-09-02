import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { addEmployee, updateEmployee, deleteEmployee } from "../../Actions/Index";
import "./User.css"

const headerStyle = {
  color: "rgb(1,40,200)",
  boxShadow: "2px 2px 10px #000",
};

const User = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [description, setDescription] = useState("");
  const [hobby, setHobby] = useState("");
  const [mode, setMode] = useState(null)
  const [selectedId, setSelectedId] = useState("")

  const dispatch = useDispatch();
  const employee = useSelector(state => state.EmpReducer.list)

  function handleSubmit(e) {
    e.preventDefault();
    const insertEmp = {
      id: employee.length + 1,
      firstName,
      lastName,
      email,
      profile,
      description,
      hobby
    }

    if (mode === 'Add') {
      dispatch(addEmployee(insertEmp))
      employee.push(insertEmp)
    } else {
      dispatch(updateEmployee({
        id: selectedId,
        firstName,
        lastName,
        email,
        profile,
        description,
        hobby,
      }, selectedId))
    }

    setMode(null)
  }

  function deleteEmployeeData(id) {
    dispatch(deleteEmployee(id))
  }

  function updateEmployees(employee) {
    setSelectedId(employee.id)
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setHobby(employee.hobby);
    setProfile(employee.profile);
    setDescription(employee.description);
    setMode('Edit')
  }

  function handleClickAdd() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setProfile('');
    setDescription('');
    setHobby('');
    setMode("Add")
  }

  const handleClose = () => {
    setMode(null);
  };

  return (
    <>
      <header style={headerStyle}>
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
      <div style={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table style={{ fontSize: "35px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SR No</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Profile</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Hobby</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee && employee.map((result, i) => (
                <TableRow scope="row" key={result.email}>
                  <TableCell align="center" component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center">{result.firstName}</TableCell>
                  <TableCell align="center">{result.lastName}</TableCell>
                  <TableCell align="center">{result.email}</TableCell>
                  <TableCell align="center"><img align="center" src={result.profile} width="80" height="80" style={{ marginTop: '15px' }} alt="Profile"></img></TableCell>
                  <TableCell align="center">{result.description.length > 100 ? result.description.substring(0, 40).concat("...") : result.description}</TableCell>
                  <TableCell align="center">{result.hobby}</TableCell>
                  <TableCell align="center">
                    <Link to={`${result.id}`}>
                    <VisibilityIcon style={{ marginRight: '10px' }} />
                      </Link>
                    <Button variant="contained"
                      onClick={() => updateEmployees(result)}
                      color="primary">
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="outlined"
                      color="primary"
                      onClick={() => deleteEmployeeData(result.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={mode ? true : false}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle id="form-dialog-title">{mode} Employee</DialogTitle>
          <DialogContent>

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
              id="profile"
              margin="dense"
              label="Profile"
              autoComplete="off"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              type="text"
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
    </>
  );
}
export default User;
