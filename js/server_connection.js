async function login(getRequest) {
  const response = await fetch(getRequest);
  return response;
}

async function register(postRequest) {
  const response = await fetch(postRequest);
  return response;
}
