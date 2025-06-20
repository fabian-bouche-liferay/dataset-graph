const loadDatasetMetadata = (datasetERC) => {
  return window.Liferay.Util.fetch(`/o/data-set-admin/data-sets/by-external-reference-code/${datasetERC}`, {
    headers: { "Accept": "application/json" },
  })
    .then(result => result.json())
    .then(json => {
      const base = `${window.location.origin}/o${json.restApplication}${json.restEndpoint}`;
      return window.Liferay.Util.fetch(`/o/data-set-admin/data-sets/${json.id}/dataSetToDataSetTableSections?fields=fieldName%2Clabel%2Ctype%2Crenderer`, {
        headers: { "Accept": "application/json" },
      })
        .then(fieldsResult => fieldsResult.json())
        .then(fieldsJson => {
          const newFields = fieldsJson.items.map((element) => ({
            label: element.label,
            name: element.fieldName,
            type: element.type,
            renderer: element.renderer,
            isDisplayableObject: true,
          }));

          return { base, fields: newFields };
        });
    })
    .catch(err => {
      console.error("Failed to load dataset metadata:", err);
      return Promise.reject(err);
    });
};

const fetchDatasetItems = (url, apiBaseUrl, fields) => {
  if (!url.startsWith(apiBaseUrl)) {
    return Promise.resolve([]);
  }

  const fullUrl = new URL(url, window.location.origin);
  fullUrl.searchParams.set("fields", fields.map(f => f.name).join(","));

  const all = [];
  let page = 1;
  let hasMore = true;

  const fetchNextPage = () => {
    fullUrl.searchParams.set("page", page);
    fullUrl.searchParams.set("pageSize", 100);

    return window.Liferay.Util.fetch(fullUrl.toString(), {
      headers: {
        "Accept": "application/json",
        "X-Skip-Fetch-Event": "true",
      },
    })
      .then(response => response.json())
      .then(data => {
        all.push(...(data.items || []));
        const currentPage = data.page || page;
        const totalPages = data.lastPage || 1;
        hasMore = currentPage < totalPages;
        page++;

        if (hasMore) {
          return fetchNextPage();
        }

        return all;
      });
  };

  return fetchNextPage().catch(err => {
    console.error("Failed to fetch dataset:", err);
    return Promise.reject(err);
  });
};

export {loadDatasetMetadata, fetchDatasetItems};