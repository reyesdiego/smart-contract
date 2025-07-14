import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hash from "../../../../src/components/Commons/hash";
import { copyToClipboard } from '../../../../src/modules/utils.ts';
import '@testing-library/jest-dom';

jest.mock('decentraland-ui', () => ({
    Icon: props => <span data-testid="icon" {...props}>[Icon {props.name}]</span>,
}));

jest.mock('../../../../src/modules/utils', () => ({
    copyToClipboard: jest.fn(),
}));

describe('<Hash />', () => {
    const mockHash = '0xabcdef012345678901234567890abcdef012345';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders shortened hash', () => {
        render(<Hash hash={mockHash} />);

        expect(
            screen.getByText(
                new RegExp(
                    mockHash.slice(0, 17) + '......' + mockHash.slice(-12)
                )
            )
        ).toBeInTheDocument();
    });

    it('renders copy icon if copyIcon is true', () => {
        render(<Hash hash={mockHash} copyIcon={true} />);
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('does not render copy icon if copyIcon is false', () => {
        render(<Hash hash={mockHash} copyIcon={false} />);
        expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('calls copyToClipboard on click', async () => {
        const user = userEvent.setup();

        render(<Hash hash={mockHash} copyIcon={true} />);

        const icon = screen.getByTestId('icon');
        await user.click(icon);

        expect(copyToClipboard).toHaveBeenCalledWith(mockHash);
    });

    it('renders empty string if no hash provided', () => {
        render(<Hash />);
        expect(screen.queryByText(/......|0x/)).not.toBeInTheDocument();
    });
});
