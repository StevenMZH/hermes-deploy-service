import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import RequestForm from "../forms/components/RequestForm";
import CustomInput from "../atomics/CustomInput";
import CustomSelect from "../atomics/CustomSelect";

export function Signup() {
  const { t } = useTranslation();

  const [company, setCompany]   = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry]   = useState("");

  const industryOptions = useMemo(() => ([
    { value: "livestock",   label: t("livestock") },
    { value: "agriculture", label: t("agriculture") },
    { value: "dairy",       label: t("dairy") },
    { value: "mixed",       label: t("mixed") },
  ]), [t]);

  const valid =
    company.trim() &&
    email.trim() &&
    password.trim() &&
    confirm.trim() &&
    password === confirm &&
    industry &&
    country.trim();

  const handleSubmit = async () => {
    if (password !== confirm) {
      alert(t("passwordsDoNotMatch"));
      return;
    }

    // 🚀 Aquí harías tu llamada a la API
    console.log("Registering:", {
      company,
      email,
      password,
      industry,
      country,
    });
  };

  return (
    <div className="full-view flex column center card">
      <RequestForm
        title={t("createAccount") || "Create account"}
        button_str={t("submit")}
        onSubmit={handleSubmit}
      >
        <div className="formSection column gap10">
          <CustomInput
            label={t("companyName")}
            value={company}
            onChange={setCompany}
            required
          />

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

          <CustomInput
            label={t("confirmPassword")}
            type="password"
            value={confirm}
            onChange={setConfirm}
            required
          />

          <CustomSelect
            label={t("industry")}
            value={industry}
            onChange={setIndustry}
            options={industryOptions}
            required
          />

          <CustomInput
            label={t("country")}
            value={country}
            onChange={setCountry}
            required
          />
        </div>

        <div className="row-right gap10">
          <a href="/login" className="small-link">
            {t("alreadyHaveAccount") || "Already have an account?"}
          </a>
          <button
            type="submit"
            className="hl1"
            disabled={!valid}
            title={!valid ? (t("completeAllFields") || "Complete all fields") : undefined}
          >
            {t("submit")}
          </button>
        </div>
      </RequestForm>
    </div>
  );
}

export default Signup;
