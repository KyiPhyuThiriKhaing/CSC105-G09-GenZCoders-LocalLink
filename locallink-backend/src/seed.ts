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

const ensureJob = async (posterId: string, title: string) => {
  const existing = await prisma.job.findFirst({
    where: { posterId, title },
  });

  if (existing) {
    return existing;
  }

  return prisma.job.create({
    data: {
      title,
      description: "Help needed for a local task.",
      location: "Sukhumvit, Bangkok",
      payoutText: "฿300 - ฿450",
      payoutCurrency: "THB",
      durationText: "1-2 hours",
      status: "OPEN",
      posterId,
    },
  });
};

const seedJobs = async (posterId: string) => {
  const jobA = await ensureJob(posterId, "Help move small furniture");
  const jobB = await ensureJob(posterId, "Dog walking (2 dogs)");

  return { jobA, jobB };
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
    jobIds: [jobs.jobA.id, jobs.jobB.id],
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
