async function login(getRequest) {
  const response = await fetch(getRequest);
  return response;
}

async function register(postRequest) {
  const response = await fetch(postRequest);
  return response;
}

async function getBreedArray(breedArrayRequest) {
  const response = await fetch(breedArrayRequest);
  return response;
}
