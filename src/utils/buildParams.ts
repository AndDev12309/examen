interface PopulateOption {
  [key: string]: string | PopulateOption;
}

interface FilterOption {
  [key: string]: string | number | boolean | FilterOption | FilterOption[];
}

interface BuildUrlParams {
  populate?: string | string[] | PopulateOption;
  filters?: FilterOption;
  sort?: string;
  [key: string]: any;
}

const buildUrl = ({
  populate,
  filters,
  sort,
  ...otherParams
}: BuildUrlParams) => {
  let url = "";

  if (populate) {
    if (typeof populate === "string") {
      url += `populate=${populate}&`;
    } else if (Array.isArray(populate)) {
      populate.forEach((field) => {
        url += `populate=${field}&`;
      });
    } else if (typeof populate === "object") {
      Object.keys(populate).forEach((key) => {
        url += `populate[${key}]=${JSON.stringify(populate[key])}&`;
      });
    }
  }

  const addFilters = (filters: FilterOption, parentKey = "filters") => {
    let filterString = "";
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      const fullKey = `${parentKey}[${key}]`;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object") {
            filterString += addFilters(item, `${fullKey}[${index}]`);
          }
        });
      } else if (typeof value === "object") {
        filterString += addFilters(value, fullKey);
      } else {
        filterString += `${fullKey}=${encodeURIComponent(value)}&`;
      }
    });
    return filterString;
  };

  if (filters) {
    url += addFilters(filters);
  }

  if (sort) {
    url += `sort=${encodeURIComponent(sort)}&`;
  }

  Object.keys(otherParams).forEach((key) => {
    url += `${key}=${encodeURIComponent(otherParams[key])}&`;
  });

  return url.slice(0, -1);
};

export default buildUrl;
