import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryArea,
  VictoryLegend,
} from "victory";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/PreferencesContext";

export function LineChart({
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
  width = 1000,
  height = 300,
  strokeWidth = 2,
  fontSize = 12,
  fillOpacity = 0.2,
  mainName = yLabel,
  additionalData, // { data, xKey, yKey, color, name }
}) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [cssVars, setCssVars] = useState({});

  // traducimos solo labels y leyenda, nunca keys de datos
  const translatedXLabel = xLabel ? t(xLabel) ?? xLabel : "";
  const translatedYLabel = yLabel ? t(yLabel) ?? yLabel : "";
  const translatedMainName = mainName ? t(mainName) ?? mainName : "";
  const translatedAdditionalName = additionalData?.name
    ? t(additionalData.name) ?? additionalData.name
    : "";

  useEffect(() => {
    const styles = getComputedStyle(document.body);
    setCssVars({
      color: styles.getPropertyValue("--highlight3")?.trim() || "#4f46e5",
      axisColor: styles.getPropertyValue("--text-sec")?.trim() || "#888",
      labelColor: styles.getPropertyValue("--text-main")?.trim() || "#555",
      gridColor: styles.getPropertyValue("--text-sec")?.trim() || "#eee",
      tooltipBg: styles.getPropertyValue("--bg-light")?.trim() || "#f9f9f9",
      tooltipBorder: styles.getPropertyValue("--border")?.trim() || "#4f46e5",
    });
  }, [theme]);

  const legendData = [
    { name: translatedMainName, symbol: { fill: cssVars.color, type: "square" } },
  ];
  if (additionalData) {
    legendData.push({
      name: translatedAdditionalName,
      symbol: { fill: additionalData.color || "#10b981", type: "square" },
    });
  }

  return (
    <VictoryChart
      width={width}
      height={height}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${translatedYLabel}: ${datum[yKey]}\n${datum[xKey]}`
          }
          labelComponent={
            <VictoryTooltip
              cornerRadius={5}
              flyoutStyle={{ fill: cssVars.tooltipBg, stroke: cssVars.tooltipBorder }}
              style={{ fontSize, fill: cssVars.labelColor }}
            />
          }
        />
      }
    >
      {/* Eje X */}
      <VictoryAxis
        label={translatedXLabel}
        style={{
          axis: { stroke: cssVars.axisColor },
          tickLabels: { fontSize, fill: cssVars.labelColor, padding: 5 },
          grid: { stroke: cssVars.gridColor, strokeDasharray: "2,2" },
          axisLabel: { padding: 30, fontSize, fill: cssVars.labelColor },
        }}
      />
      {/* Eje Y */}
      <VictoryAxis
        dependentAxis
        label={translatedYLabel}
        style={{
          axis: { stroke: cssVars.axisColor },
          tickLabels: { fontSize, fill: cssVars.labelColor, padding: 5 },
          grid: { stroke: cssVars.gridColor, strokeDasharray: "2,2" },
          axisLabel: { padding: 40, fontSize, fill: cssVars.labelColor },
        }}
      />

      {/* Área debajo de la línea principal */}
      <VictoryArea
        data={data}
        x={xKey}
        y={yKey}
        style={{ data: { fill: cssVars.color, fillOpacity } }}
      />
      {/* Línea principal */}
      <VictoryLine
        data={data}
        x={xKey}
        y={yKey}
        style={{ data: { stroke: cssVars.color, strokeWidth } }}
      />

      {/* Línea adicional */}
      {additionalData && (
        <VictoryLine
          data={additionalData.data}
          x={additionalData.xKey}
          y={additionalData.yKey}
          style={{
            data: { stroke: additionalData.color || "#10b981", strokeWidth },
          }}
        />
      )}

      {/* Leyenda */}
      {cssVars.color && (
        <VictoryLegend
          x={50}
          y={10}
          orientation="horizontal"
          gutter={20}
          style={{ labels: { fill: cssVars.labelColor, fontSize } }}
          data={legendData}
        />
      )}
    </VictoryChart>
  );
}

export default LineChart;
