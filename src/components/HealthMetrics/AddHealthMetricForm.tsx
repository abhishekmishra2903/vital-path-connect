
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AddHealthMetricFormProps {
  onMetricAdded: () => void;
  onCancel: () => void;
}

const AddHealthMetricForm = ({ onMetricAdded, onCancel }: AddHealthMetricFormProps) => {
  const [metricType, setMetricType] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const metricTypes = [
    { value: 'blood_pressure', label: 'Blood Pressure', unit: 'mmHg' },
    { value: 'heart_rate', label: 'Heart Rate', unit: 'bpm' },
    { value: 'weight', label: 'Weight', unit: 'kg' },
    { value: 'height', label: 'Height', unit: 'cm' },
    { value: 'blood_sugar', label: 'Blood Sugar', unit: 'mg/dL' },
    { value: 'temperature', label: 'Temperature', unit: '°C' },
    { value: 'oxygen_saturation', label: 'Oxygen Saturation', unit: '%' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to add health metrics.",
          variant: "destructive",
        });
        return;
      }

      const metricData: any = {
        user_id: user.id,
        metric_type: metricType,
        value: parseFloat(value),
        unit,
        notes: notes || null,
      };

      if (metricType === 'blood_pressure') {
        metricData.systolic = parseFloat(systolic);
        metricData.diastolic = parseFloat(diastolic);
      }

      const { error } = await supabase
        .from('health_metrics')
        .insert([metricData]);

      if (error) {
        toast({
          title: "Error adding metric",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Metric added successfully",
          description: "Your health metric has been recorded.",
        });
        onMetricAdded();
      }
    } catch (error) {
      console.error('Error adding health metric:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedMetric = metricTypes.find(type => type.value === metricType);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="metricType">Metric Type</Label>
        <Select value={metricType} onValueChange={(value) => {
          setMetricType(value);
          const metric = metricTypes.find(type => type.value === value);
          if (metric) setUnit(metric.unit);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select metric type" />
          </SelectTrigger>
          <SelectContent>
            {metricTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {metricType === 'blood_pressure' ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="systolic">Systolic</Label>
            <Input
              id="systolic"
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diastolic">Diastolic</Label>
            <Input
              id="diastolic"
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              required
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="value">Value ({selectedMetric?.unit})</Label>
          <Input
            id="value"
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="flex space-x-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Metric'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddHealthMetricForm;
