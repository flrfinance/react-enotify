# React-Enotify

React-Enotify is a lightweight, customizable notification library for React applications. It provides an easy-to-use hook and context for managing notifications, along with smooth animations powered by React Spring. With React-Enotify, you can quickly integrate and manage notification pop-ups in your application, enhancing user experience and responsiveness.

## Features

- Display notifications with customizable styles
- Dismiss notifications after a certain amount of time
- Add primary and secondary actions to notifications
- Use multiple notification types (success, warning, info, error, and loading)

## Installation

To install `react-enotify`, you can use npm:

```bash
npm install --save react-enotify
```

Or yarn:

```bash
yarn add react-enotify
```

## Usage

To use the Notifications module, follow these steps:

1. Wrap your application with the `NotificationsProvider` component:

```jsx
import { NotificationsProvider } from "react-enotify";

function App() {
  return (
    <NotificationsProvider>
      <div>...Your app goes here...</div>
    </NotificationsProvider>
  );
}
```

2. Use the useNotifications hook in the component where you want to add, remove or manage notifications:

```jsx
import { useNotifications } from "react-enotify";

function MyComponent() {
  const { addNotification, removeNotification } = useNotifications();

  const handleClick = () => {
    addNotification({
      id: "my-notification",
      title: "Notification title",
      description: "Notification description",
      status: "success", // success, info, warning, error
      dismissible: true, // optional
      dismissAfter: 3000, // optional, in milliseconds
      primaryAction: {
        label: "Ok",
        onClick: () => {
          removeNotification("my-notification");
        },
      }, // optional
      secondaryAction: {
        label: "Cancel",
        onClick: () => {
          removeNotification("my-notification");
        },
      }, // optional
    });
  };

  return <button onClick={handleClick}>Add Notification</button>;
}
```

The `addNotification` method expects a notification object with the following properties:

- `id` (string, required): unique identifier for the notification
- `title` (string, required): title of the notification
- `description` (string, required): description of the notification
- `status` (string, required): status of the notification, can be one of: success, info, warning or error
- `dismissible` (boolean, optional): whether the notification can be dismissed or not (defaults to false)
- `dismissAfter` (number, optional): the time in milliseconds after which the notification should be automatically dismissed (defaults to null)
- `primaryAction` (object, optional): an object with `label` and `onClick` properties defining a primary action for the notification (defaults to null)
- `secondaryAction` (object, optional): an object with `label` and `onClick` properties defining a secondary action for the notification (defaults to null)

The `removeNotification` method expects the id of the notification to be removed as a parameter.

## Customization

You can customize the appearance of notifications by overriding the default styles. Here's an example:

```scss
// Override the background color of the success notifications
.r-enotification.success {
  background-color: #b2e2b2;
}

// Override the background color of the error notifications
.r-enotification.error {
  background-color: #e2b2b2;
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
