import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { supabase } from "./supabase";

//Login User
export const login = async (formData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
  if (error) throw error;
};

//SignUp User
export const signup = async (formData) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
      },
    },
  });
  if (error) throw error;
};

//Get Session
export const getSession = async () => {
  const { isLoading, data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
  } else {
    return data.session;
  }
};

//Current User
export const getCurrentUser = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
  }
  const user = session?.user;
  if (user) {
    // console.log("Current user:", user);
    return user.id;
  } else {
    toast.error("No user is signed in.");
  }
};

//Update User
export const updateUser = async ({ fullname, avatar, email, updated_at }) => {
  const userId = await getCurrentUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ fullname, avatar, email, updated_at: new Date() })
    .eq("id", userId);

  if (error) throw error;
};

//Update Account
export const updateAccount = async ({ username, newAccount }) => {
  let { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("username", username)
    .single();

  let updatedInterests = [...data.account, newAccount];
  console.log(updatedInterests);
  //
  let { error: updateError } = await supabase
    .from("profiles")
    .update({ account: updatedInterests })
    .eq("username", username);

  if (error || updateError) throw error;
};

//Fetch User profile
export const fetchProfile = async () => {
  const userId = await getCurrentUser();
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw new Error("Error fetching profile: " + error.message);
  }
};

//logger
export const Logger = async (newAccount) => {
  console.log(newAccount);
};

//fetch Account
export const fetchAccount = async () => {
  const userId = await getCurrentUser();
  let { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();

  if (error) {
    toast.error("Error fetching account", error.message);
  }
  return data.account;
};

//Delete Account
export const deleteAccount = async (i) => {
  const account = await fetchAccount();
  const userId = await getCurrentUser();

  const rest = account?.filter((_, index) => index !== i);

  let { error } = await supabase
    .from("profiles")
    .update({ account: rest })
    .eq("id", userId);

  if (error) throw error;
};

// Logout Users
export const Logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

//upload Avatar
export async function uploadAvatar(file) {
  const rand = Math.random();
  const userId = await getCurrentUser();
  // Step 1: Upload the new image
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(`${userId}-${rand}-${file?.name}.png`, file);

  if (uploadData) {
    console.log(uploadData);
  } else {
    toast.error("Error", uploadError.message);
    return;
  }

  // Step 2: Generate a public URL for the image
  const { data: publicURL, error: urlError } = supabase.storage
    .from("avatars")
    .getPublicUrl(`${userId}-${rand}-${file?.name}.png`);

  if (publicURL) {
    console.log(publicURL.publicUrl);
    return publicURL.publicUrl;
  } else {
    toast.error("Error", urlError.message);
    return;
  }
}

//Upload Image
export async function uploadBankImage(file) {
  const rand = Math.random();
  const userId = await getCurrentUser();
  // Step 1: Upload the new image
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("bankImage")
    .upload(`${userId}-${rand}.png`, file);

  if (uploadError) {
    toast.error("Error", uploadError.message);
    return;
  }
  console.log(uploadData);

  // Step 2: Generate a public URL for the image
  const { data: publicURL, error: urlError } = supabase.storage
    .from("bankImage")
    .getPublicUrl(`${userId}-${rand}.png`);

  if (publicURL) {
    console.log(publicURL.publicUrl);
    return publicURL.publicUrl;
  } else {
    toast.error("Error", urlError.message);
    return;
  }
}

//Send Forget Password Link
export const forgetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://pgonlineportal.com/changePassword",
  });

  if (error) throw error;
};

//Change Password
export const changePassword = async ({ access_token, newPassword }) => {
  console.log({ access_token, newPassword });

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
};
