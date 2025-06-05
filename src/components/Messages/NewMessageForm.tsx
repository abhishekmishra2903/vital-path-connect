import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define the form schema using Zod
const messageFormSchema = z.object({
  recipient: z.string().min(1, "Recipient is required."),
  subject: z.string().min(1, "Subject is required."),
  content: z.string().min(1, "Message content is required."),
});

export type MessageFormValues = z.infer<typeof messageFormSchema>;

interface NewMessageFormProps {
  onSubmit: (data: MessageFormValues) => void;
  onCancel: () => void;
  // Optional: Pass a list of providers if implementing a select/dropdown for recipient
  // providers?: { id: string; name: string }[];
}

const NewMessageForm: React.FC<NewMessageFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      recipient: '',
      subject: '',
      content: '',
    },
  });

  const handleSubmit = (data: MessageFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-4 border rounded-lg">
        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                {/* For now, a simple input. Could be a Select component later. */}
                <Input placeholder="e.g., Dr. Sarah Johnson or Health Portal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Question about medication" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewMessageForm;
