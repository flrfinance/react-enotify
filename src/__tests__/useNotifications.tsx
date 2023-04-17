import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Notifications from "../components/Notifications";
import {
  NotificationsProvider,
  useNotifications,
} from "../context/useNotifications";
import { act } from "react-dom/test-utils";

const testTitle = "Test Notification";

type TestComponentProps = {
  status: string;
};

const TestComponent: React.FC<TestComponentProps> = ({ status }) => {
  const { removeNotification, addNotification } = useNotifications();
  const notification = {
    id: "1",
    title: testTitle,
    description: "This is a test notification",
    status,
    dismissible: true,
    dismissAfter: 5000,
    secondaryAction: {
      label: "Secondary Action",
      onClick: () => {
        act(() => {
          removeNotification("1");
        });
      },
    },
  };

  React.useEffect(() => {
    act(() => {
      addNotification(notification);
    });
  }, []);

  return null;
};

describe("Notifications", () => {
  test("renders a notification", async () => {
    render(
      <NotificationsProvider>
        <TestComponent status='info' />
      </NotificationsProvider>
    );

    expect(screen.getByText(testTitle)).toBeInTheDocument();

    // Remove notification
    const dismissButton = screen.getByRole("button", {
      name: /Secondary Action/i,
    });
    userEvent.click(dismissButton);
    await waitFor(() => {
      expect(screen.queryByText(testTitle)).not.toBeInTheDocument();
    });
  });
  test("renders a success notification", async () => {
    render(
      <NotificationsProvider>
        <TestComponent status='success' />
      </NotificationsProvider>
    );

    expect(screen.getByText(testTitle)).toBeInTheDocument();

    // Remove notification
    const dismissButton = screen.getByRole("button", {
      name: /Secondary Action/i,
    });
    userEvent.click(dismissButton);
    await waitFor(() => {
      expect(screen.queryByText(testTitle)).not.toBeInTheDocument();
    });
  });
});

describe("useNotifications", () => {
  test("throws an error when used outside of a NotificationsProvider", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation();
    const Component: React.FC = () => {
      useNotifications();
      return null;
    };
    expect(() => render(<Component />)).toThrow(
      "useNotifications must be used within a NotificationsProvider"
    );
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  test("adds a notification", async () => {
    const AddNotification: React.FC = () => {
      const { addNotification, notifications } = useNotifications();
      const newNotification = {
        id: "2",
        title: "New Notification",
        description: "This is a new notification",
        status: "error",
        dismissible: true,
        dismissAfter: 5000,
      };
      const handleClick = () => {
        addNotification(newNotification);
      };
      return (
        <>
          <button onClick={handleClick}>Add Notification</button>
        </>
      );
    };
    render(
      <NotificationsProvider>
        <AddNotification />
      </NotificationsProvider>
    );
    const addButton = screen.getByRole("button", { name: "Add Notification" });
    act(() => {
      userEvent.click(addButton);
    });
    await waitFor(() => {
      expect(screen.getByText("New Notification")).toBeInTheDocument();
    });
  });
  test("removes a notification", async () => {
    const RemoveComponent: React.FC = () => {
      const { addNotification, removeNotification, notifications } =
        useNotifications();
      const newNotification = {
        id: "2",
        title: "New Notification",
        description: "This is a new notification",
        status: "success",
        dismissible: true,
        dismissAfter: 5000,
      };
      const handleClick = () => {
        addNotification(newNotification);
      };
      const handleRemove = () => {
        removeNotification("2");
      };
      return (
        <>
          <button onClick={handleClick}>Add Notification</button>
          <button onClick={handleRemove}>Remove Notification</button>
        </>
      );
    };
    render(
      <NotificationsProvider>
        <RemoveComponent />
      </NotificationsProvider>
    );
    const addButton = screen.getByRole("button", { name: "Add Notification" });
    act(() => {
      userEvent.click(addButton);
    });
    await waitFor(() => {
      expect(screen.getByText("New Notification")).toBeInTheDocument();
    });
    const removeButton = screen.getByRole("button", {
      name: "Remove Notification",
    });
    act(() => {
      userEvent.click(removeButton);
    });
    await waitFor(() => {
      expect(screen.queryByText("New Notification")).not.toBeInTheDocument();
    });
  });
  test("updates an existing notification", async () => {
    const UpdateComponent: React.FC = () => {
      const { addNotification } = useNotifications();
      const notification = {
        id: "1",
        title: "Existing Notification",
        description: "This is an existing notification",
        status: "warning",
        dismissible: true,
        dismissAfter: 5000,
        secondaryAction: {
          label: "Secondary Action",
          onClick: () => {},
        },
      };
      const updatedNotification = {
        ...notification,
        title: "Updated Notification",
      };
      const handleClick = () => {
        addNotification(notification);
      };
      const handleUpdate = () => {
        addNotification(updatedNotification);
      };
      return (
        <>
          <button onClick={handleClick}>Add Notification</button>
          <button onClick={handleUpdate}>Update Notification</button>
        </>
      );
    };
    render(
      <NotificationsProvider>
        <UpdateComponent />
      </NotificationsProvider>
    );
    const addButton = screen.getByRole("button", { name: "Add Notification" });
    act(() => {
      userEvent.click(addButton);
    });
    await waitFor(() => {
      expect(screen.getByText("Existing Notification")).toBeInTheDocument();
    });
    const updateButton = screen.getByRole("button", {
      name: "Update Notification",
    });
    act(() => {
      userEvent.click(updateButton);
    });
    await waitFor(() => {
      expect(screen.getByText("Updated Notification")).toBeInTheDocument();
    });
  });
});
