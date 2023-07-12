async function get(endpoint, params = '') {
  const apiUrl = `${endpoint}${params}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();
  return result;
}

async function post(endpoint, data) {
  const apiUrl = endpoint;
  const bodyData = JSON.stringify(data);

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;
    throw new Error(reason);
  }

  const result = await res.json();
  return result;
}

async function patch(endpoint, params = '', data) {
  const apiUrl = `${endpoint}${params}`;
  const bodyData = JSON.stringify(data);

  const res = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

async function put(endpoint, params = '', data) {
  const apiUrl = `${endpoint}${params}`;
  const bodyData = JSON.stringify(data);

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

async function del(endpoint, params = '') {
  const apiUrl = `${endpoint}${params}`;

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();
  return result;
}

export { get, post, patch, put, del as delete };
