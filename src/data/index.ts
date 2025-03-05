import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_HOST || "http://localhost:1337/api/";

interface RequestParams {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: any;
  headers?: Record<string, string>;
}

const handleRequest = async (
  endpoint: string,
  { method, params, headers = {} }: RequestParams
) => {
  const token = Cookies.get("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const requestData: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      ...(params instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: params
      ? params instanceof FormData
        ? params
        : JSON.stringify(params)
      : undefined,
  };

  const response = await fetch(`${baseURL}${endpoint}`, requestData);
  let jsonResponse: any = {};

  try {
    jsonResponse = await response.json();
    if (response.status === 401) {
      console.warn("No autorizado, cerrando sesión...");
      Cookies.remove("token");
      window.location.href = "/";
      return Promise.reject({
        message: jsonResponse.message,
        error: jsonResponse.error || jsonResponse.errors,
        status: response.status,
      });
    }
  } catch (e) {
    console.error("Error al parsear respuesta:", e);
  }

  if (!response.ok) {
    return Promise.reject({
      message: jsonResponse?.message || "Error en la solicitud",
      error: jsonResponse?.error || jsonResponse?.errors,
      status: response.status,
    });
  }

  return jsonResponse.data || jsonResponse;
};

const API = {
  get: (endpoint: string) => handleRequest(endpoint, { method: "GET" }),
  post: (endpoint: string, params?: any) =>
    handleRequest(endpoint, { method: "POST", params }),
  put: (endpoint: string, params?: any) =>
    handleRequest(endpoint, { method: "PUT", params }),
  patch: (endpoint: string, params?: any) =>
    handleRequest(endpoint, { method: "PATCH", params }),
  delete: (endpoint: string) => handleDelete(endpoint, { method: "DELETE" }),
  fetcher: async (...args: [string]) => API.get(...args),
};

export default API;

const handleDelete = async (
  endpoint: string,
  { method, params, headers = {} }: RequestParams
) => {
  const token = Cookies.get("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const requestData: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      ...(params instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: params
      ? params instanceof FormData
        ? params
        : JSON.stringify(params)
      : undefined,
  };

  const response = await fetch(`${baseURL}${endpoint}`, requestData);
  if (!response.ok) {
    return Promise.reject({
      message: "Error en la solicitud",
      error: "Error en la solicitud",
      status: response.status,
    });
  }

  return {};
};
