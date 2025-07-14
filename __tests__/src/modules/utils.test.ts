import {copyToClipboard, getMessageFromError} from "../../../src/modules/utils";

describe('Utils', () => {
    describe('copyToClipboard', () => {
        beforeEach(() => {
            Object.assign(navigator, {
                clipboard: {
                    writeText: jest.fn(),
                },
            });
        });

        it('should copy text to clipboard when text provided', () => {
            copyToClipboard('test text');
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
        });

        it('should not copy when no text provided', () => {
            copyToClipboard();
            expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
        });
    });

    describe('getMessageFromError', () => {
        it('should return string error directly', () => {
            expect(getMessageFromError('test error')).toBe('test error');
        });

        it('should convert number error to string', () => {
            expect(getMessageFromError(123)).toBe('123');
        });

        it('should return shortMessage from error object if available', () => {
            expect(getMessageFromError({shortMessage: 'short error'})).toBe('short error');
        });

        it('should return message from error object if shortMessage not available', () => {
            expect(getMessageFromError({message: 'error message'})).toBe('error message');
        });

        it('should return default message if no message found in error object', () => {
            expect(getMessageFromError({})).toBe('An unexpected error occurred.');
        });

        it('should return default message for null/undefined', () => {
            expect(getMessageFromError(null)).toBe('An unexpected error occurred.');
            expect(getMessageFromError(undefined)).toBe('An unexpected error occurred.');
        });
    });
})
