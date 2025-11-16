import { useState, useEffect, useRef } from "react";

export function Grid({
  children,
  minColumnWidth = 150,
  maxColumns,
  gap = 10,
  padding = 10,
  className = '',
}) {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;

      // calcular columnas posibles según ancho disponible y gap
      let cols = Math.floor((containerWidth + gap) / (minColumnWidth + gap));

      // aplicar máximo de columnas si existe
      if (maxColumns) cols = Math.min(cols, maxColumns);

      // al menos 1 columna
      setColumns(Math.max(cols, 1));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [minColumnWidth, maxColumns, gap]);

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    padding: `${padding}px`,
  };

  return (
    <div ref={containerRef} className={`grid ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Grid;
