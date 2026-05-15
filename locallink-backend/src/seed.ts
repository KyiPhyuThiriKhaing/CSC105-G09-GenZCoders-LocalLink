import { prisma } from "./lib/prisma";

const seedUsers = async () => {
  const admin = await prisma.user.upsert({
    where: { email: "admin@locallink.test" },
    update: {
      fullName: "Admin User",
      role: "ADMIN",
      status: "ACTIVE",
      phone: "+1 202-555-0001",
    },
    create: {
      email: "admin@locallink.test",
      passwordHash: "seeded-admin-hash",
      fullName: "Admin User",
      role: "ADMIN",
      status: "ACTIVE",
      phone: "+1 202-555-0001",
    },
  });

  const maya = await prisma.user.upsert({
    where: { email: "maya@locallink.test" },
    update: {
      fullName: "Maya Rivera",
      status: "ACTIVE",
      phone: "+1 202-555-0102",
      location: "Bangkok, Thailand",
    },
    create: {
      email: "maya@locallink.test",
      passwordHash: "seeded-user-hash",
      fullName: "Maya Rivera",
      status: "ACTIVE",
      phone: "+1 202-555-0102",
      location: "Bangkok, Thailand",
      bio: "Happy to help with local tasks.",
    },
  });

  const liam = await prisma.user.upsert({
    where: { email: "liam@locallink.test" },
    update: {
      fullName: "Liam Carter",
      status: "PENDING",
      phone: "+1 202-555-0103",
      location: "Bangkok, Thailand",
    },
    create: {
      email: "liam@locallink.test",
      passwordHash: "seeded-user-hash",
      fullName: "Liam Carter",
      status: "PENDING",
      phone: "+1 202-555-0103",
      location: "Bangkok, Thailand",
      bio: "New to LocalLink.",
    },
  });

  return { admin, maya, liam };
};

const ensureJob = async (posterId: string, data: {
  title: string;
  description: string;
  location: string;
  payoutText: string;
  durationText: string;
  contactInfo?: string;
  imageUrl?: string;
}) => {
  const existing = await prisma.job.findFirst({ where: { posterId, title: data.title } });
  if (existing) return existing;
  return prisma.job.create({ data: { ...data, payoutCurrency: "THB", status: "OPEN", posterId } });
};

const seedJobs = async (posterId: string) => {
  const jobs = [
    {
      title: "Help move small furniture",
      description: "Need someone strong to help move a sofa and two bookshelves from the 3rd floor to a truck outside. Building has no elevator.",
      location: "Sukhumvit, Bangkok",
      payoutText: "฿300 - ฿450",
      durationText: "1-2 hours",
      contactInfo: "Line: maya_bkk",
      imageUrl: "https://images.unsplash.com/photo-1614359835514-92f8ba196357?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Dog walking (2 dogs)",
      description: "Two friendly golden retrievers need a 45-minute walk around Benjakitti Park. Morning slot preferred, 7-9am. Dogs are well trained and leash-ready.",
      location: "Sukhumvit, Bangkok",
      payoutText: "฿200 - ฿300",
      durationText: "45 minutes",
      contactInfo: "Line: maya_bkk",
      imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Grocery run to Lotus's",
      description: "Need someone to pick up groceries from Lotus's Ekkamai and deliver to my condo on Sukhumvit 42. Shopping list will be provided. Must have a bike or car.",
      location: "Ekkamai, Bangkok",
      payoutText: "฿150 - ฿200",
      durationText: "1 hour",
      contactInfo: "Line: maya_bkk",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "IKEA furniture assembly",
      description: "Bought a KALLAX shelf and a MALM bed frame from IKEA. Need someone handy to assemble both. All tools provided.",
      location: "On Nut, Bangkok",
      payoutText: "฿400 - ฿600",
      durationText: "3-4 hours",
      contactInfo: "Line: liamcarter_th",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Help set up home office",
      description: "Moving into a new apartment and need help arranging desks, mounting a monitor arm, and tidying cable management. Two monitors and a standing desk involved.",
      location: "Thonglor, Bangkok",
      payoutText: "฿300 - ฿400",
      durationText: "2-3 hours",
      contactInfo: "Line: techsetup_help",
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Plant watering while on holiday",
      description: "Going to Chiang Mai for 5 days. Have 12 indoor plants that need watering every other day. Will leave instructions and spare key at reception.",
      location: "Ari, Bangkok",
      payoutText: "฿200 flat",
      durationText: "5 days (every other day)",
      contactInfo: "Email: plants@example.com",
      imageUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Help with Thai paperwork translation",
      description: "Need someone fluent in Thai and English to help translate a rental contract and two utility bills. No certified translation needed, just clear explanations.",
      location: "Silom, Bangkok",
      payoutText: "฿250 - ฿350",
      durationText: "1-2 hours",
      contactInfo: "Line: paperwork_help",
      imageUrl: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const results = [];
  for (const job of jobs) {
    results.push(await ensureJob(posterId, job));
  }
  return results;
};

const ensureSubmission = async (userId: string, status: "PENDING" | "APPROVED") => {
  const existing = await prisma.verificationSubmission.findFirst({
    where: { userId, status },
  });

  if (existing) {
    return existing;
  }

  return prisma.verificationSubmission.create({
    data: {
      userId,
      status,
      notes: status === "PENDING" ? "Awaiting review." : "Approved via seed.",
      adminComment: status === "APPROVED" ? "Seed approval." : undefined,
      reviewedAt: status === "APPROVED" ? new Date() : undefined,
      documents: {
        create: [
          {
            fileName: "National ID.pdf",
            fileUrl: "https://example.com/docs/national-id.pdf",
            mimeType: "application/pdf",
            fileSize: 120000,
          },
          {
            fileName: "Proof of Address.pdf",
            fileUrl: "https://example.com/docs/address.pdf",
            mimeType: "application/pdf",
            fileSize: 98000,
          },
        ],
      },
    },
  });
};

const seedSubmissions = async (mayaId: string, liamId: string) => {
  const pending = await ensureSubmission(liamId, "PENDING");
  const approved = await ensureSubmission(mayaId, "APPROVED");

  await prisma.user.update({
    where: { id: mayaId },
    data: {
      idVerifiedAt: new Date(),
      status: "ACTIVE",
    },
  });

  return { pending, approved };
};

const main = async () => {
  const { admin, maya, liam } = await seedUsers();
  const jobs = await seedJobs(maya.id);
  const submissions = await seedSubmissions(maya.id, liam.id);

  console.log("Seed complete:");
  console.log({
    adminId: admin.id,
    mayaId: maya.id,
    liamId: liam.id,
    jobIds: jobs.map((j) => j.id),
    submissionIds: [submissions.pending.id, submissions.approved.id],
  });
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
