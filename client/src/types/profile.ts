export interface Profile {
  id: number;
  name: string;
  email: string;
  college: string | null;
  degree: string | null;
  cgpa: number | null;
  skills: string | null;
  bio: string | null;
  linkedin: string | null;
  github: string | null;
  resumeUrl: string | null;
  profilePhotoUrl: string | null;
}

/** Payload for PUT /profile. userId is never included — backend resolves the
 * owner from the JWT. name/email are account info and are not editable here. */
export interface ProfileUpdatePayload {
  college: string;
  degree: string;
  cgpa: number | null;
  skills: string;
  bio: string;
  linkedin: string;
  github: string;
}
