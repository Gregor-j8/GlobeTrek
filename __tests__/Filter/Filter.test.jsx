/* eslint-disable */
import { render, screen, waitFor, fireEvent, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Filter } from "../../src/components/Filter/Filter";
import { GetFavoritePosts } from "../../src/services/likeService";
import { NewPostContext, updatePost } from "../../src/context/NewPostContext";
import { UseCurrentUser } from "../../src/context/CurrentUserContext";
import "@testing-library/jest-dom"
  
  describe('Filter Component', () => {

    vi.mock('../../src/context/NewPostContext', () => ({
        NewPostContext: vi.fn(),
      }))

      vi.mock('country-state-city', () => ({
        Country: {
          getAllCountries: vi.fn(() => [
            { isoCode: 'CA', name: 'Canada' },
            { isoCode: 'US', name: 'United States' },
          ])}}))

    it('should render filter countries', async () => {
        const updatePosts = { id: 1, title: 'john', description: 'hello', city: 'nashville' }
        NewPostContext.mockReturnValue({updatePost: updatePosts})
          render(<Filter />)
      screen.debug()

      await waitFor(() => {
        expect(screen.getByText('Canada')).toBeInTheDocument()
        expect(screen.getByText('United States')).toBeInTheDocument()
      })
    })
  })
  