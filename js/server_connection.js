async function register(postRequest) {
  const response = await fetch(postRequest);
  return response;
}
