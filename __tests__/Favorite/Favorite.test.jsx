/* eslint-disable */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Favorite } from "../../src/components/Favorite/Favorite";
import { GetFavoritePosts } from "../../src/services/likeService";
import { useLike } from "../../src/context/LikeContext";
import { UseCurrentUser } from "../../src/context/CurrentUserContext";

it("renders the correct number of favorite posts", async () => {
  render(
    <BrowserRouter>
      <Favorite />
    </BrowserRouter>
  );

  // Wait for the posts to be rendered
  await waitFor(() => screen.getByText("Post 1"));

  // Check if the correct number of posts is rendered
  const posts = screen.getAllByRole("heading", { level: 1 });
  expect(posts).toHaveLength(mockPosts.length);
});

it("displays a loading state while fetching favorite posts", async () => {
  GetFavoritePosts.mockImplementation(() => new Promise(() => {})); // Simulate a pending promise

  render(
    <BrowserRouter>
      <Favorite />
    </BrowserRouter>
  );

  // Check if the loading state is displayed
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("handles errors when fetching favorite posts", async () => {
  GetFavoritePosts.mockRejectedValue(new Error("Failed to fetch"));

  render(
    <BrowserRouter>
      <Favorite />
    </BrowserRouter>
  );

  // Wait for the error message to be displayed
  await waitFor(() => screen.getByText("Failed to load favorite posts"));
  expect(screen.getByText("Failed to load favorite posts")).toBeInTheDocument();
});

it("does not call toggleLike when clicking on an unliked post", async () => {
  render(
    <BrowserRouter>
      <Favorite />
    </BrowserRouter>
  );

  // Wait for the posts to be rendered
  await waitFor(() => screen.getByText("Post 2"));

  // Find and click the unliked heart button
  const unfilledHeartButton = screen.getByText("🤍");
  fireEvent.click(unfilledHeartButton);

  // Ensure toggleLike is not called
  expect(mockToggleLike).not.toHaveBeenCalledWith(2);
});

it("renders a link to the post details page", async () => {
  render(
    <BrowserRouter>
      <Favorite />
    </BrowserRouter>
  );

  // Wait for the posts to be rendered
  await waitFor(() => screen.getByText("Post 1"));

  // Check if the link to the post details page is rendered
  const postLink = screen.getByText("Post 1").closest("a");
  expect(postLink).toHaveAttribute("href", "/posts/1");
});