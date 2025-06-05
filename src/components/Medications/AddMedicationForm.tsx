import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define the form schema using Zod
const medicationFormSchema = z.object({
  name: z.string().min(1, { message: "Medication name is required." }),
  dosage: z.string().min(1, { message: "Dosage is required." }),
  frequency: z.string().min(1, { message: "Frequency is required." }),
  prescribingDoctor: z.string().min(1, { message: "Prescribing doctor is required." }),
  startDate: z.string().min(1, { message: "Start date is required." }), // Consider using a date type if needed
  instructions: z.string().optional(),
  sideEffects: z.string().optional(),
});

export type MedicationFormValues = z.infer<typeof medicationFormSchema>;

interface AddMedicationFormProps {
  onSubmit: (data: MedicationFormValues) => void;
  onCancel: () => void;
}

const AddMedicationForm: React.FC<AddMedicationFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: {
      name: '',
      dosage: '',
      frequency: '',
      prescribingDoctor: '',
      startDate: '',
      instructions: '',
      sideEffects: '',
    },
  });

  const handleSubmit = (data: MedicationFormValues) => {
    onSubmit(data);
    form.reset(); // Optionally reset form after submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-4 border rounded-lg">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medication Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Lisinopril" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dosage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dosage</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 10mg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Once daily" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prescribingDoctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prescribing Doctor</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dr. Sarah Johnson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Take with food in the morning" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sideEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Side Effects (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., May cause dizziness" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Medication</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMedicationForm;
