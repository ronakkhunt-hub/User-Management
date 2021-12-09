import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormControl, InputGroup, Modal, Table, Button } from "react-bootstrap";

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

  const randomColor = {
    A: '445c64',
    B: '3e3e3e',
    C: '64948c',
    D: '419bab',
    E: '00b1e1',
    F: '5b6f7c',
    G: '2c91fe',
    H: '917d84',
    I: 'e29f86',
    J: '302417',
    K: 'a8d2c5',
    L: 'ecae1f',
    M: '397989',
    N: 'e95e29',
    O: '4c70a4',
    P: '499c50',
    Q: '89bbec',
    R: '0c3c7c',
    S: 'c0d0bd',
    T: '9b5a72',
    U: '61c6fb',
    V: '271dd3',
    W: 'bfb6dd',
    X: '3cb371',
    Y: '787878',
    Z: '897841'
  }

  function generateRandomColor(key) {
    return `#${randomColor[key]}`;
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
        setApiData([...getApiData, addData.data.data])
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
    const deleteData = await deleteApi({
      url: `api/delete-user/${_id}`,
    })
    const findEmp = getApiData.filter((item) => item._id !== deleteData.data.data?._id)
    setApiData(findEmp)
    toast('Data deleted successfully');
  }

  function updateEmployees(_id, employee) {
    setSelectedId(_id)
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
          style={{ padding: '8px 20px' }}
          type="button"
          onClick={() => handleClickAdd()}>
          Add
        </Button>
      </div>

      <div className="tableDiv">
        <div className="tableDiv2">
          <Table>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Description</th>
                <th>Hobby</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getApiData && getApiData.map((result, i) => (
                <tr key={i}>
                  <td onClick={() => seprateUserHandle(result._id)}>
                    <div className="label" style={{ backgroundColor: generateRandomColor(result.firstName[0].toString().toUpperCase()), }}>{result.firstName && result.firstName[0].toString().toUpperCase()}</div>
                  </td>
                  <td>{result.firstName} {result.lastName}</td>
                  <td>{result.email}</td>
                  <td>{result.description > 100 ? result.description.substring(0, 30).concat("...") : result.description}</td>
                  <td>{result.hobby}</td>
                  <td>
                    <Button
                      className="updateButton"
                      type="button"
                      onClick={() => updateEmployees(i, result)}>
                      <i className="fas fa-pencil"></i>
                    </Button>
                    <Button
                      className="deleteButton"
                      type="button"
                      onClick={() => deleteEmployeeData(i, result._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>


      {/* Modal in here */}
      <Modal show={mode ? true : false} onHide={handleClose}>
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
              type="email"
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
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default User;
