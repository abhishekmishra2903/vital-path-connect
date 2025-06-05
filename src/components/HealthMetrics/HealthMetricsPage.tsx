
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import AddHealthMetricForm from './AddHealthMetricForm';
import HealthMetricsList from './HealthMetricsList';
import { useToast } from '@/hooks/use-toast';

const HealthMetricsPage = () => {
  const [metrics, setMetrics] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('health_metrics')
        .select('*')
        .order('recorded_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching metrics",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setMetrics(data || []);
      }
    } catch (error) {
      console.error('Error fetching health metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleMetricAdded = () => {
    fetchMetrics();
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading health metrics...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Health Metrics</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Metric
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Health Metric</CardTitle>
          </CardHeader>
          <CardContent>
            <AddHealthMetricForm
              onMetricAdded={handleMetricAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      )}

      <HealthMetricsList metrics={metrics} onUpdate={fetchMetrics} />
    </div>
  );
};

export default HealthMetricsPage;
