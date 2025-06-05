import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddMedicationForm from './AddMedicationForm'; // Adjust path as needed

describe('AddMedicationForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
    render(<AddMedicationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
  });

  test('renders all form fields and buttons', () => {
    expect(screen.getByLabelText(/Medication Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dosage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Frequency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prescribing Doctor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instructions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Side Effects/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Medication/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('allows typing into text fields', () => {
    const nameInput = screen.getByLabelText(/Medication Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Aspirin' } });
    expect(nameInput.value).toBe('Aspirin');

    const dosageInput = screen.getByLabelText(/Dosage/i) as HTMLInputElement;
    fireEvent.change(dosageInput, { target: { value: '100mg' } });
    expect(dosageInput.value).toBe('100mg');
  });

  test('calls onCancel when cancel button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('calls onSubmit with form data when form is submitted with valid data', async () => {
    fireEvent.change(screen.getByLabelText(/Medication Name/i), { target: { value: 'Lisinopril' } });
    fireEvent.change(screen.getByLabelText(/Dosage/i), { target: { value: '10mg' } });
    fireEvent.change(screen.getByLabelText(/Frequency/i), { target: { value: 'Once daily' } });
    fireEvent.change(screen.getByLabelText(/Prescribing Doctor/i), { target: { value: 'Dr. Feelgood' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Medication/i }));

    // Wait for validation and submission
    await screen.findByRole('button', { name: /Add Medication/i });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribingDoctor: 'Dr. Feelgood',
      startDate: '2024-01-01',
    }));
  });

  test('shows validation errors for required fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Add Medication/i }));

    expect(await screen.findByText("Medication name is required.")).toBeInTheDocument();
    expect(await screen.findByText("Dosage is required.")).toBeInTheDocument();
    expect(await screen.findByText("Frequency is required.")).toBeInTheDocument();
    expect(await screen.findByText("Prescribing doctor is required.")).toBeInTheDocument();
    expect(await screen.findByText("Start date is required.")).toBeInTheDocument();
  });
});
