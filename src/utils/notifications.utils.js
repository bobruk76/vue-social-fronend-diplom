export function getRouteByNotification(notification) {
    switch (notification.event_type) {
        case 'MESSAGE':
            return { name: 'Im', params: { id: notification.id } }
        default:
            return { name: 'ProfileId', params: { id: notification.id } }
    }
}
