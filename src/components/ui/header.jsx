import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "../ui/button.jsx";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center px-6 bg-black text-white shadow-lg border-b border-gray-800 sticky top-0 z-50">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://d2iiahg0ip5afn.cloudfront.net/logos/5714/449107435.m9.logo..2..jpg"
            className="h-16 rounded-lg transition-transform duration-200 hover:scale-105"
            alt="Hired Logo"
          />
        </Link>

        {/* Navigation & Buttons */}
        <div className="flex gap-6 items-center">
          <SignedOut>
            <Button
              variant="outline"
              className="border border-green-500 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-300"
              onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/postjob">
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300">
                  <PenBox size={20} />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border border-gray-600 rounded-full",
                },
              }}>
              <UserButton.MenuItems className="bg-gray-900 text-white shadow-md rounded-lg">
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={
                    <BriefcaseBusiness size={15} className="text-green-400" />
                  }
                  href="/job/:id"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} className="text-red-400" />}
                  href="/savedjobs"
                />
                <UserButton.Link
                  label="Manage Account"
                  labelIcon={
                    <BriefcaseBusiness size={15} className="text-blue-400" />
                  }
                  href="/account"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* Sign-in Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]"
          onClick={handleOverlayClick}>
          <div className="relative z-[1010] bg-black p-6 rounded-lg shadow-lg">
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
