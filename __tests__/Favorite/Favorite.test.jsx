/* eslint-disable */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Favorite } from "../../src/components/Favorite/Favorite";
import { GetFavoritePosts } from "../../src/services/likeService";
import { useLike } from "../../src/context/LikeContext";
import { UseCurrentUser } from "../../src/context/CurrentUserContext";
import "@testing-library/jest-dom"



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
        screen.debug()
      const mockCurrentUser = { id: 1, name: 'John Doe' }
      const mockPosts = [
        {
          post: {
            id: 1,
            title: 'First Post',
            description: 'This is the first post.',
          },
        },
        {
          post: {
            id: 2,
            title: 'Second Post',
            description: 'This is the second post.',
          },
        },
      ]
  
      UseCurrentUser.mockReturnValue({ currentUser: mockCurrentUser })
      GetFavoritePosts.mockResolvedValue(mockPosts)
  
      const mockIsLiked = vi.fn().mockReturnValue(false)
      const mockToggleLike = vi.fn()
  
      useLike.mockReturnValue({ isLiked: mockIsLiked, toggleLike: mockToggleLike })
  
      render(
        <BrowserRouter>
          <Favorite />
        </BrowserRouter>
      )
  
      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument()
        expect(screen.getByText('Second Post')).toBeInTheDocument()
      })
  
      expect(screen.getByText('This is the first post.')).toBeInTheDocument()
      expect(screen.getByText('This is the second post.')).toBeInTheDocument()
  
  
      fireEvent.click(screen.getAllByRole('button')[0])
  
      expect(mockToggleLike).toHaveBeenCalledWith(1)
    })
  })
  