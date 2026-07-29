import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { profileApi } from "@/api/profileApi";
import type { Profile } from "@/types/profile";

interface UseProfileResult {
  profile: Profile | null;
  isLoading: boolean;
  /** True when the backend has no profile for this user yet — not a real error. */
  hasNoProfile: boolean;
  loadError: string | null;
  refetch: () => Promise<void>;
}

export function useProfile(): UseProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoProfile, setHasNoProfile] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    setHasNoProfile(false);
    try {
      const { data } = await profileApi.get();
      setProfile(data);
    } catch (error) {
      // A 404 (or similarly-shaped "not found") means the user simply
      // hasn't created a profile yet — treat as an empty state, not a crash.
      if (
        isAxiosError(error) &&
        (error.response?.status === 404 || error.response?.status === 400)
      ) {
        setProfile(null);
        setHasNoProfile(true);
      } else {
        setLoadError("Couldn't load your profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, hasNoProfile, loadError, refetch: fetchProfile };
}
