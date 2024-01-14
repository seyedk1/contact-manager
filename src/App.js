import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Navbar,
  Contacts,
  ViewContact,
  AddContact,
  EditContact,
} from "./components";
import { BACKGROUND } from "./helpers/colors";
import {
  createContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactService";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const navigate = useNavigate();

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value,
    });
  };

  const createContactForm = async (event) => {
    event.preventDefault();

    try {
      const { status } = await createContact(getContact);

      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [forceRender]);

  return (
    <div className="App" style={{ backgroundColor: BACKGROUND }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />}></Route>
        <Route
          path="/contacts"
          element={<Contacts contacts={getContacts} loading={loading} />}
        ></Route>

        <Route
          path="/contacts/add"
          element={
            <AddContact
              loading={loading}
              contact={getContact}
              groups={getGroups}
              setContactInfo={setContactInfo}
              createContactForm={createContactForm}
            />
          }
        ></Route>
        <Route path="/contacts/:contactId" element={<ViewContact />}></Route>
        <Route path="/contacts/edit/:contactId" element={EditContact}></Route>
      </Routes>
    </div>
  );
};

export default App;
