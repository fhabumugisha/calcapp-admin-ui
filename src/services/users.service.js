import ApiService from "./api.service";

const getUsers = async function() {
  try {
    const response = await ApiService.get(`/users`);

    return parseListResponse(response);
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    return [];
  }
};

const deleteUser = async function(userId) {
  await ApiService.delete(`/users/${userId}`);
};

const parseListResponse = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  return response.data;
};
export const UsersService = {
  getUsers,
  deleteUser
};
