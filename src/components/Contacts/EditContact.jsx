import { Link, useParams, useNavigate } from "react-router-dom";

import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { useEffect, useState } from "react";
import {
  getAllGroups,
  getContact,
  updateContact,
} from "../../services/contactService";

const EditContact = ({ forceRender, setForceRender }) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {
      fullname: "",
      photo: "",
      mobile: "",
      email: "",
      job: "",
      group: "",
    },
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: groupsData } = await getAllGroups();
        const { data: contactData } = await getContact(contactId);

        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupsData,
        });
      } catch (err) {
        console.log("err: ", err.message);
        setState({ ...state, loading: false });
      }
    };

    fetchData();
  }, []);

  const setContactInfo = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const updateContactForm = async (event) => {
    event.preventDefault();

    try {
      setState({ ...state, loading: true });
      const { data } = await updateContact(contact, contactId);
      setState({ ...state, loading: false });
      if (data) {
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      setState({ ...state, loading: false });
      console.log(err.message);
    }
  };

  const { loading, contact, groups } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              alt=""
              style={{
                position: "absolute",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={updateContactForm}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        value={contact.fullname}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        value={contact.photo}
                        onChange={setContactInfo}
                        className="form-control"
                        required={true}
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="text"
                        value={contact.mobile}
                        onChange={setContactInfo}
                        className="form-control"
                        required={true}
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        value={contact.email}
                        onChange={setContactInfo}
                        className="form-control"
                        required={true}
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        value={contact.job}
                        onChange={setContactInfo}
                        className="form-control"
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        required={true}
                        value={contact.group}
                        onChange={setContactInfo}
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
