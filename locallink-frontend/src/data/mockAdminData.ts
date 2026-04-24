// Export the type specifically if needed here, or import it. We can just use it structurally.
export type Submission = {
    id: number;
    name: string;
    email: string;
    phone: string;
    date: string;
    status: "Pending" | "Approved" | "Rejected";
    documents: string[];
    notes: string;
};

export const MOCK_ADMIN_SUBMISSIONS: Submission[] = [
    {
        id: 1,
        name: "Liam Carter",
        email: "liam.carter@example.com",
        phone: "+1 202-555-0101",
        date: "2026-03-10",
        status: "Pending",
        documents: ["National ID.pdf", "Utility Bill.pdf", "Selfie Verification.jpg"],
        notes: "Recently moved to a new address and uploaded the latest utility bill for verification.",
    },
    {
        id: 2,
        name: "Ava Martinez",
        email: "ava.martinez@example.com",
        phone: "+1 202-555-0102",
        date: "2026-03-10",
        status: "Approved",
        documents: ["Passport.pdf", "Proof of Address.pdf"],
        notes: "Documents are clear and match submitted profile details.",
    },
    {
        id: 3,
        name: "Noah Kim",
        email: "noah.kim@example.com",
        phone: "+1 202-555-0103",
        date: "2026-03-11",
        status: "Rejected",
        documents: ["Student ID.png", "Phone Bill.pdf"],
        notes: "Identity document is expired. User should upload a valid government ID.",
    },
    {
        id: 4,
        name: "Sophia Ahmed",
        email: "sophia.ahmed@example.com",
        phone: "+1 202-555-0104",
        date: "2026-03-12",
        status: "Pending",
        documents: ["Driver License.pdf", "Bank Statement.pdf", "Residence Permit.pdf"],
        notes: "Name spelling differs slightly between bank statement and profile.",
    },
    {
        id: 5,
        name: "Ethan Rivera",
        email: "ethan.rivera@example.com",
        phone: "+1 202-555-0105",
        date: "2026-03-12",
        status: "Approved",
        documents: ["Passport.pdf", "Credit Card Statement.pdf"],
        notes: "All details aligned; verification checks complete.",
    },
    {
        id: 6,
        name: "Mia Thompson",
        email: "mia.thompson@example.com",
        phone: "+1 202-555-0106",
        date: "2026-03-13",
        status: "Pending",
        documents: ["National ID.pdf", "Rent Agreement.pdf", "Profile Photo.jpg"],
        notes: "Address proof is valid but profile photo has glare; may request re-upload.",
    },
    {
        id: 7,
        name: "Lucas Brooks",
        email: "lucas.brooks@example.com",
        phone: "+1 202-555-0107",
        date: "2026-03-14",
        status: "Rejected",
        documents: ["Temporary ID.pdf", "Utility Bill.png"],
        notes: "Temporary ID type is not accepted for account verification.",
    },
    {
        id: 8,
        name: "Isabella Young",
        email: "isabella.young@example.com",
        phone: "+1 202-555-0108",
        date: "2026-03-15",
        status: "Pending",
        documents: ["Passport.pdf", "Tax Document.pdf", "Proof of Residency.pdf"],
        notes: "Documents complete, pending final manual review by admin.",
    },
    {
        id: 9,
        name: "James Patel",
        email: "james.patel@example.com",
        phone: "+1 202-555-0109",
        date: "2026-03-15",
        status: "Approved",
        documents: ["Driver License.pdf", "Insurance Statement.pdf"],
        notes: "Identity and address details verified successfully.",
    },
    {
        id: 10,
        name: "Emily Chen",
        email: "emily.chen@example.com",
        phone: "+1 202-555-0110",
        date: "2026-03-16",
        status: "Pending",
        documents: ["National ID.pdf", "Bank Statement.pdf", "Residency Card.pdf"],
        notes: "Awaiting confirmation for one supporting document that appears cropped.",
    },
];

export type UserStatus = "Active" | "Pending" | "Suspended";

export type AdminUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
    joinedAt: string;
    status: UserStatus;
}

export const MOCK_ADMIN_USERS: AdminUser[] = [
    {
        id: 1,
        name: "Liam Carter",
        email: "liam.carter@example.com",
        phone: "+1 202-555-0101",
        joinedAt: "2026-01-10",
        status: "Active",
    },
    {
        id: 2,
        name: "Ava Martinez",
        email: "ava.martinez@example.com",
        phone: "+1 202-555-0102",
        joinedAt: "2026-01-15",
        status: "Active",
    },
    {
        id: 3,
        name: "Noah Kim",
        email: "noah.kim@example.com",
        phone: "+1 202-555-0103",
        joinedAt: "2026-01-20",
        status: "Pending",
    },
    {
        id: 4,
        name: "Sophia Ahmed",
        email: "sophia.ahmed@example.com",
        phone: "+1 202-555-0104",
        joinedAt: "2026-01-25",
        status: "Active",
    },
    {
        id: 5,
        name: "Ethan Rivera",
        email: "ethan.rivera@example.com",
        phone: "+1 202-555-0105",
        joinedAt: "2026-02-02",
        status: "Active",
    },
    {
        id: 6,
        name: "Mia Thompson",
        email: "mia.thompson@example.com",
        phone: "+1 202-555-0106",
        joinedAt: "2026-02-08",
        status: "Suspended",
    },
    {
        id: 7,
        name: "Lucas Brooks",
        email: "lucas.brooks@example.com",
        phone: "+1 202-555-0107",
        joinedAt: "2026-02-11",
        status: "Active",
    },
    {
        id: 8,
        name: "Isabella Young",
        email: "isabella.young@example.com",
        phone: "+1 202-555-0108",
        joinedAt: "2026-02-15",
        status: "Pending",
    },
    {
        id: 9,
        name: "James Patel",
        email: "james.patel@example.com",
        phone: "+1 202-555-0109",
        joinedAt: "2026-02-19",
        status: "Active",
    },
    {
        id: 10,
        name: "Emily Chen",
        email: "emily.chen@example.com",
        phone: "+1 202-555-0110",
        joinedAt: "2026-02-22",
        status: "Suspended",
    },
];

export const MOCK_ADMIN_DASHBOARD_STATS = [
    { label: "Total Users", value: "2,845", trend: "+12.5%", isPositive: true },
    { label: "Active Jobs", value: "432", trend: "+5.2%", isPositive: true },
    { label: "Pending Verifications", value: "86", trend: "-2.4%", isPositive: false },
    { label: "Total Revenue", value: "฿124,500", trend: "+18.3%", isPositive: true },
];

export const MOCK_ADMIN_DASHBOARD_QUICK_ACTIONS = [
    { label: "Review Submissions", path: "/admin/submissions", color: "blue", count: 12 },
    { label: "Manage Users", path: "/admin/users", color: "indigo", count: null },
    { label: "Platform Settings", path: "/admin/settings", color: "slate", count: null },
];

export const MOCK_DASHBOARD_STATS = [
    { label: "Total Submissions", value: 8 },
    { label: "Pending Review", value: 4 },
    { label: "Approved", value: 2 },
    { label: "Rejected", value: 2 },
] as const;

export type DashboardStat = (typeof MOCK_DASHBOARD_STATS)[number];
