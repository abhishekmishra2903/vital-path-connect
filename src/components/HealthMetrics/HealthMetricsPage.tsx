
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Activity, TrendingUp } from 'lucide-react';
import AddHealthMetricForm from './AddHealthMetricForm';
import HealthMetricsList from './HealthMetricsList';
import HealthMetricsChart from './HealthMetricsChart';
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
    return (
      <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
        <div className="text-center py-8">
          <div className="animate-pulse">
            <Activity className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <p className="text-emerald-700">Loading health metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 flex items-center">
            <Activity className="mr-3 h-8 w-8" />
            Health Metrics
          </h1>
          <p className="text-emerald-600 mt-1">Track and visualize your health data</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Metric
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6 shadow-lg border-l-4 border-l-emerald-500">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100">
            <CardTitle className="text-emerald-900">Add New Health Metric</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AddHealthMetricForm
              onMetricAdded={handleMetricAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
          <TabsTrigger value="charts" className="flex items-center data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
            <TrendingUp className="mr-2 h-4 w-4" />
            Charts & Trends
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
            <Activity className="mr-2 h-4 w-4" />
            All Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          <HealthMetricsChart metrics={metrics} />
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <HealthMetricsList metrics={metrics} onUpdate={fetchMetrics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMetricsPage;
