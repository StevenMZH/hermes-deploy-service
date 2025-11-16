import { useEffect, useMemo, useRef, useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useTranslation } from "react-i18next";

import CustomSelect from "../forms/components/CustomSelect";

export default function FullSearchBar({
  options = [],
  selectedOption,
  onChangeOption,
  setData,
  initialQuery = "",
  filters = false,
  buttonName = "add"
}) {
  const { t } = useTranslation();
    const { setForm } = useAppState();
  const [query, setQuery] = useState(initialQuery);

  // snapshot por opción
  const fullDataMapRef = useRef(new Map());
  // firma del último filtro aplicado (para evitar setData redundantes)
  const lastSigRef = useRef({ opt: null, q: "", len: -1, firstKey: undefined });

  const current = useMemo(() => {
    const found = options.find((o) => o.value === selectedOption);
    return found ?? options[0] ?? null;
  }, [options, selectedOption]);

  const searchKeys = useMemo(() => {
    if (!current) return ["name", "label"];
    return current.searchKeys?.length ? current.searchKeys : ["name", "label"];
  }, [current]);

  const rowMatches = (row, q) => {
    if (!q) return true;
    const needle = q.toLowerCase();
    for (const key of searchKeys) {
      const val = row?.[key];
      if (val != null && String(val).toLowerCase().includes(needle)) return true;
    }
    for (const v of Object.values(row || {})) {
      if (typeof v === "string" && v.toLowerCase().includes(needle)) return true;
    }
    return false;
  };

  const applyFilter = (q) => {
    if (!current || typeof setData !== "function") return;

    const full = fullDataMapRef.current.get(current.value) || [];
    const next = q ? full.filter((row) => rowMatches(row, q)) : full;

    // 👇 Evita setData si no cambia el resultado
    const sig = {
      opt: current.value,
      q,
      len: next.length,
      firstKey: next.length ? Object.values(next[0])[0] : undefined,
    };
    const prev = lastSigRef.current;
    if (
      prev.opt === sig.opt &&
      prev.q === sig.q &&
      prev.len === sig.len &&
      prev.firstKey === sig.firstKey
    ) {
      return; // no hay cambios visibles → no setData
    }
    lastSigRef.current = sig;
    setData(next);
  };

  // Cuando cambia la opción (no el array de datos), resetea query y usa el snapshot
  useEffect(() => {
    if (!current) return;
    const base = Array.isArray(current.data) ? [...current.data] : [];
    fullDataMapRef.current.set(current.value, base);
    setQuery("");
    lastSigRef.current = { opt: null, q: "", len: -1, firstKey: undefined }; // resetea firma
    setData(base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.value]); // ← importante: solo depende del value, no de current.data

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    applyFilter(q);
  };

  const handleOptionChange = (val) => onChangeOption?.(val);
  const handleAdd = () => current?.addFormName && setForm(current.addFormName);

  return (
    <div className="full-view flex row gap10">
      {options.length > 1 && (
        <CustomSelect
          value={current?.value || ""}
          onChange={handleOptionChange}
          options={options.map(({ value, label }) => ({ value, label }))}
          placeholder="Select dataset"
          className="searchbar-select"
        />
      )}

      <div className="full-view searchbar">
        <input
          type="text"
          className="searchbar-input"
          placeholder={t("search")}
          value={query}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && applyFilter(query)}
        />
        <button className="searchbar-button" onClick={() => applyFilter(query)}>
          <img src="./search.png" alt="" className="icon" />
        </button>
      </div>
      {filters &&
        <button className="searchbar-filter row center">
          <img src="./filter.png" alt="filter" className="icon"/>
          <p>Filters</p> 
        </button>}
      {current?.addFormName && (
        <button className="searchbar-add row center" onClick={handleAdd}>
          <img src="./add.png" alt="add" className="reversed-icon" />
          <p>{t(buttonName)}</p>
        </button>
      )}
    </div>
  );
}
