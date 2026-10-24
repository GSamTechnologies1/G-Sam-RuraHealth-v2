import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Notifications.css";

type NotificationType =
  | "emergency"
  | "appointment"
  | "health"
  | "education"
  | "weather"
  | "system";

type NotificationPriority =
  | "normal"
  | "high"
  | "critical";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: NotificationPriority;
};

type ReminderType =
  | "medication"
  | "appointment"
  | "checkup"
  | "antenatal"
  | "immunization";

type ReminderFrequency =
  | "once"
  | "daily"
  | "weekly";

type PatientReminder = {
  id: string;
  type: ReminderType;
  title: string;
  instructions: string;
  date: string;
  time: string;
  frequency: ReminderFrequency;
  completedDates: string[];
  lastNotifiedDate: string;
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
  emergency: {
    icon: "🚨",
    label: "Emergency",
  },
  appointment: {
    icon: "🏥",
    label: "Appointment",
  },
  health: {
    icon: "❤️",
    label: "Health",
  },
  education: {
    icon: "📚",
    label: "Health Education",
  },
  weather: {
    icon: "🌦️",
    label: "Weather & Safety",
  },
  system: {
    icon: "⚙️",
    label: "System",
  },
};

const reminderMeta: Record<
  ReminderType,
  { icon: string; label: string }
> = {
  medication: {
    icon: "💊",
    label: "Medication",
  },
  appointment: {
    icon: "🏥",
    label: "Appointment",
  },
  checkup: {
    icon: "❤️",
    label: "Checkup",
  },
  antenatal: {
    icon: "🤰",
    label: "Antenatal",
  },
  immunization: {
    icon: "💉",
    label: "Immunization",
  },
};

const NOTIFICATIONS_STORAGE_KEY =
  "rurahealth-notifications";

const REMINDERS_STORAGE_KEY =
  "rurahealth-reminders";

function readStorage<T>(
  key: string,
  fallback: T
): T {
  try {
    const saved = localStorage.getItem(key);

    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getLocalDate(): string {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getLocalTime(): string {
  const now = new Date();

  const hours = String(
    now.getHours()
  ).padStart(2, "0");

  const minutes = String(
    now.getMinutes()
  ).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function isReminderDueToday(
  reminder: PatientReminder
): boolean {
  const today = getLocalDate();

  if (today < reminder.date) {
    return false;
  }

  if (reminder.frequency === "once") {
    return today === reminder.date;
  }

  if (reminder.frequency === "daily") {
    return true;
  }

  const startDate = new Date(
    `${reminder.date}T12:00:00`
  );

  const todayDate = new Date(
    `${today}T12:00:00`
  );

  return (
    startDate.getDay() === todayDate.getDay()
  );
}

function getReminderStatus(
  reminder: PatientReminder
): string {
  const today = getLocalDate();

  const completed =
    reminder.completedDates.includes(today);

  if (completed) {
    return "Completed today";
  }

  if (!isReminderDueToday(reminder)) {
    return "Upcoming";
  }

  if (reminder.time < getLocalTime()) {
    return "Due";
  }

  return "Scheduled today";
}

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(() =>
      readStorage(
        NOTIFICATIONS_STORAGE_KEY,
        initialNotifications
      )
    );

  const [reminders, setReminders] =
    useState<PatientReminder[]>(() =>
      readStorage(
        REMINDERS_STORAGE_KEY,
        []
      )
    );

  const [activeAlarm, setActiveAlarm] =
    useState<PatientReminder | null>(null);

  const [alarmEnabled, setAlarmEnabled] =
    useState(false);

  const alarmAudio = useMemo(() => {
    if (typeof Audio === "undefined") {
      return null;
    }

    const audio = new Audio("/sounds/health-alarm.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 1;

    return audio;
  }, []);

  const [filter, setFilter] = useState<
    "all" | "unread"
  >("all");

  const [showReminderForm, setShowReminderForm] =
    useState(false);

  const [reminderType, setReminderType] =
    useState<ReminderType>("medication");

  const [reminderTitle, setReminderTitle] =
    useState("");

  const [reminderInstructions, setReminderInstructions] =
    useState("");

  const [reminderDate, setReminderDate] =
    useState(getLocalDate());

  const [reminderTime, setReminderTime] =
    useState("");

  const [reminderFrequency, setReminderFrequency] =
    useState<ReminderFrequency>("once");

  const [clock, setClock] = useState(Date.now());

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (item) => !item.read
      ).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (item) => !item.read
      );
    }

    return notifications;
  }, [filter, notifications]);

  const dueReminders = useMemo(
    () =>
      reminders.filter(
        (reminder) =>
          isReminderDueToday(reminder)
      ),
    [reminders, clock]
  );

  const pendingReminderCount = useMemo(
    () =>
      dueReminders.filter(
        (reminder) =>
          !reminder.completedDates.includes(
            getLocalDate()
          )
      ).length,
    [dueReminders, clock]
  );

  useEffect(() => {
    localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      REMINDERS_STORAGE_KEY,
      JSON.stringify(reminders)
    );
  }, [reminders]);

  // Refresh the displayed reminder statuses.
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClock(Date.now());
    }, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  // Check due reminders while this page is open.
  useEffect(() => {
    const checkScheduledReminders = () => {
      if (activeAlarm) {
        return;
      }

      const today = getLocalDate();
      const currentTime = getLocalTime();

      const dueReminder = reminders.find((reminder) => {
        return (
          isReminderDueToday(reminder) &&
          reminder.time <= currentTime &&
          !reminder.completedDates.includes(today) &&
          reminder.lastNotifiedDate !== today
        );
      });

      if (!dueReminder) {
        return;
      }

      setReminders((current) =>
        current.map((reminder) =>
          reminder.id === dueReminder.id
            ? { ...reminder, lastNotifiedDate: today }
            : reminder
        )
      );

      setActiveAlarm(dueReminder);

      if (alarmAudio && alarmEnabled) {
        alarmAudio.currentTime = 0;
        void alarmAudio.play().catch(() => {
          console.warn("The browser blocked alarm playback.");
        });
      }

      if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        try {
          new Notification(`G-Sam RuraHealth: ${dueReminder.title}`, {
            body:
              dueReminder.instructions ||
              "Please review your scheduled health reminder.",
            tag: `rurahealth-${dueReminder.id}-${today}`,
          });
        } catch {
          // The reminder remains visible inside the app.
        }
      }
    };

    checkScheduledReminders();
    const intervalId = window.setInterval(checkScheduledReminders, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reminders, alarmAudio, alarmEnabled, activeAlarm]);

  useEffect(() => {
    return () => {
      if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
      }
    };
  }, [alarmAudio]);

  const enableAlarmSound = async () => {
    if (!alarmAudio) {
      window.alert("Audio is not supported in this browser.");
      return;
    }

    try {
      alarmAudio.loop = false;
      await alarmAudio.play();
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      alarmAudio.loop = true;
      setAlarmEnabled(true);

      if (activeAlarm) {
        await alarmAudio.play();
      }

      window.alert("Alarm sound enabled successfully.");
    } catch {
      window.alert(
        "Could not enable alarm sound. Check that public/sounds/health-alarm.mp3 exists and your browser audio is enabled."
      );
    }
  };

  const stopAlarm = () => {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }

    setActiveAlarm(null);
  };

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const handleNotificationClick = (
    item: NotificationItem
  ) => {
    markAsRead(item.id);

    if (item.type === "emergency") {
      navigate("/emergency");
    } else if (item.type === "education") {
      navigate("/health-education");
    } else if (item.type === "appointment") {
      navigate("/appointments");
    }
  };

  const addReminder = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !reminderTitle.trim() ||
      !reminderDate ||
      !reminderTime
    ) {
      alert(
        "Please enter a title, date and time."
      );

      return;
    }

    if (reminderDate < getLocalDate()) {
      alert(
        "Please choose today or a future date."
      );

      return;
    }

    const newReminder: PatientReminder = {
      id: crypto.randomUUID(),
      type: reminderType,
      title: reminderTitle.trim(),
      instructions: reminderInstructions.trim(),
      date: reminderDate,
      time: reminderTime,
      frequency: reminderFrequency,
      completedDates: [],
      lastNotifiedDate: "",
    };

    setReminders((current) => [
      ...current,
      newReminder,
    ]);

    setReminderTitle("");
    setReminderInstructions("");
    setReminderDate(getLocalDate());
    setReminderTime("");
    setReminderFrequency("once");
    setShowReminderForm(false);
  };

  const markReminderCompleted = (
    id: string
  ) => {
    const today = getLocalDate();

    setReminders((current) =>
      current.map((reminder) => {
        if (reminder.id !== id) {
          return reminder;
        }

        return {
          ...reminder,
          completedDates: [
            ...new Set([
              ...reminder.completedDates,
              today,
            ]),
          ],
        };
      })
    );
  };

  const deleteReminder = (id: string) => {
    const confirmed = window.confirm(
      "Delete this reminder?"
    );

    if (!confirmed) {
      return;
    }

    setReminders((current) =>
      current.filter(
        (reminder) => reminder.id !== id
      )
    );
  };

  const enableBrowserNotifications = async () => {
    if (!("Notification" in window)) {
      alert(
        "This browser does not support browser notifications."
      );

      return;
    }

    if (Notification.permission === "granted") {
      alert(
        "Browser notifications are already enabled."
      );

      return;
    }

    if (Notification.permission === "denied") {
      alert(
        "Notifications are blocked in your browser settings. Please enable them there."
      );

      return;
    }

    const permission =
      await Notification.requestPermission();

    if (permission === "granted") {
      alert(
        "Browser notifications enabled. Keep RuraHealth open for reminder alerts."
      );
    } else {
      alert(
        "Notification permission was not granted."
      );
    }
  };

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <button
          type="button"
          className="notifications-back-btn"
          onClick={() =>
            navigate("/citizen-dashboard")
          }
          aria-label="Go back"
        >
          ←
        </button>

        <div className="notifications-header-text">
          <h1>Notifications</h1>

          <p>
            Important updates about your health and services.
          </p>
        </div>

        <div
          className="notifications-header-icon"
          aria-hidden="true"
        >
          🔔
        </div>
      </header>

      <main className="notifications-main">
        {activeAlarm && (
          <section className="active-health-alarm" role="alert" aria-live="assertive">
            <div className="active-health-alarm-icon" aria-hidden="true">
              🔔
            </div>

            <div className="active-health-alarm-content">
              <span>HEALTH REMINDER DUE</span>
              <h2>{activeAlarm.title}</h2>
              <p>
                {activeAlarm.instructions ||
                  "Please review your scheduled health reminder."}
              </p>

              <div className="active-health-alarm-actions">
                <button
                  type="button"
                  onClick={() => {
                    markReminderCompleted(activeAlarm.id);
                    stopAlarm();
                  }}
                >
                  ✓ Mark Completed
                </button>
                <button type="button" onClick={stopAlarm}>
                  Stop Alarm
                </button>
              </div>
            </div>
          </section>
        )}
        <section className="notifications-summary">
          <div>
            <span className="notifications-eyebrow">
              YOUR ALERT CENTRE
            </span>

            <h2>Stay informed</h2>

            <p>
              Health reminders, emergency alerts,
              education updates and other important
              information in one place.
            </p>
          </div>

          <div className="unread-counter">
            <strong>{unreadCount}</strong>
            <span>Unread</span>
          </div>
        </section>

        {/* Patient reminders */}
        <section className="patient-reminders">
          <div className="patient-reminders-header">
            <div>
              <span className="notifications-eyebrow">
                PERSONAL HEALTH SCHEDULE
              </span>

              <h2>My Reminders</h2>

              <p>
                Manage your medication schedules,
                appointments and checkups.
              </p>
            </div>

            <button
              type="button"
              className="add-reminder-btn"
              onClick={() =>
                setShowReminderForm(
                  (current) => !current
                )
              }
            >
              {showReminderForm
                ? "Cancel"
                : "+ Add Reminder"}
            </button>
          </div>

          <div className="reminder-summary-row">
            <div className="reminder-summary-item">
              <strong>{reminders.length}</strong>
              <span>Total reminders</span>
            </div>

            <div className="reminder-summary-item">
              <strong>{dueReminders.length}</strong>
              <span>Scheduled today</span>
            </div>

            <div className="reminder-summary-item">
              <strong>{pendingReminderCount}</strong>
              <span>Pending today</span>
            </div>
          </div>

          {showReminderForm && (
            <form
              className="reminder-form"
              onSubmit={addReminder}
            >
              <h3>Create a health reminder</h3>

              <label>
                Reminder category

                <select
                  value={reminderType}
                  onChange={(event) =>
                    setReminderType(
                      event.target.value as ReminderType
                    )
                  }
                >
                  <option value="medication">
                    Medication
                  </option>

                  <option value="appointment">
                    Hospital appointment
                  </option>

                  <option value="checkup">
                    Routine checkup
                  </option>

                  <option value="antenatal">
                    Antenatal visit
                  </option>

                  <option value="immunization">
                    Immunization
                  </option>
                </select>
              </label>

              <label>
                Reminder title

                <input
                  type="text"
                  value={reminderTitle}
                  onChange={(event) =>
                    setReminderTitle(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Hospital follow-up"
                  required
                />
              </label>

              <label>
                Instructions or details

                <textarea
                  value={reminderInstructions}
                  onChange={(event) =>
                    setReminderInstructions(
                      event.target.value
                    )
                  }
                  placeholder="Enter appointment details or prescribed instructions."
                  rows={3}
                />
              </label>

              <div className="reminder-form-row">
                <label>
                  Start date

                  <input
                    type="date"
                    value={reminderDate}
                    min={getLocalDate()}
                    onChange={(event) =>
                      setReminderDate(
                        event.target.value
                      )
                    }
                    required
                  />
                </label>

                <label>
                  Time

                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(event) =>
                      setReminderTime(
                        event.target.value
                      )
                    }
                    required
                  />
                </label>
              </div>

              <label>
                Repeat schedule

                <select
                  value={reminderFrequency}
                  onChange={(event) =>
                    setReminderFrequency(
                      event.target.value as ReminderFrequency
                    )
                  }
                >
                  <option value="once">
                    One time
                  </option>

                  <option value="daily">
                    Daily
                  </option>

                  <option value="weekly">
                    Weekly
                  </option>
                </select>
              </label>

              <p className="reminder-form-note">
                For medication, enter the schedule
                provided by your healthcare professional.
                This prototype does not determine dosage.
              </p>

              <button
                type="submit"
                className="save-reminder-btn"
              >
                Save Reminder
              </button>
            </form>
          )}

          {reminders.length === 0 ? (
            <div className="reminders-empty">
              <span>⏰</span>

              <h3>No personal reminders yet</h3>

              <p>
                Add a reminder to start managing
                your health schedule.
              </p>
            </div>
          ) : (
            <div className="patient-reminders-list">
              {reminders.map((reminder) => {
                const meta =
                  reminderMeta[reminder.type];

                const status =
                  getReminderStatus(reminder);

                const isCompleted =
                  status === "Completed today";

                const isDue =
                  status === "Due";

                return (
                  <article
                    className="patient-reminder-card"
                    key={reminder.id}
                  >
                    <div className="patient-reminder-icon">
                      {meta.icon}
                    </div>

                    <div className="patient-reminder-content">
                      <div className="reminder-title-row">
                        <span className="reminder-category">
                          {meta.label}
                        </span>

                        <span
                          className={
                            isCompleted
                              ? "reminder-status completed"
                              : isDue
                                ? "reminder-status due"
                                : "reminder-status"
                          }
                        >
                          {status}
                        </span>
                      </div>

                      <h3>{reminder.title}</h3>

                      {reminder.instructions && (
                        <p>
                          {reminder.instructions}
                        </p>
                      )}

                      <div className="reminder-date-time">
                        <span>
                          📅 {reminder.date}
                        </span>

                        <span>
                          🕒 {reminder.time}
                        </span>

                        <span>
                          🔁 {reminder.frequency}
                        </span>
                      </div>

                      <div className="patient-reminder-actions">
                        {isReminderDueToday(reminder) &&
                          !isCompleted && (
                            <button
                              type="button"
                              onClick={() =>
                                markReminderCompleted(
                                  reminder.id
                                )
                              }
                            >
                              ✓ Mark completed
                            </button>
                          )}

                        <button
                          type="button"
                          className="delete-reminder-btn"
                          onClick={() =>
                            deleteReminder(reminder.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="reminder-alert-controls">
            <button
              type="button"
              className="notification-permission-btn"
              onClick={enableAlarmSound}
            >
              🔊 {alarmEnabled ? "Alarm Sound Enabled" : "Enable Alarm Sound"}
            </button>

            <button
              type="button"
              className="notification-permission-btn"
              onClick={enableBrowserNotifications}
            >
              🔔 Enable Browser Notifications
            </button>
          </div>

          <p className="reminder-browser-note">
            Browser alerts work while this page is open.
            Background delivery when the app is closed
            requires additional notification infrastructure.
          </p>
        </section>

        {/* General notifications */}
        <section className="notifications-toolbar">
          <div className="notification-filters">
            <button
              type="button"
              className={
                filter === "all"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setFilter("all")}
            >
              All
              <span>{notifications.length}</span>
            </button>

            <button
              type="button"
              className={
                filter === "unread"
                  ? "filter-btn active"
                  : "filter-btn"
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

        <section
          className="notifications-list"
          aria-live="polite"
        >
          {visibleNotifications.length === 0 ? (
            <div className="notifications-empty">
              <div>🔕</div>

              <h3>No unread notifications</h3>

              <p>
                You're all caught up.
              </p>
            </div>
          ) : (
            visibleNotifications.map((item) => {
              const meta =
                notificationMeta[item.type];

              return (
                <article
                  key={item.id}
                  className={
                    `notification-card ${
                      item.read
                        ? "is-read"
                        : "is-unread"
                    } ${item.priority}`
                  }
                >
                  <button
                    type="button"
                    className="notification-card-button"
                    onClick={() =>
                      handleNotificationClick(item)
                    }
                  >
                    <div className="notification-icon">
                      {meta.icon}
                    </div>

                    <div className="notification-content">
                      <div className="notification-top-row">
                        <span className="notification-category">
                          {meta.label}
                        </span>

                        {!item.read && (
                          <span
                            className="unread-dot"
                            aria-label="Unread"
                          />
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

                    <span className="notification-arrow">
                      ›
                    </span>
                  </button>
                </article>
              );
            })
          )}
        </section>

        <section className="notification-roadmap">
          <div className="roadmap-icon">⚡</div>

          <div>
            <h3>More health alerts</h3>

            <p>
              Future integrations can provide real-time
              appointment updates, facility announcements,
              weather warnings and personalized health
              messages.
            </p>
          </div>
        </section>
      </main>

      <nav className="notifications-bottom-nav">
        <button
          type="button"
          onClick={() =>
            navigate("/citizen-dashboard")
          }
        >
          🏠
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/health-education")
          }
        >
          ❤️
          <span>Health</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/health-centres")
          }
        >
          🏥
          <span>Services</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/emergency")
          }
        >
          🚨
          <span>Emergency</span>
        </button>

        <button
          type="button"
          className="active"
        >
          🔔
          <span>Alerts</span>

          {unreadCount > 0 && (
            <b>{unreadCount}</b>
          )}



        </button>
      </nav>
    </div>
  );
}