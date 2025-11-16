import { useState } from "react";
import { useTranslation } from "react-i18next";
import RequestForm from "../forms/components/RequestForm";
import CustomInput from "../forms/components/CustomInput";

export function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
    // Aquí harías la llamada a tu API o hook de autenticación
  };

  return (
    <div className="full-view flex column center gap20 card">
        <CustomInput
          label={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          required
        />

        <CustomInput
          label={t("password")}
          type="password"
          value={password}
          onChange={setPassword}
          required
        />

        <div className="row-right">
          <a href="/signup" className="small-link">
            {t("createAccount")}
          </a>
        </div>
    </div>
  );
}

export default Login;
