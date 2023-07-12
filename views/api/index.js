async function get(endpoint, params = '', errorAlert = true) {
  const apiUrl = `${endpoint}${params}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    const { message } = result;

    if (message && errorAlert) {
      alert(message);
      throw new Error(message);
    }
  }
  return result;
}

async function post(endpoint, data, errorAlert = true) {
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

  const result = await res.json();

  if (!res.ok) {
    const { message } = result;

    if (message && errorAlert) {
      alert(message);
      throw new Error(message);
    }
  }
  return result;
}

async function patch(endpoint, params = '', data, errorAlert = true) {
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

  const result = await res.json();

  if (!res.ok) {
    const { message } = result;

    if (message && errorAlert) {
      alert(message);
      throw new Error(message);
    }
  }

  return result;
}

async function put(endpoint, params = '', data, errorAlert = true) {
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

  const result = await res.json();

  if (!res.ok) {
    const { message } = result;

    if (message && errorAlert) {
      alert(message);
      throw new Error(message);
    }
  }

  return result;
}

async function del(endpoint, params = '', errorAlert = true) {
  const apiUrl = `${endpoint}${params}`;

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    const { message } = result;

    if (message && errorAlert) {
      alert(message);
      throw new Error(message);
    }
  }
  return result;
}

export { get, post, patch, put, del as delete };
