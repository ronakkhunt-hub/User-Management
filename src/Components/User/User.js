import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FormControl, InputGroup, Modal, Table } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import * as Icon from 'react-bootstrap-icons';

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

  const history = useHistory()

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
      if (mode === 'Add') {
        const addData = await createApi({
          url: 'api/create-user',
        }, {
          firstName,
          lastName,
          email,
          description,
          hobby,
          password
        })
        setApiData([ ...getApiData, addData.data.data  ])
      } else {
        const updateData = await updateApi({
          url: `api/update-user/${selectedId}`,
        }, {
          firstName,
          lastName,
          email,
          description,
          hobby
        });
        const updateIndex = getApiData.findIndex((item) => item._id === updateData.data.data?._id)
        getApiData[updateIndex] = updateData.data.data
      }
    } catch (e) {
      console.log(`e`, e)
    }
    setMode(null)
  }

  async function deleteEmployeeData(_id) {
    try {
      const deleteData = await deleteApi({
        url: `api/delete-user/${_id}`,
      })
      const findEmp = getApiData.filter((item) => item._id !== deleteData.data.data?._id)
      setApiData(findEmp)
      toast('Data deleted successfully');
    } catch (err) {
      toast('You have not permission to access!', {
        autoClose: 3000
      });
    }
  }

  function updateEmployees(employee) {
    setSelectedId(employee._id)
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setHobby(employee.hobby);
    setPassword(employee.password);
    setDescription(employee.description);
    setMode("Update")
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
      <ToastContainer position="bottom-left" />
      <HeaderLink />

      <div className="add_button">
        <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={() => handleClickAdd()}>
          Add
        </Button>
      </div>

      <Table className="table" size="lg">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Hobby</th>
            <th style={{ paddingLeft: "52px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {getApiData && getApiData.map((result, i) => (
            <tr key={i}>
              <td className="label" align="center">{result.firstName && result.firstName[0].toString().toUpperCase()}{result.lastName && result.lastName[0].toString().toUpperCase()}</td>
              <td style={{ padding: "10px" }}>{result.firstName} {result.lastName}</td>
              <td>{result.email}</td>
              <td>{result.description > 100 ? result.description.substring(0, 30).concat("...") : result.description}</td>
              <td>{result.hobby}</td>
              <td>
                <span style={{ marginRight: "10px" }} onClick={() => seprateUserHandle(result._id)}><Icon.Person /></span>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "15px" }}
                  onClick={() => updateEmployees(result)}>
                  <Icon.Pencil />
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => deleteEmployeeData(result._id)}
                >
                  <Icon.Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      {/* Modal in here */}
      <Modal show={mode} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === "Add" ? "Add" : "Update"} Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <InputGroup className="mt-3">
            <FormControl
              name="text"
              placeholder="Firstname"
              aria-label="Firstname"
              aria-describedby="basic-addon1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <FormControl
              name="text"
              placeholder="Lastname"
              aria-label="Lastname"
              aria-describedby="basic-addon1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <FormControl
              name="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
              aria-describedby="basic-addon1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <FormControl
              name="text"
              placeholder="Description"
              aria-label="Description"
              value={description}
              aria-describedby="basic-addon1"
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <FormControl
              name="text"
              placeholder="Hobby"
              aria-label="Hobby"
              value={hobby}
              aria-describedby="basic-addon1"
              onChange={(e) => setHobby(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>



      {/* 

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
      </div> */}
    </>
  );
}
export default User;
