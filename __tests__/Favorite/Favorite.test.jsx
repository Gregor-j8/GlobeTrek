/* eslint-disable */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Favorite } from "../../src/components/Favorite/Favorite";
import { GetFavoritePosts } from "../../src/services/likeService";
import { useLike } from "../../src/context/LikeContext";
import { UseCurrentUser } from "../../src/context/CurrentUserContext";

