export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const restApiBaseUrl = process.env.NEXT_PUBLIC_RESTAPI_BASE_URL;
const graphqlBaseUrl = process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL;

function getRestApiUrl(path: string): string {
  if (!restApiBaseUrl) {
    throw new Error("RESTAPI_BASE_URL is not defined in the environment");
  }
  return `${restApiBaseUrl}${path}`;
}

function getGraphqlUrl(): string {
  if (!graphqlBaseUrl) {
    throw new Error("GRAPHQL_BASE_URL is not defined in the environment");
  }
  return `${graphqlBaseUrl}`;
}

export async function graphqlRequest<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const url = getGraphqlUrl();

  const options: RequestInit = {
    method: HttpMethod.POST,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  try {
    const response = await fetch(url, options);
    const responseBody = await response.json();

    if (!response.ok || responseBody.errors) {
      const errorMessage =
        responseBody.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong. N.1";
      throw new Error(errorMessage);
    }

    return responseBody.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`GraphQL request failed: ${error.message} . N.2`);
    }

    throw new Error("An unknown error occurred during GraphQL request . N.3");
  }
}

async function fetchRequest(
  method: HttpMethod,
  path: string,
  params?: Record<string, any>
): Promise<any> {
  let url = getRestApiUrl(path);

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (method === "GET" && params) {
    let queryString = new URLSearchParams(params).toString();
    queryString = queryString ? `?${queryString}` : "";
    url = `${url}${queryString}`;
  } else if (params) {
    options.body = JSON.stringify(params);
  }

  try {
    const response = await fetch(url, options);
    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.message || "Something went wrong. N.1");
    }

    return responseBody;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Request failed: ${error.message} . N.2`);
    }

    throw new Error("An unknown error occurred . N.3");
  }
}

export async function getRequest(path: string, params?: Record<string, any>) {
  return fetchRequest(HttpMethod.GET, path, params);
}

export async function postRequest(path: string, params?: Record<string, any>) {
  return fetchRequest(HttpMethod.POST, path, params);
}

export async function putRequest(path: string, params?: Record<string, any>) {
  return fetchRequest(HttpMethod.PUT, path, params);
}

export async function deleteRequest(
  path: string,
  params?: Record<string, any>
) {
  return fetchRequest(HttpMethod.DELETE, path, params);
}
