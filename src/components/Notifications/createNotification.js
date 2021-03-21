import { NotificationManager } from 'react-notifications';

const createNotification = (type, message, title, timeout, callback) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message, title, timeout, () => {
                callback && callback()
            });
        break;
        case 'success':
            NotificationManager.success(message, title, timeout, () => {
                callback && callback()
            });
        break;
        case 'warning':
            NotificationManager.warning(message, title, timeout, () => {
                callback && callback()
            });
        break;
        case 'error':
            NotificationManager.error(message, title, timeout, () => {
            callback && callback();
        });
        break;
        default:
            NotificationManager.info(message);
        break;
    }
};

export default createNotification;