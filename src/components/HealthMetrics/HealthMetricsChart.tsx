
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface HealthMetricsChartProps {
  metrics: any[];
}

const HealthMetricsChart = ({ metrics }: HealthMetricsChartProps) => {
  // Group metrics by type for different charts
  const weightData = metrics
    .filter(m => m.metric_type === 'weight')
    .map(m => ({
      date: new Date(m.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(m.value),
      fullDate: m.recorded_at
    }))
    .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())
    .slice(-7); // Last 7 readings

  const heartRateData = metrics
    .filter(m => m.metric_type === 'heart_rate')
    .map(m => ({
      date: new Date(m.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(m.value),
      fullDate: m.recorded_at
    }))
    .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())
    .slice(-7);

  const bloodPressureData = metrics
    .filter(m => m.metric_type === 'blood_pressure')
    .map(m => ({
      date: new Date(m.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      systolic: parseFloat(m.systolic || 0),
      diastolic: parseFloat(m.diastolic || 0),
      fullDate: m.recorded_at
    }))
    .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())
    .slice(-7);

  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
    systolic: {
      label: "Systolic",
      color: "hsl(var(--chart-2))",
    },
    diastolic: {
      label: "Diastolic",
      color: "hsl(var(--chart-3))",
    },
  };

  if (metrics.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <p>No data available for charts. Add some health metrics to see your trends!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weight Trend Chart */}
      {weightData.length > 0 && (
        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-blue-900">Weight Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#1d4ed8', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Heart Rate Chart */}
      {heartRateData.length > 0 && (
        <Card className="shadow-lg border-l-4 border-l-red-500">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
            <CardTitle className="text-red-900">Heart Rate Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    domain={[50, 120]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Blood Pressure Chart */}
      {bloodPressureData.length > 0 && (
        <Card className="shadow-lg border-l-4 border-l-purple-500">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
            <CardTitle className="text-purple-900">Blood Pressure Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    domain={[60, 160]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    stroke="#a855f7" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthMetricsChart;
