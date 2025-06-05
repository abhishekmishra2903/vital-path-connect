
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface HealthMetric {
  id: string;
  metric_type: string;
  value: number;
  unit: string;
  systolic?: number;
  diastolic?: number;
  notes?: string;
  recorded_at: string;
}

interface HealthMetricsListProps {
  metrics: HealthMetric[];
  onUpdate: () => void;
}

const HealthMetricsList = ({ metrics }: HealthMetricsListProps) => {
  const formatMetricType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getDisplayValue = (metric: HealthMetric) => {
    if (metric.metric_type === 'blood_pressure') {
      return `${metric.systolic}/${metric.diastolic} ${metric.unit}`;
    }
    return `${metric.value} ${metric.unit}`;
  };

  const getMetricBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      blood_pressure: 'bg-red-100 text-red-800',
      heart_rate: 'bg-pink-100 text-pink-800',
      weight: 'bg-blue-100 text-blue-800',
      height: 'bg-green-100 text-green-800',
      blood_sugar: 'bg-orange-100 text-orange-800',
      temperature: 'bg-yellow-100 text-yellow-800',
      oxygen_saturation: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (metrics.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No health metrics recorded yet. Add your first measurement to get started!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getMetricBadgeColor(metric.metric_type)}>
                    {formatMetricType(metric.metric_type)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {format(new Date(metric.recorded_at), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  {getDisplayValue(metric)}
                </div>
                {metric.notes && (
                  <p className="text-sm text-gray-600">{metric.notes}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HealthMetricsList;
