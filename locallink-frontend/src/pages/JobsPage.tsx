import React, { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon, ClockIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

// Mock data (6-8 items)
const MOCK_JOBS = [
  {
    id: "1",
    title: "Help move small furniture",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Downtown / 1.2 miles away",
    feeRange: "฿200 - ฿350",
    timeRange: "1–2 hours",
    postedAt: "2h ago",
  },
  {
    id: "2",
    title: "Dog walking (2 dogs)",
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Westside Park / 0.5 miles away",
    feeRange: "฿150 - ฿200",
    timeRange: "45 mins",
    postedAt: "4h ago",
  },
  {
    id: "3",
    title: "High-school Math Tutoring",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Local Library / 3.0 miles away",
    feeRange: "฿300 - ฿400 / hr",
    timeRange: "1.5 hours",
    postedAt: "5h ago",
  },
  {
    id: "4",
    title: "Grocery Pickup & Delivery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Whole Foods / 2.1 miles away",
    feeRange: "฿150 + tips",
    timeRange: "1 hour",
    postedAt: "1d ago",
  },
  {
    id: "5",
    title: "Assemble IKEA desk",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "North Suburbs / 4.5 miles away",
    feeRange: "฿400 - ฿550",
    timeRange: "2–3 hours",
    postedAt: "1d ago",
  },
  {
    id: "6",
    title: "Yard work & Leaf raking",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Eastside / 2.8 miles away",
    feeRange: "฿250 - ฿400",
    timeRange: "3 hours",
    postedAt: "2d ago",
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = MOCK_JOBS.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      {/* Top Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Mini Jobs
              </h1>
              <p className="text-gray-500 mt-1">
                Find local chores and earn quickly
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                />
              </div>
              <button className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap shadow-sm">
                <PlusIcon className="w-5 h-5" />
                Create Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No jobs found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col group"
              >
                <div className="h-44 relative overflow-hidden">
                  <img 
                    src={job.image} 
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
                    {job.postedAt}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2 line-clamp-2">
                    {job.title}
                  </h3>
                  
                  <div className="space-y-2 mt-auto mb-5">
                    <div className="flex items-center text-sm text-gray-500 gap-1.5">
                      <DrawingPinIcon className="w-4 h-4 text-purple-500" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 gap-1.5">
                      <ClockIcon className="w-4 h-4 text-purple-500" />
                      <span>{job.timeRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                    <div className="font-bold text-gray-900">
                      {job.feeRange}
                    </div>
                    <Link 
                      to={`/jobs/${job.id}`}
                      className="text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-4 py-1.5 rounded-md transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}