import "@testing-library/jest-dom"
import { render, screen, fireEvent} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FollowerModal } from '../../src/components/Follow/FollowerModal'
import { vi, describe, it, expect, beforeEach } from "vitest"


describe('FollowerModal', () => {
    const mockOnClose = vi.fn()
    const mockFollowers = [
        {
            user: {
                id: '1',
                fullName: 'g'
            }
        },
        {
            user: {
                id: '2',
                fullName: 'j'
            }
        }
    ]

    beforeEach(() => {
        render(
            <MemoryRouter>
                <FollowerModal follower={mockFollowers} onClose={mockOnClose} />
            </MemoryRouter>
        )
    })

    it('renders follower names', () => {
        expect(screen.getByText('g')).toBeInTheDocument()
        expect(screen.getByText('j')).toBeInTheDocument()
    })

        it('calls onClose when close button is clicked', () => {
            const closeButton = screen.getByText('x')
            fireEvent.click(closeButton)
            expect(mockOnClose).toHaveBeenCalledTimes(1)
        })
})