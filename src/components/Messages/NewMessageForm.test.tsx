import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewMessageForm from './NewMessageForm'; // Adjust path as needed

describe('NewMessageForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
    render(<NewMessageForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
  });

  test('renders all form fields and buttons', () => {
    expect(screen.getByLabelText(/Recipient/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('allows typing into text fields', () => {
    const recipientInput = screen.getByLabelText(/Recipient/i) as HTMLInputElement;
    fireEvent.change(recipientInput, { target: { value: 'Dr. Strange' } });
    expect(recipientInput.value).toBe('Dr. Strange');

    const subjectInput = screen.getByLabelText(/Subject/i) as HTMLInputElement;
    fireEvent.change(subjectInput, { target: { value: 'Magic Inquiry' } });
    expect(subjectInput.value).toBe('Magic Inquiry');
  });

  test('calls onCancel when cancel button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('calls onSubmit with form data when form is submitted with valid data', async () => {
    fireEvent.change(screen.getByLabelText(/Recipient/i), { target: { value: 'Dr. Banner' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Anger Management' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Need tips on staying calm.' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await screen.findByRole('button', { name: /Send Message/i });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      recipient: 'Dr. Banner',
      subject: 'Anger Management',
      content: 'Need tips on staying calm.',
    }));
  });

  test('shows validation errors for required fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText("Recipient is required.")).toBeInTheDocument();
    expect(await screen.findByText("Subject is required.")).toBeInTheDocument();
    expect(await screen.findByText("Message content is required.")).toBeInTheDocument();
  });
});
