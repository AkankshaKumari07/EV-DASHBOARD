import { ChartData, EVData } from "../types/data";

export function processEvData(data: EVData[]) {
  return {
    filterByCounty: (county: string) => {
      if (county === "All Counties") return data; // Return full data for "All Counties"
      return data.filter(
        (ev) => ev.county?.toLowerCase() === county.toLowerCase()
      );
    },
    getAverageRange: (filteredData: EVData[]) => {
      const validRanges = filteredData.filter((ev) => ev.electricRange > 0);
      const total = validRanges.reduce((acc, ev) => acc + ev.electricRange, 0);
      return Math.round(total / validRanges.length);
    },

    getCountyDistribution: (filteredData: EVData[]): ChartData[] => {
      const counties = new Map<string, number>();
      filteredData.forEach((ev) => {
        counties.set(ev.county, (counties.get(ev.county) || 0) + 1);
      });
      return Array.from(counties.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    },

    getMakeDistribution: (filteredData: EVData[]): ChartData[] => {
      const makes = new Map<string, number>();
      filteredData.forEach((ev) => {
        makes.set(ev.make, (makes.get(ev.make) || 0) + 1);
      });
      return Array.from(makes.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
    },

    getEvTypeDistribution: (filteredData: EVData[]): ChartData[] => {
      const types = new Map<string, number>();
      filteredData.forEach((ev) => {
        const type = ev.electricVehicleType;
        types.set(type, (types.get(type) || 0) + 1);
      });
      return Array.from(types.entries()).map(([name, value]) => ({
        name,
        value,
      }));
    },

    getYearlyTrend: (filteredData: EVData[]): ChartData[] => {
      const years = new Map<number, number>();
      filteredData.forEach((ev) => {
        years.set(ev.modelYear, (years.get(ev.modelYear) || 0) + 1);
      });
      return Array.from(years.entries())
        .map(([name, value]) => ({ name: name.toString(), value }))
        .sort((a, b) => Number(a.name) - Number(b.name));
    },
  };
}
