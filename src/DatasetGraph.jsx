import React, { useEffect, useState } from "react";
import { Provider } from '@clayui/core';
import '@clayui/css/lib/css/atlas.css';

import PivotChart from "./PivotChart";

import { loadDatasetMetadata, fetchDatasetItems } from "./utils/datasetUtil";

const DatasetGraph = ({ datasetERC, colors }) => {
  const [apiBaseUrl, setApiBaseUrl] = useState(null);
  const [fields, setFields] = useState([{label:"ID", name: "id"}]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!datasetERC) return;

    const load = async () => {
      try {
        loadDatasetMetadata(datasetERC).then(({ base, fields }) => {
          setApiBaseUrl(base);
          setFields(fields);
        });
      } catch (e) {
        console.error("Metadata error:", e);
      }
    };

    load();
  }, [datasetERC]);

  useEffect(() => {
    if (!apiBaseUrl) return;

    const handleFetch = async (_event, url) => {
      try {
        fetchDatasetItems(url, apiBaseUrl, fields).then(fetchedItems => {
          setItems(fetchedItems);
        });
      } catch (e) {
        console.error("handleFetch error:", e);
      }
    };

    const queueKey = "fetchContextContributorQueue";
    try {
      const stored = JSON.parse(sessionStorage.getItem(queueKey)) || {};
      if (stored[apiBaseUrl]) handleFetch(null, stored[apiBaseUrl]);
    } catch (e) {
      console.warn("Failed to read sessionStorage", e);
    }

    window.Liferay.on("fetch-context-contributor:request", handleFetch);
    return () => window.Liferay.detach("fetch-context-contributor:request", handleFetch);

  }, [apiBaseUrl, fields]);

  return (
    <Provider spritemap={window.Liferay.Icons.spritemap}>
      <PivotChart items={items} fields={fields} colors={colors}></PivotChart>      
    </Provider>
  );
};

export default DatasetGraph;
