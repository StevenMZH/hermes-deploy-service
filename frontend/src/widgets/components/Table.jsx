import { useMemo, useState } from "react";

/**
 * Table genérica con ordenamiento, click por fila y ancho de columnas.
 *
 * Props:
 * - data: Array<object>
 * - columns: Array<{
 *     key: string,                       // identificador único
 *     header: string | ReactNode,        // título de la columna
 *     sortable?: boolean,                // habilita ordenar
 *     accessor?: (row) => any,           // valor para ordenar/mostrar por defecto
 *     cell?: (row) => ReactNode,         // render personalizado de celda
 *     className?: string,                // clases opcionales
 *     width?: string                     // ancho opcional, ej: "20%" o "150px"
 *   }>
 * - initialSort?: { key: string, direction: "asc" | "desc" }
 * - getRowKey?: (row, index) => string | number
 * - onRowClick?: (row) => void
 * - striped?: boolean
 * - className?: string
 */
export default function Table({
  data = [],
  columns = [],
  initialSort = { key: null, direction: "asc" },
  getRowKey = (_, i) => i,
  onRowClick,
  striped = true,
  className = "",
}) {
  const [sortConfig, setSortConfig] = useState(initialSort);

  const requestSort = (key, sortable) => {
    if (!sortable) return;
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const col = columns.find((c) => c.key === sortConfig.key);
    if (!col) return data;

    const getValue = (row) =>
      col.accessor ? col.accessor(row) : row[col.key];

    const arr = [...data];
    arr.sort((a, b) => {
      const va = getValue(a);
      const vb = getValue(b);

      // Manejar undefined/null
      if (va == null && vb != null) return sortConfig.direction === "asc" ? -1 : 1;
      if (va != null && vb == null) return sortConfig.direction === "asc" ? 1 : -1;
      if (va == null && vb == null) return 0;

      // Comparación básica (números / strings / fechas)
      if (va < vb) return sortConfig.direction === "asc" ? -1 : 1;
      if (va > vb) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [data, columns, sortConfig]);

  const SortIcon = ({ active, direction }) => {
    if (!active) return null;
    return (
      <img
        src={direction === "asc" ? "/livestock_table/up.svg" : "/livestock_table/down.svg"}
        alt={direction === "asc" ? "ascending" : "descending"}
        className="sort-icon"
      />
    );
  };

  return (
    <div className={`full-view ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => {
              const active = sortConfig.key === col.key;
              return (
                <th
                  key={col.key}
                  onClick={() => requestSort(col.key, col.sortable)}
                  className={col.sortable ? "th-sortable" : ""}
                  style={{
                    cursor: col.sortable ? "pointer" : "default",
                    width: col.width || "auto" // <-- ancho aplicado
                  }}
                >
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                    className="row gap5"
                  >
                    {col.header}
                    <SortIcon active={active} direction={sortConfig.direction} />
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => {
            const rowKey = getRowKey(row, idx);
            const rowClass = striped && idx % 2 === 0 ? "row-even" : "row-odd";
            return (
              <tr
                key={rowKey}
                className={rowClass}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={col.className}
                    style={{ width: col.width || "auto" }} // <-- ancho aplicado
                  >
                    {col.cell
                      ? col.cell(row)
                      : col.accessor
                      ? col.accessor(row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
