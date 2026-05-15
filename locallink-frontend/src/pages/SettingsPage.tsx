import { useEffect, useState, type FormEvent } from "react";
import { useCurrentUser } from "../lib/useCurrentUser";
import { updatePassword, updateProfile } from "../lib/authApi";

type SectionStatus = {
  type: "success" | "error";
  message: string;
} | null;

export default function SettingsPage() {
  const { user } = useCurrentUser();
  const joinedDate = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
    : "—";

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameStatus, setNameStatus] = useState<SectionStatus>(null);
  const [emailStatus, setEmailStatus] = useState<SectionStatus>(null);
  const [phoneStatus, setPhoneStatus] = useState<SectionStatus>(null);
  const [passwordStatus, setPasswordStatus] = useState<SectionStatus>(null);

  const [nameSaving, setNameSaving] = useState(false);
  const [emailSaving, setEmailSaving] = useState(false);
  const [phoneSaving, setPhoneSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    setNameStatus(null);
    setEmailStatus(null);
    setPhoneStatus(null);
  }, [user?.id]);

  const handleNameSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const value = newName.trim();
    if (!value) {
      setNameStatus({ type: "error", message: "Please enter a new name." });
      return;
    }
    setNameSaving(true);
    setNameStatus(null);
    try {
      await updateProfile({ fullName: value });
      setNewName("");
      setNameStatus({ type: "success", message: "Name updated." });
    } catch (error) {
      setNameStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to update name.",
      });
    } finally {
      setNameSaving(false);
    }
  };

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const value = newEmail.trim();
    if (!value) {
      setEmailStatus({ type: "error", message: "Please enter a new email." });
      return;
    }
    setEmailSaving(true);
    setEmailStatus(null);
    try {
      await updateProfile({ email: value });
      setNewEmail("");
      setEmailStatus({ type: "success", message: "Email updated." });
    } catch (error) {
      setEmailStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to update email.",
      });
    } finally {
      setEmailSaving(false);
    }
  };

  const handlePhoneSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const value = newPhone.trim();
    if (!value) {
      setPhoneStatus({ type: "error", message: "Please enter a new phone number." });
      return;
    }
    setPhoneSaving(true);
    setPhoneStatus(null);
    try {
      await updateProfile({ phone: value });
      setNewPhone("");
      setPhoneStatus({ type: "success", message: "Phone number updated." });
    } catch (error) {
      setPhoneStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to update phone.",
      });
    } finally {
      setPhoneSaving(false);
    }
  };

  const handlePasswordSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!currentPassword) {
      setPasswordStatus({ type: "error", message: "Enter your current password." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordStatus({
        type: "error",
        message: "New password must be at least 6 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", message: "Passwords do not match." });
      return;
    }
    setPasswordSaving(true);
    setPasswordStatus(null);
    try {
      await updatePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStatus({ type: "success", message: "Password updated." });
    } catch (error) {
      setPasswordStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Unable to update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  const renderStatus = (status: SectionStatus) =>
    status ? (
      <p
        className={`mt-3 text-sm font-semibold ${status.type === "success" ? "text-emerald-600" : "text-red-600"
          }`}
      >
        {status.message}
      </p>
    ) : null;

  const buttonClass =
    "rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60";
  const inputClass =
    "h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)";

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Account Settings
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Manage your name, email, phone number, and password.
        </p>
      </div>

      <div className="space-y-12">
        <form onSubmit={handleNameSubmit}>
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Name</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">Current Name</p>
                <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                  {user?.fullName ?? "Not set"}
                </p>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-bold text-slate-700"
                  htmlFor="new-name"
                >
                  New Name
                </label>
                <input
                  id="new-name"
                  type="text"
                  placeholder="Your new name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={nameSaving} className={buttonClass}>
                {nameSaving ? "Updating…" : "Update Name"}
              </button>
            </div>
            {renderStatus(nameStatus)}
          </section>
        </form>

        <form onSubmit={handleEmailSubmit}>
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Email Address</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">Current Email</p>
                <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                  {user?.email ?? "Not set"}
                </p>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-bold text-slate-700"
                  htmlFor="new-email"
                >
                  New Email
                </label>
                <input
                  id="new-email"
                  type="email"
                  placeholder="new-email@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={emailSaving} className={buttonClass}>
                {emailSaving ? "Updating…" : "Update Email"}
              </button>
            </div>
            {renderStatus(emailStatus)}
          </section>
        </form>

        <form onSubmit={handlePhoneSubmit}>
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Phone Number</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">Current Phone</p>
                <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                  {user?.phone ?? "Not set"}
                </p>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-bold text-slate-700"
                  htmlFor="new-phone"
                >
                  New Phone Number
                </label>
                <input
                  id="new-phone"
                  type="tel"
                  placeholder="+1 (555) 890-1234"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={phoneSaving} className={buttonClass}>
                {phoneSaving ? "Updating…" : "Update Phone Number"}
              </button>
            </div>
            {renderStatus(phoneStatus)}
          </section>
        </form>

        <form onSubmit={handlePasswordSubmit}>
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Change Password
              </h2>
              <span className="text-sm font-semibold text-slate-500">
                Joined {joinedDate}
              </span>
            </div>

            <div className="space-y-6">
              <div className="max-w-md">
                <label
                  className="mb-2 block text-sm font-bold text-slate-700"
                  htmlFor="current-password"
                >
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
                <div>
                  <label
                    className="mb-2 block text-sm font-bold text-slate-700"
                    htmlFor="new-password"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-bold text-slate-700"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={passwordSaving} className={buttonClass}>
                {passwordSaving ? "Updating…" : "Update Password"}
              </button>
            </div>
            {renderStatus(passwordStatus)}
          </section>
        </form>
      </div>
    </div>
  );
}
