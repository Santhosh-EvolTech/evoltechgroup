import PocketBase from "pocketbase";

// export const url = `http://127.0.0.1:8090`; // localhost
export const url = `https://evoltech-admin.fly.dev`; // production
export const client = new PocketBase(url);
client.autoCancellation(false);
export const isUserValid = client.authStore.isValid;
export const currentUserId = client.authStore.model?.id;

// User functions

export async function getUsers() {
  return await client.collection("users").getFullList({
    sort: "-created",
  });
}
export async function updateUser(id, title, description) {
  const data = {
    title: title,
    description: description,
    user: currentUserId,
  };
  await client.collection("users").update(id, data);
}
export async function deleteUser(id) {
  let confirm = window.confirm("Are you sure you want to delete this user?");
  if (!confirm) {
    return;
  }
  await client.collection("users").delete(id);
  window.location.reload();
}

// Authorisation functions

export async function login(email, password) {
  try {
    await client.collection("users").authWithPassword(email, password);
    window.location.reload();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export function logout() {
  client.authStore.clear();
  window.location.reload();
}
export async function signup(email, password, name) {
  const data = {
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: password,
    name: name,
  };

  try {
    await client.collection("users").create(data);
    window.location.reload();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function requestEmailVerification(email) {
  await client.collection("users").requestVerification(email);
}

export async function getEmailVerified() {
  const user = await client.collection("users").getOne(currentUserId);
  return {
    email: user?.email,
    verified: user?.verified,
  };
}

export async function getCurrentUserData() {
  const user = await client.collection("users").getOne(currentUserId);

  return user;
}

// Blogs funstion

export async function getBlogs() {
  return await client.collection("blogs").getFullList({
    sort: "-created",
  });
}
export async function createBlog(topic, description) {
  const data = {
    topic: topic,
    description: description,
    user: client.authStore.model.id,
  };
  try {
    await client.collection("blogs").create(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function updateBlog(topic, description, id) {
  const data = {
    topic: topic,
    description: description,
  };
  try {
    await client.collection("blogs").update(id, data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function deleteBlog(id) {
  let confirm = window.confirm("Are you sure you want to delete this blog?");
  if (!confirm) {
    return;
  }
  await client.collection("blogs").delete(id);
  window.location.reload();
}

// Recruitment function

export async function getJobList() {
  return await client.collection("recruitment").getFullList({
    sort: "-created",
  });
}
export async function createJob(role, description, type, status) {
  const data = {
    role: role,
    description: description,
    type: type,
    status: status,
  };
  try {
    await client.collection("recruitment").create(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function updateJob(role, description, type, status, id) {
  const data = {
    role: role,
    description: description,
    type: type,
    status: status,
  };
  try {
    await client.collection("recruitment").update(id, data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function deleteJob(id) {
  let confirm = window.confirm(
    "Are you sure you want to delete this position?"
  );
  if (!confirm) {
    return;
  }
  await client.collection("recruitment").delete(id);
  window.location.reload();
}

// Career Submissions

export async function getCareerSubmissions() {
  return await client.collection("careers").getFullList({
    sort: "-created",
  });
}
export async function submitCareerPosition(
  name,
  email,
  phone,
  resume,
  role,
  description
) {
  const data = {
    name: name,
    email: email,
    description: description,
    phone: phone,
    resume: resume,
    role: role,
  };
  try {
    await client.collection("careers").create(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteCareerSubmission(id) {
  let confirm = window.confirm(
    "Are you sure you want to delete this submission?"
  );
  if (!confirm) {
    return;
  }
  await client.collection("careers").delete(id);
  window.location.reload();
}

// Contact

export async function getContactList() {
  return await client.collection("contact").getFullList({
    sort: "-created",
  });
}
export async function submitContact(
  name,
  email,
  organization,
  requirements,
  role,
  message
) {
  const data = {
    name: name,
    email: email,
    organization: organization,
    requirements: requirements,
    role: role,
    message: message,
  };
  try {
    await client.collection("contact").create(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteContact(id) {
  let confirm = window.confirm("Are you sure you want to delete this record?");
  if (!confirm) {
    return;
  }
  await client.collection("contact").delete(id);
  window.location.reload();
}
