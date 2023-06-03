import { url as URL } from "../lib/pocketbase";
import { format, parseISO, isValid } from "date-fns";

export function getTimeStamp(timestamp) {
  const date = parseISO(timestamp);

  if (!isValid(date)) {
    // Handle invalid date
    console.error("Invalid date:", timestamp);
    return "";
  }

  const formattedDateTime = format(date, "MMMM d, yyyy 'at' hh:mm a");

  return formattedDateTime || "";
}
export function getFilteredUser(userId, users) {
  const filteredUser = users.find((item) => item?.id === userId);
  return filteredUser;
}
export function getFilteredBlogs(userId, blogs) {
  const filteredBlogs = blogs.filter((item) => item?.user === userId);
  return filteredBlogs;
}
export function getFiles(resultObj, attr) {
  const attachmentNames =
    attr === "attachments"
      ? resultObj?.attachments
          .map((attachment) => ({
            [`${attachment}`]: `${URL}/api/files/${resultObj?.collectionName}/${resultObj?.id}/${attachment}`,
          }))
          .reduce(
            (accumulator, current) => ({
              ...accumulator,
              ...current,
            }),
            {}
          )
      : attr === "images"
      ? resultObj?.images
          .map((attachment) => ({
            [`${attachment}`]: `${URL}/api/files/${resultObj?.collectionName}/${resultObj?.id}/${attachment}`,
          }))
          .reduce(
            (accumulator, current) => ({
              ...accumulator,
              ...current,
            }),
            {}
          )
      : attr === "docs" &&
        resultObj?.docs
          .map((attachment) => ({
            [`${attachment}`]: `${URL}/api/files/${resultObj?.collectionName}/${resultObj?.id}/${attachment}`,
          }))
          .reduce(
            (accumulator, current) => ({
              ...accumulator,
              ...current,
            }),
            {}
          );

  return attachmentNames;
}
export function getAvatarUrl(blogs, user, value) {
  if (value === "profile") {
    const url = user?.avatar
      ? `${URL}/api/files/${user?.collectionName}/${user?.id}/${user?.avatar}`
      : `../../assets/user.svg`;
    return url;
  }
  if (value === "blogs") {
    const filter = getFilteredUser(blogs?.user, user);
    const url = filter?.avatar
      ? `${URL}/api/files/${filter?.collectionName}/${filter?.id}/${filter?.avatar}`
      : `../../assets/user.svg`;
    return url;
  } else {
    return `../../assets/user.svg`;
  }
}
export function getBlogCover(blog) {
  const url = blog?.images
    ? `${URL}/api/files/${blog?.collectionName}/${blog?.id}/${blog?.images}`
    : "";
  return url;
}
export const getTableAvatarUrl = (id, avatar) => {
  const url =
    id && avatar
      ? `${URL}/api/files/users/${id}/${avatar}`
      : `../../assets/user.svg`;
  return url;
};

export function getDateOfBirth(dateStr) {
  const dateFormat = new Date(dateStr).toLocaleDateString("en-GB");
  const formattedDate = new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dob = formattedDate + ` (${dateFormat})`;
  return dob; // Output format: 'April 15, 2001 (15/4/2001)'
}
export function getBlogTimeStamp(dateStr) {
  const date = parseISO(dateStr);

  if (!isValid(date)) {
    // Handle invalid date
    console.error("Invalid date:", dateStr);
    return "";
  }

  const formattedDateTime = format(date, "MMMM d, yyyy 'at' hh:mm a");

  return formattedDateTime || "";
}
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ size: [] }],
    [
      {
        font: [],
      },
    ],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
    [{ color: [] }],
    [{ background: [] }],
  ],
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
  "size",
  "code-block",
  "font",
];

export const shorten = (richText, max) => {
  const cleanText = richText.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags

  const words = cleanText.split(/\s+/);
  const textOnly = words.filter((word) => {
    // Filter out non-text content
    const trimmed = word.trim();
    return (
      trimmed.length > 0 && !trimmed.startsWith("<") && !trimmed.endsWith(">")
    );
  });

  const shorten = textOnly.slice(0, max).join(" ");
  return shorten + "...";
};
export const getFirstImage = (richText) => {
  const imageRegex = /<img.*?src=['"](.*?)['"]/; // Regex to match the source attribute of the first image tag

  const match = richText.match(imageRegex);
  if (match && match[1]) {
    return match[1];
  }

  return null;
};
