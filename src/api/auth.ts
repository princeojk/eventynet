import type { User } from "firebase/auth";

export const saveUser = async (user: User, name: string, email: string) => {
  const url = import.meta.env.VITE_PUBLIC_BASE_URL + "v1/auth/signup";

  const token = await user.getIdToken();

  const body = {
    name: name,
    email: email,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Failed to save user:");
    user.delete();
  }
};
