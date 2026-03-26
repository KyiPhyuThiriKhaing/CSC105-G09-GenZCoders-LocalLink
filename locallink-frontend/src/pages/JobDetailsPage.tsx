import React from "react";
import { ArrowLeftIcon, DrawingPinIcon, ClockIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";

// Mock Job Data
const MOCK_JOB_DETAIL = {
  id: "1",
  title: "Help move small furniture",
  image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  location: "Downtown / 1.2 miles away",
  feeRange: "฿200 - ฿350",
  timeRange: "1–2 hours",
  postedAt: "2h ago",
  description: `I need an extra pair of hands to help move a small couch, a coffee table, and a few boxes from my living room downstairs to a moving truck. 
  
There is an elevator in the building, so no heavy lifting down the stairs is required. The items are not overly heavy, but definitely require two people to carry safely without scratching the walls. 

I'll be there to help lift, I just need one extra person. Should take about an hour, maybe a bit more depending on how fast we move.`,
  poster: {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
};

export default function JobDetailsPage() {
  const { id } = useParams();

  // In a real app we'd fetch data by ID. Here we use the hardcoded mock.
  const job = MOCK_JOB_DETAIL;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/jobs" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Job Image */}
              <div className="w-full h-64 md:h-80 relative bg-gray-100">
                <img 
                  src={job.image} 
                  alt={job.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-semibold text-gray-700 shadow-sm">
                  {job.postedAt}
                </div>
              </div>

              {/* Job Details Header */}
              <div className="p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-4">
                  {job.title}
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8 border-b border-gray-100 pb-6">
                  <div className="flex items-center text-gray-600 gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                      <DrawingPinIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                      <ClockIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-medium">{job.timeRange}</span>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-3">Job Description</h2>
                  <div className="prose prose-gray prose-p:text-gray-600 prose-p:leading-relaxed max-w-none">
                    {job.description.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Payment Card */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="mb-6">
                  <span className="block text-sm text-gray-500 font-medium mb-1">Estimated Payout</span>
                  <span className="text-3xl font-bold text-gray-900">{job.feeRange}</span>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    Apply for Job
                  </button>
                  <button className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
                    Save for Later
                  </button>
                </div>
              </div>

              {/* Poster Card */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  About the Poster
                </h3>
                
                <div className="flex items-center gap-4 mb-5">
                  <img 
                    src={job.poster.avatar} 
                    alt={job.poster.name} 
                    className="w-14 h-14 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{job.poster.name}</h4>
                    <span className="text-sm text-gray-500">Local Resident</span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-medium text-sm transition-colors">
                  Contact Poster
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}