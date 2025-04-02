/* eslint-disable */
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import { FollowUser,  } from '../../src/services/followService'
import { UseCurrentUser } from "../../src/context/CurrentUserContext"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import { Follow } from "../../src/components/Follow/Follow"

vi.mock('../../src/context/CurrentUserContext', () => ({
  UseCurrentUser: vi.fn(),
}))

vi.mock("'../../services/userService", () => ({
  GetUserById: vi.fn()
}))

vi.mock('../../src/services/followService', () => ({
  deleteFollow: vi.fn(),
  FollowUser: vi.fn(),
  GetAllFollowing: vi.fn(() => Promise.resolve([])),
  GetFollowering: vi.fn(() => Promise.resolve([])),
  GetFollowers: vi.fn(() => Promise.resolve([])),
}))
describe('Follow Component', () => {
  it('checks for following and followers triggers follow and unfollow on button click', async () => {
    const mockCurrentUser = { id: 1, name: 'john' }
    UseCurrentUser.mockReturnValue({ currentUser: mockCurrentUser })
    render(
      <BrowserRouter>
        <Follow userId="3"/>
      </BrowserRouter>
    )
    expect(screen.getByText(/followers/i)).toBeInTheDocument()
    expect(screen.getByText(/following/i)).toBeInTheDocument()
    const followButton = screen.getByTestId(/follow/i)
    fireEvent.click(followButton)
    expect(FollowUser).toHaveBeenCalledWith({ userId: 1, followId: 3 })
  })})
  