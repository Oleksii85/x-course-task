import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageService, LS_KEYS } from "../../services/localStorage";
import { useUser } from "../../hooks/use-user";
import avatar from "../../images/avatar.png";
import "./signin.scss";

export default function Signin() {
	const navigate = useNavigate();
	const { setUser } = useUser();
  const [userName, setUserName] = useState(
    LocalStorageService.get(LS_KEYS.USER) || ""
  );

	const handleSubmit = (event) => {
		event.preventDefault();
		LocalStorageService.set(LS_KEYS.USER, userName);
		setUser(userName);
		navigate("/");
	};

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleUsernameValue = (event) => {
    setUserName(event.target.value);
  };

  return (
    <>
      <main>
        <div className="signin">
          <div className="avatar-signin">
            <img src={avatar} alt="avatar" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="form-signin"
          >
            <div>
              <label className="label-signin" htmlFor="name">
                Username
              </label>
            </div>
            <div>
              <input
                ref={inputRef}
                id="name"
                type="text"
								autoComplete="off"
                className="input-signin"
                placeholder="type Username"
                name="username"
                onChange={handleUsernameValue}
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn-signin"
                disabled={userName.length < 4 || userName.length > 16}
              >
                Sign-In
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
