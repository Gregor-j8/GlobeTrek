/* eslint-disable */
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import { Favorite } from "../../src/components/Favorite/Favorite"
import { GetFavoritePosts } from "../../src/services/likeService"
import { useLike } from "../../src/context/LikeContext"
import { UseCurrentUser } from "../../src/context/CurrentUserContext"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"

vi.mock('../../src/context/CurrentUserContext', () => ({
  UseCurrentUser: vi.fn(),
}))
vi.mock('../../src/context/LikeContext', () => ({
  useLike: vi.fn(),
}))
vi.mock('../../src/services/likeService', () => ({
  GetFavoritePosts: vi.fn(),
}))

describe('Favorite Component', () => {
  it('should render favorite posts', async () => {
    const mockCurrentUser = { id: 1, name: 'john' }
    const mockPosts = [
      {
        post: {
          id: 1,
          title: 'first post',
          description: ' first post.',
        },
      },
      {
        post: {
          id: 2,
          title: 'second post',
          description: ' second post.',
        },
      },
    ]    

    const mockToggleLike = vi.fn()
    const mockIsLiked = vi.fn((postId) => postId === 1)
    UseCurrentUser.mockReturnValue({ currentUser: mockCurrentUser })
    useLike.mockReturnValue({ isLiked: mockIsLiked, toggleLike: mockToggleLike })
    GetFavoritePosts.mockResolvedValue(mockPosts)

    render(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>)
    screen.debug()

    await waitFor(() => {
      expect(screen.getByText('first post')).toBeInTheDocument()
      expect(screen.getByText('second post')).toBeInTheDocument()
  })
})
})
  