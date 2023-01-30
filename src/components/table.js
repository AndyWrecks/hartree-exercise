import React, { useEffect, useState } from "react";
import { Table, useStyles2, useTheme2 } from "@grafana/ui";
import {
  applyFieldOverrides,
  FieldType,
  getDisplayProcessor,
  ThresholdsMode,
  toDataFrame,
} from "@grafana/data";
import { css, cx } from "@emotion/css";
import { forOwn, merge } from "lodash";
import axios from "axios";

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

function convertDummyJsonToTableData(products, config) {
  const tableData = [];

  products.forEach((product) => {
    // {name: 'Time', type: FieldType.time, values: []}

    forOwn(product, (value, key) => {
      // Creating Arrays for each column
      if (!tableData.some((entry) => entry.name === key)) {
        const fieldData = {
          name: key,
          type: typeof key === "string" ? FieldType.string : FieldType.number,
          values: [],
          config: {},
          display: getDisplayProcessor(),
        };

        if (key === "rating") {
          fieldData.config = {
            unit: "number",
            min: 0,
            max: 5,
          };
        }

        if (config[key]) {
          fieldData.config = merge(config[key], fieldData.config);
        }

        tableData.push(fieldData);
      }

      const targetIndex = tableData.findIndex((entry) => entry.name === key);
      tableData[targetIndex].values.push(value);
    });
  });

  return tableData;
}

async function getDummyJson() {
  return await axios.get("https://dummyjson.com/products").then((res) => {
    console.log("triggering");
    return res.data.products;
  });
}

export default function TableComponent() {
  const [tableData, getTableData] = useState(toDataFrame([]));
  const [fetchStatus, setFetchStatus] = useState(false);

  const styles = useStyles2(getStyles);

  const theme = useTheme2();

  useEffect(() => {
    getDummyJson().then((data) => {
      if (!fetchStatus) {
        getTableData(
          applyFieldOverrides({
            data: toDataFrame({
              name: "field1",
              fields: convertDummyJsonToTableData(data, {
                rating: {
                  custom: {
                    width: 150,
                    displayMode: "gradient-gauge",
                  },
                  thresholds: {
                    steps: [
                      {
                        color: "blue",
                        value: -Infinity,
                      },
                      {
                        color: "green",
                        value: 20,
                      },
                    ],
                    mode: ThresholdsMode.Absolute,
                  },
                },
              }),
              fieldConfig: {
                overrides: [],
                defaults: {},
              },
              theme,
            }),
          })
        );

        setFetchStatus(true);
      }
    });
  });

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: 100vh;
          height: 100vw;
        `
      )}
    >
      <Table
        data={tableData}
        width={1000}
        height={1000}
        columnMinWidth={0}
      ></Table>
    </div>
  );
}
