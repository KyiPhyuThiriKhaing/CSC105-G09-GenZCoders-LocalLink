import { otherUsers } from "./mockUsers";
import { z } from "zod";

export type Job = {
  id: string;
  title: string;
  image: string;
  location: string;
  feeRange: string;
  timeRange: string;
  postedAt: string;
  description: string;
  poster: {
    name: string;
    avatar: string;
  };
};

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Help move small furniture",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Sukhumvit, Bangkok / 1.2 km away",
    feeRange: "฿200 - ฿350",
    timeRange: "1–2 hours",
    postedAt: "2h ago",
    description: `I need an extra pair of hands to help move a small couch, a coffee table, and a few boxes from my living room downstairs to a moving truck.\n\nThere is an elevator in the building, so no heavy lifting down the stairs is required. The items are not overly heavy, but definitely require two people to carry safely without scratching the walls.\n\nI'll be there to help lift, I just need one extra person. Should take about an hour, maybe a bit more depending on how fast we move.`,
    poster: {
      name: otherUsers[0].name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(otherUsers[0].name)}&backgroundColor=e2e8f0`,
    },
  },
  {
    id: "2",
    title: "Dog walking (2 dogs)",
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Lumphini Park, Bangkok / 0.5 km away",
    feeRange: "฿150 - ฿200",
    timeRange: "45 mins",
    postedAt: "4h ago",
    description: `I need someone to walk my two small dogs around Lumphini Park. They are very friendly and walk well on a leash.`,
    poster: {
      name: otherUsers[1].name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(otherUsers[1].name)}&backgroundColor=e2e8f0`,
    },
  },
  {
    id: "3",
    title: "High-school Math Tutoring",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Sathorn, Bangkok / 3.0 km away",
    feeRange: "฿300 - ฿400 / hr",
    timeRange: "1.5 hours",
    postedAt: "5h ago",
    description: `Looking for a tutor for my 10th-grade son who is struggling with algebra and basic geometry.`,
    poster: {
      name: otherUsers[2].name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(otherUsers[2].name)}&backgroundColor=e2e8f0`,
    },
  },
  {
    id: "4",
    title: "Grocery Pickup & Delivery",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Silom, Bangkok / 2.1 km away",
    feeRange: "฿150 + tips",
    timeRange: "1 hour",
    postedAt: "1d ago",
    description: `I am currently sick and need someone to pick up a few essential grocery items from the nearby Tops Supermarket.`,
    poster: {
      name: otherUsers[0].name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(otherUsers[0].name)}&backgroundColor=e2e8f0`,
    },
  },
  {
    id: "5",
    title: "Assemble IKEA desk",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Chatuchak, Bangkok / 4.5 km away",
    feeRange: "฿400 - ฿550",
    timeRange: "2–3 hours",
    postedAt: "1d ago",
    description: `I bought a new standing desk from IKEA and don't have the tools or time to put it together myself. Please bring your own tools if possible.`,
    poster: {
      name: otherUsers[1].name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(otherUsers[1].name)}&backgroundColor=e2e8f0`,
    },
  },
  {
    id: "6",
    title: "Yard work & Leaf raking",
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Ekkamai, Bangkok / 2.8 km away",
    feeRange: "฿250 - ฿400",
    timeRange: "3 hours",
    postedAt: "2d ago",
    description: `My front yard needs some serious cleaning up. Mostly just raking leaves and gathering twigs into bags.`,
    poster: {
      name: otherUsers[2].name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(otherUsers[2].name)}&backgroundColor=e2e8f0`,
    },
  },
];

export const MOCK_HISTORY_APPLIED = [
  {
    title: "Lawn Mowing Service",
    location: "Thong Lo, Bangkok",
    price: "฿350",
    status: "Contacted",
  },
  {
    title: "Dog Walking",
    location: "Lumphini Park, Bangkok",
    price: "฿200",
    status: "Pending",
  },
  {
    title: "Grocery Delivery",
    location: "Phrom Phong, Bangkok",
    price: "฿250",
    status: "Pending",
  },
];

export const MOCK_HISTORY_OFFERED = [
  {
    title: "House Cleaning",
    date: "Mar 20, 2026",
    price: "฿750",
    applicants: 8,
  },
  {
    title: "Furniture Assembly",
    date: "Mar 18, 2026",
    price: "฿500",
    applicants: 5,
  },
  {
    title: "Plant Watering",
    date: "Mar 16, 2026",
    price: "฿150",
    applicants: 12,
  },
];

export const MOCK_HISTORY_ACCEPTED = [
  {
    title: "Pet Sitting",
    user: otherUsers[0].name,
    price: "฿600",
    active: true,
  },
  {
    title: "Snow Shoveling",
    user: otherUsers[1].name,
    price: "฿400",
    active: false,
  },
];

const CREATED_JOBS_KEY = "locallink.createdJobs";

function parseStoredJobs() {
  if (typeof window === "undefined") {
    return [] as Job[];
  }

  try {
    const raw = window.localStorage.getItem(CREATED_JOBS_KEY);
    if (!raw) {
      return [] as Job[];
    }
    const parsed = JSON.parse(raw) as Job[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as Job[];
  }
}

export function getJobs(): Job[] {
  return [...parseStoredJobs(), ...MOCK_JOBS];
}

export function saveJob(job: Job) {
  const stored = parseStoredJobs();
  window.localStorage.setItem(CREATED_JOBS_KEY, JSON.stringify([job, ...stored]));
}

export const jobPostSchema = z.object({
  title: z.string().min(10, "Please provide a descriptive job title."),
  location: z.string().min(5, "Enter the job location or area.").max(80),
  image: z.string().url("Enter a valid image URL.").or(z.literal("")),
  feeRange: z.string().min(3, "Enter an expected pay range."),
  timeRange: z.string().min(3, "Enter the estimated duration."),
  contact: z.string().min(5, "Enter how applicants should contact you."),
  description: z.string().min(20, "Tell helpers more about the task.").max(1000),
  requirements: z.string().max(400).optional(),
});

export type JobPostFormValues = z.infer<typeof jobPostSchema>;
