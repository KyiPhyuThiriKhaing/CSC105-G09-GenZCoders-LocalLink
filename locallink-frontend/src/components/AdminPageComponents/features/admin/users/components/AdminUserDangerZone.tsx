type AdminUserDangerZoneProps = {
  userName: string;
};

export default function AdminUserDangerZone({
  userName,
}: AdminUserDangerZoneProps) {
  return (
    <section className="rounded-xl border border-red-200 bg-red-50 p-4">
      <h3 className="text-sm font-bold text-red-700">Danger Zone</h3>
      <p className="mt-1 text-xs text-red-600">
        These actions are irreversible
      </p>

      <div className="mt-3 rounded-lg border border-red-200 bg-white p-3">
        <p className="text-sm font-semibold text-(--color-ink-strong)">
          Delete User Account
        </p>
        <p className="mt-1 text-xs text-(--color-text-muted)">
          Permanently remove {userName} and associated account records.
        </p>
        <button
          type="button"
          onClick={() => {
            const shouldDelete = window.confirm(
              "Are you sure you want to delete this user account?",
            );

            if (!shouldDelete) {
              return;
            }

            window.alert(
              "This is a UI placeholder. No deletion logic is connected.",
            );
          }}
          className="mt-3 inline-flex items-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Delete User
        </button>
      </div>
    </section>
  );
}
