/* eslint-disable */
import { GetFavoritePosts } from "../../src/services/likeService"
import { useLike } from "../../src/context/LikeContext"
import { FilledHeartIcon, UnFilledHeartIcon } from "../../src/Documents/Heart"
import { UseCurrentUser } from "../../src/context/CurrentUserContext"

jest.mock('./likeService', () => ({
  GetFavoritePosts: jest.fn(),
}))


describe('favorite List', () => {
  it("Fetching favorites Lists from database", async() => {
     
    const mockData = { title: "Favorites List" }
    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) }
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    expect()
  })
})