export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function getFullUrl(path: string): string {
  if (!baseUrl) {
    throw new Error("BASE_URL is not defined in the environment");
  }
  return `${baseUrl}${path}`;
}

async function fetchRequest(
  method: HttpMethod,
  path: string,
  params?: Record<string, any>
): Promise<any> {
  const url = getFullUrl(path);

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (params) {
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
