import ApiService from "./api.service";

const getNotifications = async function() {
  try {
    const response = await ApiService.get(`/notifications`);

    return parseListResponse(response);
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    return [];
  }
};

const deleteNotification = async function(notificationId) {
  await ApiService.delete(`/notifications/${notificationId}`);
};
const sendNotification = async function(notification) {
  await ApiService.post(`/notifications/send-notification`, notification);
};

const parseListResponse = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  return response.data;
};
export const NotificationsService = {
  getNotifications,
  deleteNotification,
  sendNotification
};
