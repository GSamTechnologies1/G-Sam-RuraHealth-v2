import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

type NotificationType =
  | "emergency"
  | "appointment"
  | "health"
  | "education"
  | "weather"
  | "system";

type NotificationPriority = "normal" | "high" | "critical";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: NotificationPriority;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "n-001",
    type: "emergency",
    title: "Emergency Services Available",
    message:
      "Police, ambulance, fire service, FRSC and NEMA contacts are available from the Emergency page.",
    time: "Just now",
    read: false,
    priority: "critical",
  },
  {
    id: "n-002",
    type: "health",
    title: "Daily Health Tip",
    message:
      "Stay hydrated, eat balanced meals and seek professional care when symptoms are severe or persistent.",
    time: "Today • 7:30 AM",
    read: false,
    priority: "normal",
  },
  {
    id: "n-003",
    type: "weather",
    title: "Weather & Safety Alerts",
    message:
      "Weather alerts will appear here when the weather service is connected. Flood, heavy rain and extreme heat alerts can be delivered through this section.",
    time: "Yesterday",
    read: true,
    priority: "high",
  },
  {
    id: "n-004",
    type: "education",
    title: "Health Education Update",
    message:
      "New community health education content will appear here as it becomes available.",
    time: "Yesterday",
    read: true,
    priority: "normal",
  },
  {
    id: "n-005",
    type: "system",
    title: "Welcome to G-Sam RuraHealth",
    message:
      "Your notification centre will keep important health, emergency and service updates in one place.",
    time: "2 days ago",
    read: true,
    priority: "normal",
  },
];

const notificationMeta: Record<
  NotificationType,
  { icon: string; label: string }
> = {
  emergency: { icon: "🚨", label: "Emergency" },
  appointment: { icon: "🏥", label: "Appointment" },
  health: { icon: "❤️", label: "Health" },
  education: { icon: "📚", label: "Health Education" },
  weather: { icon: "🌦️", label: "Weather & Safety" },
  system: { icon: "⚙️", label: "System" },
};

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((item) => !item.read);
    }
    return notifications;
  }, [filter, notifications]);

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markAsRead(item.id);

    if (item.type === "emergency") {
      navigate("/emergency");
    } else if (item.type === "education") {
      navigate("/health-education");
    }
  };

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <button
          type="button"
          className="notifications-back-btn"
          onClick={() => navigate("/citizen-dashboard")}
          aria-label="Go back"
        >
          ←
        </button>

        <div className="notifications-header-text">
          <h1>Notifications</h1>
          <p>Important updates about your health and services.</p>
        </div>

        <div className="notifications-header-icon" aria-hidden="true">
          🔔
        </div>
      </header>

      <main className="notifications-main">
        <section className="notifications-summary">
          <div>
            <span className="notifications-eyebrow">YOUR ALERT CENTRE</span>
            <h2>Stay informed</h2>
            <p>
              Health reminders, emergency alerts, education updates and other
              important information will appear here.
            </p>
          </div>

          <div className="unread-counter">
            <strong>{unreadCount}</strong>
            <span>Unread</span>
          </div>
        </section>

        <section className="notifications-toolbar">
          <div className="notification-filters">
            <button
              type="button"
              className={filter === "all" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("all")}
            >
              All
              <span>{notifications.length}</span>
            </button>

            <button
              type="button"
              className={
                filter === "unread" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setFilter("unread")}
            >
              Unread
              <span>{unreadCount}</span>
            </button>
          </div>

          <button
            type="button"
            className="mark-all-btn"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            ✓ Mark all as read
          </button>
        </section>

        <section className="notifications-list" aria-live="polite">
          {visibleNotifications.length === 0 ? (
            <div className="notifications-empty">
              <div>🔕</div>
              <h3>No unread notifications</h3>
              <p>You're all caught up.</p>
            </div>
          ) : (
            visibleNotifications.map((item) => {
              const meta = notificationMeta[item.type];

              return (
                <article
                  key={item.id}
                  className={`notification-card ${
                    item.read ? "is-read" : "is-unread"
                  } ${item.priority}`}
                >
                  <button
                    type="button"
                    className="notification-card-button"
                    onClick={() => handleNotificationClick(item)}
                  >
                    <div className="notification-icon">{meta.icon}</div>

                    <div className="notification-content">
                      <div className="notification-top-row">
                        <span className="notification-category">
                          {meta.label}
                        </span>

                        {!item.read && (
                          <span className="unread-dot" aria-label="Unread" />
                        )}
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.message}</p>

                      <div className="notification-bottom-row">
                        <span>{item.time}</span>
                        {item.priority !== "normal" && (
                          <span className="priority-label">
                            {item.priority === "critical"
                              ? "Critical"
                              : "Important"}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="notification-arrow">›</span>
                  </button>
                </article>
              );
            })
          )}
        </section>

        <section className="notification-roadmap">
          <div className="roadmap-icon">⚡</div>
          <div>
            <h3>More alerts are coming</h3>
            <p>
              Future versions can connect this centre to Firebase for real-time
              emergency announcements, appointments, medication reminders,
              maternal-health alerts, health campaigns and weather warnings.
            </p>
          </div>
        </section>
      </main>

      <nav className="notifications-bottom-nav">
        <button type="button" onClick={() => navigate("/citizen-dashboard")}>
          🏠
          <span>Home</span>
        </button>

        <button type="button" onClick={() => navigate("/health-education")}>
          ❤️
          <span>Health</span>
        </button>

        <button type="button" onClick={() => navigate("/health-centres")}>
          🏥
          <span>Services</span>
        </button>

        <button type="button" onClick={() => navigate("/emergency")}>
          🚨
          <span>Emergency</span>
        </button>

        <button type="button" className="active">
          🔔
          <span>Alerts</span>
          {unreadCount > 0 && <b>{unreadCount}</b>}
        </button>
      </nav>
    </div>
  );
}