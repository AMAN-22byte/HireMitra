import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apijobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);
  const { loading: loadingJobs, data: jobs, fn: fnJobs } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
      {/* Page Title */}
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row w-full gap-4 items-center mb-6"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-14 flex-1 px-4 text-lg bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" className="h-14 px-6 text-lg bg-blue-600 hover:bg-blue-700">
          Search
        </Button>
      </form>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full sm:w-1/3 h-14 px-4 text-lg bg-gray-900 text-white border border-gray-700 rounded-lg">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border border-gray-700">
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name} className="hover:bg-gray-700">
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger className="w-full sm:w-1/3 h-14 px-4 text-lg bg-gray-900 text-white border border-gray-700 rounded-lg">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border border-gray-700">
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem key={id} value={id} className="hover:bg-gray-700">
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          className="w-full sm:w-1/3 h-14 text-lg bg-red-600 hover:bg-red-700"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {/* Loading Spinner */}
      {loadingJobs && (
        <div className="flex justify-center my-6">
          <BarLoader width={"100%"} color="#36d7b7" />
        </div>
      )}

      {/* Job Listings */}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs?.length ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
            ))
          ) : (
            <div className="text-center text-xl text-gray-400 col-span-full">
              No Jobs Found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
