import { Contact, Spinner } from "../index";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import { Link, Outlet } from "react-router-dom";

const Contacts = ({ contacts, loading, confirmDeteleContact }) => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-end">
                <Link
                  to={"/contacts/add"}
                  className="btn mx-2"
                  style={{ backgroundColor: PINK }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="container">
            <div className="row">
              {/* Contact */}
              {contacts.length > 0 ? (
                contacts.map((c) => (
                  <Contact
                    key={c.id}
                    confirmDeteleContact={() => {
                      confirmDeteleContact(c.id, c.fullname);
                    }}
                    contact={c}
                  />
                ))
              ) : (
                <div
                  className="text-center py-5"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ ORANGE }}>
                    مخاطب یافت نشد ...
                  </p>
                  <img
                    src={require("../../assets/no-found.gif")}
                    alt="پیدا نشد"
                    className="w-25"
                  />
                </div>
              )}
            </div>
          </section>
          <Outlet />
        </>
      )}
    </>
  );
};

export default Contacts;
