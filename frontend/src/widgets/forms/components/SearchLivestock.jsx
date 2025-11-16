import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Campos a indexar/buscar
const SEARCHABLE_FIELDS = ["id", "ear_tag", "specie", "breed", "owner", "location", "tags"];

const GROUPABLE_FIELDS = [
  { key: "specie", label: "Specie" },
  { key: "breed", label: "Breed" },
  { key: "owner", label: "Owner" },
  { key: "location", label: "Location" },
  { key: "tags", label: "Tags" },
];

function normalize(v) {
  if (Array.isArray(v)) return v.join(" ").toLowerCase();
  return (v ?? "").toString().toLowerCase();
}

function livestockMatchesQuery(item, q) {
  if (!q) return false;
  const nq = q.toLowerCase().trim();
  return SEARCHABLE_FIELDS.some((field) => normalize(item[field]).includes(nq));
}

function buildGroups(items, q) {
  const nq = q.toLowerCase().trim();
  const groups = [];

  GROUPABLE_FIELDS.forEach(({ key, label }) => {
    const valueMap = new Map(); // value -> items[]

    items.forEach((it) => {
      const raw = it[key];
      // tags puede ser array, los demás string
      const values = Array.isArray(raw) ? raw : [raw];

      values
        .filter((v) => v != null && v !== "")
        .forEach((v) => {
          // el valor también debe matchear la búsqueda
          if (normalize(v).includes(nq) || livestockMatchesQuery(it, q)) {
            const list = valueMap.get(v) ?? [];
            list.push(it);
            valueMap.set(v, list);
          }
        });
    });

    // Ordena valores por cantidad desc
    const valueEntries = Array.from(valueMap.entries())
      .sort((a, b) => b[1].length - a[1].length);

    valueEntries.forEach(([value, list]) => {
      groups.push({
        characteristic: label,
        value,
        items: list,
      });
    });
  });

  return groups;
}

export function SearchLivestock({
  label,
  placeholder, // si no pasas, generamos uno con objeto ejemplo
  value,
  onChange,
  onSelect, // callback al seleccionar un livestock (opcional)
  livestockList = [],
  required = false,
  className = "",
  labelClassName = "",
  fieldClassName = "",
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState(value ?? "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  // Debounce
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return [];
    return livestockList.filter((it) => livestockMatchesQuery(it, debouncedQuery));
  }, [livestockList, debouncedQuery]);

  const groups = useMemo(() => {
    if (!debouncedQuery) return [];
    return buildGroups(filtered, debouncedQuery);
  }, [filtered, debouncedQuery]);

  // Placeholder de ejemplo si no se provee uno
  const defaultPlaceholder = useMemo(() => {
    const example = {
      id: "123",
      ear_tag: "N-4582",
      specie: "bovine",
      breed: "Holstein",
      picture: "/images/livestock/123.jpg",
      owner: "Farm A",
      location: "Lot 3",
      tags: ["lactating", "dairy"],
    };
    return JSON.stringify(example);
  }, []);

  const handleSelectItem = (item) => {
    // puedes decidir qué pones en el input al seleccionar
    const label = `${item.ear_tag || item.id || ""} · ${item.breed || ""}`.trim();
    setQuery(label);
    onChange?.(label);
    onSelect?.(item);
    setOpen(false);
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const onDocClick = (e) => {
      if (!inputRef.current) return;
      if (!inputRef.current.closest) return;
      const container = inputRef.current.closest(".searchLivestockContainer");
      if (container && !container.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className={`customField ${className} searchLivestockContainer`} ref={inputRef}>
      {label && (
        <label className={`customField-label row-left ${labelClassName}`}>
          {label}
          {required && <span className="requiredMark">*&nbsp;</span>}
          {required && <span className="requiredText">({t("required")})</span>}
        </label>
      )}

      <input
        type="text"
        placeholder={placeholder || defaultPlaceholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        required={required}
        className={`customInput ${fieldClassName}`}
        autoComplete="off"
      />

      {/* Dropdown de resultados */}
      {open && debouncedQuery && (
        <div className="searchDropdown">
          {groups.length === 0 ? (
            <div className="searchEmpty">{t("noResults") || "No results"}</div>
          ) : (
            groups.map((group, idx) => (
              <div className="searchGroup" key={`${group.characteristic}-${group.value}-${idx}`}>
                <div className="searchGroupHeader">
                  <span className="searchGroupCharacteristic">
                    {t(group.characteristic.charAt(0).toLowerCase() + group.characteristic.slice(1)) || group.characteristic}
                  </span>
                  <span className="searchGroupValue">· {group.value}</span>
                  <span className="searchGroupCount">({group.items.length})</span>
                </div>
                <ul className="searchGroupList">
                  {group.items.map((it) => (
                    <li
                      key={it.id ?? `${it.ear_tag}-${it.owner}-${it.location}`}
                      className="searchItem"
                      onClick={() => handleSelectItem(it)}
                    >
                      <img
                        src={it.picture || "/images/livestock/placeholder.png"}
                        alt={it.ear_tag || it.id || "livestock"}
                        className="searchItemAvatar"
                      />
                      <div className="searchItemBody">
                        <div className="searchItemTitle">
                          {(it.ear_tag || it.id || "—")}{it.breed ? ` · ${it.breed}` : ""}
                        </div>
                        <div className="searchItemMeta">
                          {(it.specie || "—")} · {(it.owner || "—")} · {(it.location || "—")}
                          {Array.isArray(it.tags) && it.tags.length > 0 && (
                            <span className="searchItemTags"> · #{it.tags.join(" #")}</span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      {/* estilos mínimos sugeridos; muévelos a tu CSS si prefieres */}
      <style jsx>{`
        .searchDropdown {
          margin-top: 6px;
          border: 1px solid var(--border, #e5e7eb);
          border-radius: 12px;
          background: var(--bg, #fff);
          box-shadow: 0 10px 30px rgba(0,0,0,.08);
          max-height: 420px;
          overflow: auto;
          padding: 8px;
          z-index: 20;
          position: absolute;
          width: min(720px, 100%);
        }
        .searchGroup { padding: 6px 6px 10px; }
        .searchGroup + .searchGroup { border-top: 1px dashed #e5e7eb; }
        .searchGroupHeader {
          font-size: 12px;
          opacity: .8;
          margin: 4px 0 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .searchGroupValue { font-weight: 600; }
        .searchGroupList { list-style: none; margin: 0; padding: 0; }
        .searchItem {
          display: flex; gap: 10px; align-items: center;
          padding: 8px; border-radius: 10px; cursor: pointer;
        }
        .searchItem:hover { background: #f6f7f9; }
        .searchItemAvatar {
          width: 40px; height: 40px; border-radius: 8px; object-fit: cover; background: #f3f4f6;
        }
        .searchItemTitle { font-weight: 600; }
        .searchItemMeta { font-size: 12px; opacity: .7; }
      `}</style>
    </div>
  );
}

export default SearchLivestock;
