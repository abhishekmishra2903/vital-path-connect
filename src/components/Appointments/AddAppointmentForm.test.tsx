import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddAppointmentForm from './AddAppointmentForm'; // Adjust path as needed

describe('AddAppointmentForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
    render(<AddAppointmentForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
  });

  test('renders all form fields and buttons', () => {
    expect(screen.getByLabelText(/Provider Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Appointment Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Appointment Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duration \(minutes\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Appointment Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes \(Optional\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Specialty \(Optional\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Appointment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('allows typing into text fields', () => {
    const providerInput = screen.getByLabelText(/Provider Name/i) as HTMLInputElement;
    fireEvent.change(providerInput, { target: { value: 'Dr. Smith' } });
    expect(providerInput.value).toBe('Dr. Smith');

    const locationInput = screen.getByLabelText(/Location/i) as HTMLInputElement;
    fireEvent.change(locationInput, { target: { value: 'General Hospital' } });
    expect(locationInput.value).toBe('General Hospital');
  });

  test('calls onCancel when cancel button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('calls onSubmit with form data when form is submitted with valid data', async () => {
    fireEvent.change(screen.getByLabelText(/Provider Name/i), { target: { value: 'Dr. Who' } });
    fireEvent.change(screen.getByLabelText(/Appointment Date/i), { target: { value: '2024-12-25' } });
    fireEvent.change(screen.getByLabelText(/Appointment Time/i), { target: { value: '10:00' } });
    fireEvent.change(screen.getByLabelText(/Duration \(minutes\)/i), { target: { value: '45' } });
    fireEvent.change(screen.getByLabelText(/Appointment Type/i), { target: { value: 'Checkup' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'Tardis' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Appointment/i }));

    await screen.findByRole('button', { name: /Add Appointment/i });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      providerName: 'Dr. Who',
      appointmentDate: '2024-12-25',
      appointmentTime: '10:00',
      duration: 45,
      appointmentType: 'Checkup',
      location: 'Tardis',
    }));
  });

  test('shows validation errors for required fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Add Appointment/i }));

    expect(await screen.findByText("Provider name is required.")).toBeInTheDocument();
    expect(await screen.findByText("Appointment date is required.")).toBeInTheDocument();
    expect(await screen.findByText("Appointment time is required.")).toBeInTheDocument();
    // Duration has a default, so it will not show "Duration must be at least 1 minute." unless it's made invalid.
    // The default '30' is valid. If we cleared the input, then tried to submit, we'd expect an error.
    // For now, we are testing that other required fields show errors.
    expect(await screen.findByText("Appointment type is required.")).toBeInTheDocument();
    expect(await screen.findByText("Location is required.")).toBeInTheDocument();
  });
});
