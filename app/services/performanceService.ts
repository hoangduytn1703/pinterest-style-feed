interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

const metrics: PerformanceMetric[] = [];

export function trackMetric(name: string, value: number): void {
  metrics.push({
    name,
    value,
    timestamp: Date.now(),
  });

  // Limit the number of metrics to prevent memory leak
  if (metrics.length > 1000) {
    metrics.splice(0, 100);
  }
}

export function getMetrics(name?: string): PerformanceMetric[] {
  if (name) {
    return metrics.filter((metric) => metric.name === name);
  }
  return [...metrics];
}

export function trackImageLoadTime(imageUrl: string): () => void {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    trackMetric(`image_load_${imageUrl}`, loadTime);
  };
}
